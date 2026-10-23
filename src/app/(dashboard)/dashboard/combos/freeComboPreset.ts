// Free LLM API combo preset — pure data, mirrors kimiComboPreset.ts so it can be
// unit-tested with node:test (no DOM/next-intl needed).
//
// One "priority" combo chaining the free tiers listed by
// github.com/mnfst/awesome-free-llm-apis. Every entry is a provider/model pair
// already classified free in FREE_MODEL_BUDGETS
// (open-sse/config/freeModelCatalog.data.ts). Selection rules:
//  - only recurring free tiers (daily/monthly/uncapped) or keyless — no
//    one-time trial credits (e.g. nvidia), which run out and never come back;
//  - no tos: "ambiguous"/"avoid" entries (e.g. ollama-cloud, agy);
//  - fastest / most generous tiers first, keyless ovhcloud last as the
//    always-available safety net.
// Targets whose provider has no configured connection are skipped by combo
// routing, so the preset works with any subset of these keys.
export const FREE_LLM_PRESET_NAME = "Free LLM APIs";

export interface FreeComboPresetModel {
  provider: string;
  model: string;
  weight: number;
}

export interface FreeComboPreset {
  name: string;
  strategy: "priority";
  models: FreeComboPresetModel[];
}

export const FREE_LLM_PRESET: FreeComboPreset = {
  name: FREE_LLM_PRESET_NAME,
  strategy: "priority",
  models: [
    { provider: "groq", model: "openai/gpt-oss-120b", weight: 100 },
    { provider: "gemini", model: "gemini-2.5-flash", weight: 100 },
    { provider: "mistral", model: "mistral-small-latest", weight: 100 },
    { provider: "siliconflow", model: "Qwen/Qwen3-32B", weight: 100 },
    { provider: "glm", model: "glm-4.7-flash", weight: 100 },
    { provider: "cohere", model: "command-a-03-2025", weight: 100 },
    { provider: "kilo-gateway", model: "kilo-auto/free", weight: 100 },
    { provider: "cloudflare-ai", model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", weight: 100 },
    { provider: "huggingface", model: "deepseek-ai/DeepSeek-V3", weight: 100 },
    { provider: "aion", model: "aion-labs/aion-3.0-mini", weight: 100 },
    { provider: "llm7", model: "gpt-4o-mini-2024-07-18", weight: 100 },
    { provider: "openrouter", model: "auto", weight: 100 },
    { provider: "ovhcloud", model: "gpt-oss-120b", weight: 100 },
  ],
};

/** True when `combos` (as returned by GET /api/combos) already has the Free LLM preset. */
export function hasFreeLlmPreset(combos: Array<{ name?: string | null }>): boolean {
  return combos.some((combo) => combo?.name === FREE_LLM_PRESET_NAME);
}
