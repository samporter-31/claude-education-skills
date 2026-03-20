export interface SchemaField {
  field: string;
  type: string;
  description: string;
}

export interface InputSchema {
  required: SchemaField[];
  optional?: SchemaField[];
}

export interface OutputSchema {
  type: string;
  fields: SchemaField[];
}

export interface SkillMetadata {
  skill_id: string;
  skill_name: string;
  domain: string;
  version: string;
  evidence_strength: "strong" | "moderate" | "emerging" | "original" | "practitioner";
  evidence_sources: string[];
  input_schema: InputSchema;
  output_schema: OutputSchema;
  chains_well_with: string[];
  teacher_time: string;
  tags: string[];
}

export interface LoadedSkill {
  metadata: SkillMetadata;
  prompt: string;
  description: string;
  filePath: string;
  toolName: string;
}
