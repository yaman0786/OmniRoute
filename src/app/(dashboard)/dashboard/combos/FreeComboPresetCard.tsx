"use client";

import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";

/**
 * Free LLM API combo preset — card UI. See freeComboPreset.ts for the preset
 * payload. Mirrors KimiComboPresetCard: one-click create through the same
 * handleCreate() path as every other combo.
 */
interface FreeComboPresetCardProps {
  /** True when a combo named FREE_LLM_PRESET_NAME already exists — hides the card. */
  alreadyCreated: boolean;
  creating: boolean;
  onCreate: () => void;
}

export default function FreeComboPresetCard({
  alreadyCreated,
  creating,
  onCreate,
}: FreeComboPresetCardProps) {
  const t = useTranslations("combos");

  if (alreadyCreated) return null;

  return (
    <Card padding="sm" className="border border-emerald-500/50 bg-emerald-500/[0.04]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <span className="material-symbols-outlined text-[20px] text-emerald-700 dark:text-emerald-300">
              savings
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-main">{t("freeLlmPresetTitle")}</p>
            <p className="mt-0.5 text-xs text-text-muted">{t("freeLlmPresetDescription")}</p>
          </div>
        </div>
        <Button size="sm" icon="add" loading={creating} onClick={onCreate} className="shrink-0">
          {t("freeLlmPresetCta")}
        </Button>
      </div>
    </Card>
  );
}
