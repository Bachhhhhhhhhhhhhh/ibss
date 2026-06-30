"use client";

import type { SavedScenario } from "@/types";
import { SLIDER_LABELS } from "@/lib/strategy/calculations";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

interface ScenarioCompareProps {
  scenarios: SavedScenario[];
}

export function ScenarioCompare({ scenarios }: ScenarioCompareProps) {
  const language = useI18nStore((s) => s.language);
  const compareSet = scenarios.slice(0, 4);
  const sliderKeys = Object.keys(compareSet[0]?.sliders ?? {}) as (keyof SavedScenario["sliders"])[];

  if (compareSet.length < 2) return null;

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
              {language === "en" ? "Metric" : "Chỉ số"}
            </th>
            {compareSet.map((s) => (
              <th key={s.id} className="text-left py-3 px-3 text-emerald-400 font-medium text-xs max-w-[140px]">
                <span className="line-clamp-2">{s.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 bg-emerald-500/5">
            <td className="py-2.5 pr-4 text-white/70 font-medium">
              {language === "en" ? "Symbiosis Score 2030" : "Điểm Cộng sinh 2030"}
            </td>
            {compareSet.map((s) => (
              <td key={s.id} className="py-2.5 px-3 text-emerald-300 font-mono font-semibold">
                {s.projectedScore}
              </td>
            ))}
          </tr>
          <tr className="border-b border-white/5">
            <td className="py-2.5 pr-4 text-white/70 font-medium">
              {language === "en" ? "Net-Zero Year" : "Năm Net-Zero"}
            </td>
            {compareSet.map((s) => (
              <td key={s.id} className="py-2.5 px-3 text-amber-300 font-mono">
                {s.netZeroYear}
              </td>
            ))}
          </tr>
          {sliderKeys.map((key, i) => (
            <tr key={key} className={cn("border-b border-white/5", i % 2 === 0 && "bg-white/[0.02]")}>
              <td className="py-2.5 pr-4 text-white/60 text-xs">
                {SLIDER_LABELS[key][language]}
              </td>
              {compareSet.map((s) => (
                <td key={s.id} className="py-2.5 px-3 text-white/80 font-mono text-xs">
                  {s.sliders[key]}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {scenarios.length > 4 && (
        <p className="text-xs text-white/40 mt-3">
          {language === "en"
            ? `Showing first 4 of ${scenarios.length} scenarios`
            : `Hiển thị 4/${scenarios.length} kịch bản đầu tiên`}
        </p>
      )}
    </div>
  );
}