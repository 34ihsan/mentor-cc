import { getModelCandidates, getImageCandidates } from "./router";
import { AIResponse, TaskType } from "./types";

/**
 * Core function to interact with OpenRouter.
 * Automatically routes the request to the best model based on task type.
 * Implements fallback logic to try alternative models if the primary one fails.
 */
export async function askAI(
  prompt: string,
  task: TaskType = "simple",
  systemPrompt?: string
): Promise<AIResponse> {
  const candidates = getModelCandidates(task);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "sk-xxx" || apiKey.length < 10) {
    throw new Error("OPENROUTER_API_KEY is not configured properly in .env");
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  let lastError: Error | null = null;

  // Try each candidate model in order
  for (const model of candidates) {
    try {
      console.log(`[AI] Attempting task "${task}" with model: ${model}`);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Mentor Career Consulting Platform",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || `Status ${response.status}`;
        console.warn(`[AI] Model ${model} failed: ${errorMessage}`);
        lastError = new Error(errorMessage);
        continue; // Try next model
      }

      const result = await response.json();
      
      if (!result.choices || result.choices.length === 0) {
        console.warn(`[AI] Model ${model} returned empty results`);
        lastError = new Error("Empty response from AI");
        continue;
      }

      console.log(`[AI] Success with model: ${result.model || model}`);
      
      return {
        content: result.choices[0].message.content,
        model: result.model || model,
        usage: result.usage,
      };
    } catch (error: any) {
      console.error(`[AI] Error with model ${model}:`, error.message);
      lastError = error;
      continue; // Try next model
    }
  }

  // If we get here, all models failed
  throw lastError || new Error("All AI models failed to respond");
}

/**
 * Function to generate images using OpenRouter.
 * Uses the OPENROUTER_IMAGE_MODEL specified in .env.
 */
export async function askImage(
  prompt: string,
  size: "256x256" | "512x512" | "1024x1024" = "1024x1024"
): Promise<{ url: string; model: string }> {
  const candidates = getImageCandidates();
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "sk-xxx" || apiKey.length < 10) {
    throw new Error("OPENROUTER_API_KEY is not configured properly in .env");
  }

  let lastError: Error | null = null;

  for (const model of candidates) {
    try {
      console.log(`[AI-Image] Attempting image generation with model: ${model}`);
      
      const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Mentor Career Consulting Platform",
        },
        body: JSON.stringify({
          model,
          prompt,
          size,
          n: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || `Status ${response.status}`;
        console.warn(`[AI-Image] Model ${model} failed: ${errorMessage}`);
        lastError = new Error(errorMessage);
        continue;
      }

      const result = await response.json();
      
      if (!result.data || result.data.length === 0) {
        lastError = new Error("Empty image response from AI");
        continue;
      }

      console.log(`[AI-Image] Success with model: ${model}`);
      return {
        url: result.data[0].url,
        model: model
      };
    } catch (error: any) {
      console.error(`[AI-Image] Error with model ${model}:`, error.message);
      lastError = error;
      continue;
    }
  }

  throw lastError || new Error("All AI image models failed to respond");
}
