"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Sparkles, ChevronRight } from "lucide-react";
import type { ModelLabEntry } from "@/lib/data/model-lab";
import { cn } from "@/lib/utils";

interface ModelDetailPanelProps {
  model: ModelLabEntry;
  language: "en" | "vi";
  className?: string;
}

export function ModelDetailPanel({ model, language, className }: ModelDetailPanelProps) {
  const Icon = LucideIcons[model.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      key={model.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={cn("model-detail-panel", className)}
      role="tabpanel"
      style={{ "--model-accent": model.accent } as React.CSSProperties}
    >
      <div className="model-detail-panel-glow" aria-hidden />

      <div className="relative p-6 md:p-7">
        <div className="flex items-start gap-4 mb-5">
          <div
            className="p-3.5 rounded-2xl shrink-0 border"
            style={{
              background: `${model.accent}18`,
              borderColor: `${model.accent}33`,
              color: model.accent,
            }}
          >
            {Icon && <Icon className="h-7 w-7" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                style={{ color: model.accent, borderColor: `${model.accent}40`, background: `${model.accent}12` }}
              >
                {language === "en" ? model.category : model.categoryVi}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/45">
                {language === "en" ? model.complexity.split("·")[0].trim() : model.complexityVi.split("·")[0].trim()}
              </span>
            </div>
            <h3 className="font-display text-2xl text-white leading-tight">
              {language === "en" ? model.name : model.nameVi}
            </h3>
            <p className="text-sm mt-1" style={{ color: `${model.accent}cc` }}>
              {language === "en" ? model.tagline : model.taglineVi}
            </p>
          </div>
        </div>

        <p className="text-sm text-body-friendly leading-relaxed mb-6">
          {language === "en" ? model.description : model.descriptionVi}
        </p>

        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3" style={{ color: model.accent }} />
            {language === "en" ? "Key highlights" : "Điểm nổi bật"}
          </p>
          <ul className="space-y-2">
            {model.highlights.map((h) => (
              <li key={h.en} className="flex items-start gap-2.5 text-sm text-white/70">
                <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" style={{ color: model.accent }} />
                {language === "en" ? h.en : h.vi}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {model.specs.map((spec) => (
            <div
              key={spec.label}
              className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <p className="text-[10px] text-white/35 uppercase tracking-wider">
                {language === "en" ? spec.label : spec.labelVi}
              </p>
              <p className="text-sm font-semibold text-white mt-0.5 font-mono">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-2.5">
            {language === "en" ? "Model features" : "Tính năng mô hình"}
          </p>
          <div className="flex flex-wrap gap-2">
            {model.features.map((f) => {
              const FIcon = LucideIcons[f.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
              return (
                <span
                  key={f.title}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-white/[0.08] bg-white/[0.03] text-white/65"
                >
                  {FIcon && (
                    <span style={{ color: model.accent }} className="inline-flex">
                      <FIcon className="h-3 w-3" />
                    </span>
                  )}
                  {language === "en" ? f.title : f.titleVi}
                </span>
              );
            })}
          </div>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border"
          style={{
            background: `${model.accent}08`,
            borderColor: `${model.accent}25`,
          }}
        >
          <div className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: model.accent }} />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {language === "en" ? "ESG pillar" : "Trụ cột ESG"}
            </p>
            <p className="text-xs font-medium text-white/80 mt-0.5">
              {language === "en" ? model.esgPillar : model.esgPillarVi}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}