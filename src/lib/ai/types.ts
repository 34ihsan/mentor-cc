export type TaskType =
  | "simple"
  | "fast"
  | "bulk"
  | "logic"
  | "complex"
  | "ultra_cheap";

export interface AIConfig {
  apiKey: string;
  defaultModel: string;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
