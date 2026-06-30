"use client";

import { motion } from "framer-motion";
import { Calculator, TrendingDown, TrendingUp } from "lucide-react";
import { QUANT_MODELS } from "@/lib/quant/baseline";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { cn } from "@/lib/utils";

export function QuantModelRegistry() {
  const language = useI18nStore((s) => s.language);
  const outputs = useQuantEngineStore((s) => s.snapshot.modelOutputs);
  const lastComputed = useQuantEngineStore((s) => s.snapshot.lastComputed);

  const outputMap = new Map(outputs.map((o) => [o.modelId, o]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-xs text-emerald-400/80 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Calculator className="h-3.5 w-3.5" />
          {language === "en" ? "Quant Model Registry" : "Sổ đăng ký Mô hình Định lượng"}
        </p>
        <span className="text-[10px] font-mono text-white/35">
          {language === "en" ? "Computed" : "Tính toán"}: {lastComputed.toLocaleTimeString()}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {QUANT_MODELS.map((model, i) => {
          const out = outputMap.get(model.id);
          const isDownGood = model.id === "ghg-emissions" || model.id === "carbon-intensity";
          const trendUp = (out?.delta ?? 0) >= 0;
          const trendGood = isDownGood ? !trendUp : trendUp;

          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="luxury-stat luxury-border rounded-2xl p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: model.color }}
                aria-hidden
              />
              <div className="flex items-start justify-between mb-3 pl-2">
                <p className="text-sm font-medium text-white/90">
                  {language === "en" ? model.name : model.nameVi}
                </p>
                {out && (
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      trendGood ? "text-emerald-400 bg-emerald-500/10" : "text-sky-400 bg-sky-500/10"
                    )}
                  >
                    {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {out.delta > 0 ? "+" : ""}
                    {out.delta}
                  </span>
                )}
              </div>

              <p className="text-[10px] text-white/40 font-mono leading-relaxed mb-4 pl-2">
                {language === "en" ? model.formula : model.formulaVi}
              </p>

              {out && (
                <p className="text-2xl font-display text-white tabular-nums pl-2">
                  <AnimatedCounter
                    value={out.value}
                    decimals={model.unit === "pts" || model.unit === "tCO₂e" ? 1 : 0}
                    suffix={model.unit === "L" ? " L" : model.unit === "pts" ? "" : ` ${model.unit}`}
                  />
                </p>
              )}

              {out?.breakdown && (
                <ul className="mt-3 pt-3 border-t border-white/6 space-y-1 pl-2">
                  {Object.entries(out.breakdown).map(([k, v]) => (
                    <li key={k} className="flex justify-between text-[10px] text-white/45 font-mono">
                      <span>{k}</span>
                      <span className="text-white/70">{typeof v === "number" ? v.toLocaleString() : v}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}