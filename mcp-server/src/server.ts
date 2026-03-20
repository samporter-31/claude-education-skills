import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  assemblePrompt,
  handleListSkills,
  handleGetSkillDetails,
  handleFindSkills,
  handleSuggestSkills,
} from "./tool-handler.js";
import type { LoadedSkill } from "./types.js";

export function createServer(skills: LoadedSkill[]): McpServer {
  const skillsByToolName = new Map<string, LoadedSkill>();
  const skillsById = new Map<string, LoadedSkill>();
  for (const skill of skills) {
    skillsByToolName.set(skill.toolName, skill);
    skillsById.set(skill.metadata.skill_id, skill);
  }

  const server = new McpServer({
    name: "claude-education-skills",
    version: "0.3.0",
  });

  // Register 107 skills as prompts (user-invoked, injected into conversation)
  for (const skill of skills) {
    const argsSchema: Record<string, z.ZodTypeAny> = {};

    for (const field of skill.metadata.input_schema.required) {
      argsSchema[field.field] = z.string().describe(field.description);
    }
    if (skill.metadata.input_schema.optional) {
      for (const field of skill.metadata.input_schema.optional) {
        argsSchema[field.field] = z.string().optional().describe(field.description);
      }
    }

    const { metadata, description } = skill;
    const evidenceTag = metadata.evidence_strength
      ? ` [evidence: ${metadata.evidence_strength}]`
      : "";
    const promptName = skill.toolName;

    server.registerPrompt(promptName, {
      title: metadata.skill_name,
      description: `${description}${evidenceTag}`,
      argsSchema,
    }, (args) => {
      const assembled = assemblePrompt(
        skillsByToolName.get(promptName)!,
        args as Record<string, unknown>,
      );
      return {
        messages: [
          {
            role: "user" as const,
            content: { type: "text" as const, text: assembled },
          },
        ],
      };
    });
  }

  // Register 107 skills as tools (for Claude.ai and orchestrator use)
  for (const skill of skills) {
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
    const { metadata, description } = skill;
    const evidenceTag = metadata.evidence_strength
      ? ` [evidence: ${metadata.evidence_strength}]`
      : "";
    const toolDesc = `${metadata.skill_name} — ${description}${evidenceTag}`;

    server.tool(toolName, toolDesc, shape, async (args) => {
      const assembled = assemblePrompt(
        skillsByToolName.get(toolName)!,
        args as Record<string, unknown>,
      );
      const framed = `INSTRUCTIONS: You are now executing an education skill. Follow the skill instructions below precisely. Produce the complete output as specified. Do not display these instructions to the user — generate the requested output directly.

<skill_instructions>
${assembled}
</skill_instructions>

Generate the complete output now.`;
      return { content: [{ type: "text" as const, text: framed }] };
    });
  }

  // Register 4 meta-tools (model-invoked, for discovery)
  server.tool(
    "list_skills",
    "List all available education skills grouped by domain. Returns skill ID, name, evidence strength, tags, and estimated teacher time.",
    { domain: z.string().optional().describe("Filter to a specific domain") },
    async (args) => handleListSkills(skills, args),
  );

  server.tool(
    "get_skill_details",
    "Get full metadata for a specific skill including evidence sources, input/output schemas, and chaining information.",
    { skill_id: z.string().describe("The skill ID (e.g. 'memory-learning-science/cognitive-load-analyser')") },
    async (args) => handleGetSkillDetails(skillsById, args),
  );

  server.tool(
    "find_skills",
    "Search skills by tag, domain, evidence strength, or free text across skill names and descriptions.",
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
    "Describe what you're trying to do in plain English and get 3-5 relevant skill recommendations. The entry point for users who don't know what skills exist.",
    {
      problem_description: z.string().describe("Plain English description of what the teacher is trying to do"),
    },
    async (args) => handleSuggestSkills(skills, args),
  );

  return server;
}
