import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename, resolve } from "node:path";
import matter from "gray-matter";
import type { LoadedSkill, SkillMetadata } from "./types.js";

const IGNORED_FILES = new Set([
  "README.md",
  "ARCHITECTURE.md",
  "EVIDENCE.md",
  "EXCLUSIONS.md",
  "IMPLEMENTATIONS.md",
  "CONTRIBUTING.md",
  "brief.md",
  "llms.txt",
]);

const IGNORED_DIRS = new Set(["schemas", "mcp-server", ".git", "node_modules"]);

function extractPrompt(content: string): string {
  const promptMatch = content.match(/## Prompt\s*\n+```[^\n]*\n([\s\S]*?)```/);
  if (promptMatch) return promptMatch[1].trim();

  const sectionMatch = content.match(/## Prompt\s*\n+([\s\S]*?)(?=\n## |\n---\s*$)/);
  if (sectionMatch) return sectionMatch[1].trim();

  return "";
}

function extractDescription(content: string): string {
  const match = content.match(/## What This Skill Does\s*\n+([\s\S]*?)(?=\n## )/);
  if (!match) return "";
  const raw = match[1].trim();
  // Take the first sentence or first 200 chars
  const firstSentence = raw.match(/^[^.]*\./);
  return firstSentence ? firstSentence[0] : raw.slice(0, 200);
}

function buildToolName(skillId: string, duplicateSlugs: Set<string>): string {
  const parts = skillId.split("/");
  const slug = parts[parts.length - 1];
  if (duplicateSlugs.has(slug)) {
    return skillId.replace(/\//g, "__");
  }
  return slug;
}

export async function loadSkills(libraryRoot: string): Promise<LoadedSkill[]> {
  const resolvedRoot = resolve(libraryRoot);
  const entries = await readdir(resolvedRoot);
  const skills: LoadedSkill[] = [];
  const allFiles: { domain: string; filePath: string }[] = [];

  // Collect all skill file paths
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry) || entry.startsWith(".")) continue;
    const dirPath = join(resolvedRoot, entry);
    const dirStat = await stat(dirPath);
    if (!dirStat.isDirectory()) continue;

    const files = await readdir(dirPath);
    for (const file of files) {
      if (!file.endsWith(".md") || IGNORED_FILES.has(file)) continue;
      allFiles.push({ domain: entry, filePath: join(dirPath, file) });
    }
  }

  // Detect duplicate slugs
  const slugCounts = new Map<string, number>();
  for (const { filePath } of allFiles) {
    const slug = basename(filePath, ".md");
    slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
  }
  const duplicateSlugs = new Set<string>();
  for (const [slug, count] of slugCounts) {
    if (count > 1) duplicateSlugs.add(slug);
  }

  // Apply domain filter if set
  const domainFilter = process.env.SKILLS_FILTER
    ?.split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  // Parse each file
  for (const { domain, filePath } of allFiles) {
    if (domainFilter && !domainFilter.includes(domain)) continue;

    try {
      const raw = await readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      const metadata = data as SkillMetadata;

      if (!metadata.skill_id || !metadata.input_schema) {
        console.error(`Skipping ${filePath}: missing skill_id or input_schema`);
        continue;
      }

      const prompt = extractPrompt(content);
      const description = extractDescription(content);
      const toolName = buildToolName(metadata.skill_id, duplicateSlugs);

      skills.push({ metadata, prompt, description, filePath, toolName });
    } catch (err) {
      console.error(`Failed to parse ${filePath}:`, err);
    }
  }

  return skills;
}
