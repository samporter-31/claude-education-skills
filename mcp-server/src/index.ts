import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadSkills } from "./skill-loader.js";
import { buildSkillToolDefinition, buildMetaToolDefinitions } from "./tool-registry.js";
import {
  handleSkillCall,
  handleListSkills,
  handleGetSkillDetails,
  handleFindSkills,
  handleSuggestSkills,
} from "./tool-handler.js";
import type { LoadedSkill } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIBRARY_ROOT = resolve(__dirname, "../..");

async function main() {
  const skills = await loadSkills(LIBRARY_ROOT);
  console.error(`Loaded ${skills.length} skills from ${LIBRARY_ROOT}`);

  // Build lookup maps
  const skillsByToolName = new Map<string, LoadedSkill>();
  const skillsById = new Map<string, LoadedSkill>();
  for (const skill of skills) {
    skillsByToolName.set(skill.toolName, skill);
    skillsById.set(skill.metadata.skill_id, skill);
  }

  const server = new McpServer({
    name: "claude-education-skills",
    version: "0.1.0",
  });

  // Register per-skill tools
  for (const skill of skills) {
    const def = buildSkillToolDefinition(skill);
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const field of skill.metadata.input_schema.required) {
      shape[field.field] =
        field.type === "array"
          ? z.array(z.any()).describe(field.description)
          : z.string().describe(field.description);
    }
    if (skill.metadata.input_schema.optional) {
      for (const field of skill.metadata.input_schema.optional) {
        shape[field.field] =
          field.type === "array"
            ? z.array(z.any()).optional().describe(field.description)
            : z.string().optional().describe(field.description);
      }
    }

    const toolName = skill.toolName;
    server.tool(toolName, def.description, shape, async (args) => {
      return handleSkillCall(skillsByToolName, toolName, args as Record<string, unknown>);
    });
  }

  // Register meta-tools
  server.tool(
    "list_skills",
    "List all available education skills grouped by domain",
    { domain: z.string().optional().describe("Filter to a specific domain") },
    async (args) => handleListSkills(skills, args),
  );

  server.tool(
    "get_skill_details",
    "Get full metadata for a specific skill",
    { skill_id: z.string().describe("The skill ID (e.g. 'memory-learning-science/cognitive-load-analyser')") },
    async (args) => handleGetSkillDetails(skillsById, args),
  );

  server.tool(
    "find_skills",
    "Search skills by tag, domain, evidence strength, or free text",
    {
      query: z.string().optional().describe("Free text search across skill names, descriptions, and tags"),
      domain: z.string().optional().describe("Filter by domain"),
      evidence_strength: z.string().optional().describe("Filter: strong | moderate | emerging | original"),
      tag: z.string().optional().describe("Filter by tag"),
    },
    async (args) => handleFindSkills(skills, args),
  );

  server.tool(
    "suggest_skills",
    "Describe what you're trying to do and get 3-5 relevant skill recommendations",
    {
      problem_description: z.string().describe("Plain English description of what the teacher is trying to do"),
    },
    async (args) => handleSuggestSkills(skills, args),
  );

  // Start stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
