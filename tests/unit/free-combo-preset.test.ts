// Free LLM API combo preset — pure data + gate logic.
// See src/app/(dashboard)/dashboard/combos/freeComboPreset.ts.
import test from "node:test";
import assert from "node:assert/strict";

const preset = await import("../../src/app/(dashboard)/dashboard/combos/freeComboPreset.ts");
const { createComboSchema } = await import("../../src/shared/validation/schemas/combo.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");

test("FREE_LLM_PRESET uses the exported name and priority strategy", () => {
  assert.equal(preset.FREE_LLM_PRESET.name, preset.FREE_LLM_PRESET_NAME);
  assert.equal(preset.FREE_LLM_PRESET.strategy, "priority");
});

test("every preset target is a recurring/keyless free model with acceptable ToS in the catalog", () => {
  for (const { provider, model } of preset.FREE_LLM_PRESET.models) {
    const entry = FREE_MODEL_BUDGETS.find((b) => b.provider === provider && b.modelId === model);
    assert.ok(entry, `${provider}/${model} missing from FREE_MODEL_BUDGETS`);
    assert.notEqual(entry.freeType, "one-time-initial", `${provider}/${model} is trial credit`);
    assert.ok(["ok", "caution"].includes(entry.tos), `${provider}/${model} tos=${entry.tos}`);
  }
});

test("preset has no duplicate targets and ends with the keyless safety net", () => {
  const keys = preset.FREE_LLM_PRESET.models.map((m) => `${m.provider}/${m.model}`);
  assert.equal(new Set(keys).size, keys.length);
  const last = preset.FREE_LLM_PRESET.models.at(-1);
  const entry = FREE_MODEL_BUDGETS.find(
    (b) => b.provider === last.provider && b.modelId === last.model
  );
  assert.equal(entry.freeType, "keyless");
});

test("FREE_LLM_PRESET is a valid createComboSchema payload", () => {
  const result = createComboSchema.safeParse(preset.FREE_LLM_PRESET);
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error?.issues));
});

test("hasFreeLlmPreset detects an existing preset by exact name", () => {
  assert.equal(preset.hasFreeLlmPreset([]), false);
  assert.equal(preset.hasFreeLlmPreset([{ name: "Free LLM APIs" }]), true);
  assert.equal(preset.hasFreeLlmPreset([{ name: "free llm apis" }]), false);
  assert.equal(preset.hasFreeLlmPreset([{ name: null }, {}]), false);
});
