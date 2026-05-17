import { TaskType } from "./types";

/**
 * Gets the model sequence from environment variables for fallback logic.
 */
export function getModelSequence(): string[] {
  const sequence = process.env.OPENROUTER_MODEL_SEQUENCE;
  if (!sequence) return [];
  return sequence.split(",").map(m => m.trim()).filter(m => m.length > 0);
}

/**
 * Returns a list of candidate models for a given task, starting with the most specialized.
 */
export function getModelCandidates(task: TaskType): string[] {
  const candidates: string[] = [];
  
  // 1. Task-specific primary model
  switch (task) {
    case "simple":
      candidates.push("openai/gpt-4o-mini");
      break;
    case "fast":
      candidates.push(process.env.OPENROUTER_TEXT_MODEL || "google/gemini-2.0-flash");
      break;
    case "bulk":
      candidates.push("google/gemini-2.0-flash-lite");
      break;
    case "logic":
      candidates.push("deepseek/deepseek-chat");
      break;
    case "complex":
      candidates.push("deepseek/deepseek-reasoner");
      break;
    case "ultra_cheap":
      candidates.push("openrouter/gpt-oss-20b");
      break;
  }

  // 2. Add the global default if not already added
  const globalDefault = process.env.OPENROUTER_TEXT_MODEL;
  if (globalDefault && !candidates.includes(globalDefault)) {
    candidates.push(globalDefault);
  }

  // 3. Add the fallback sequence
  const sequence = getModelSequence();
  sequence.forEach(m => {
    if (!candidates.includes(m)) {
      candidates.push(m);
    }
  });

  // 4. Ultimate fallback
  if (candidates.length === 0) {
    candidates.push("openai/gpt-4o-mini");
  }

  return candidates;
}

/**
 * Returns a list of candidate models for image generation.
 */
export function getImageCandidates(): string[] {
  const candidates: string[] = [];
  
  // 1. Primary image model
  const primary = process.env.OPENROUTER_IMAGE_MODEL;
  if (primary) candidates.push(primary);

  // 2. Fallback sequence
  const sequence = process.env.OPENROUTER_IMAGE_SEQUENCE;
  if (sequence) {
    sequence.split(",").map(m => m.trim()).forEach(m => {
      if (m && !candidates.includes(m)) {
        candidates.push(m);
      }
    });
  }

  // 3. Ultimate fallback
  if (candidates.length === 0) {
    candidates.push("black-forest-labs/flux.2-pro");
  }

  return candidates;
}

/**
 * Legacy support for single model selection.
 */
export function selectModel(task: TaskType): string {
  return getModelCandidates(task)[0];
}
