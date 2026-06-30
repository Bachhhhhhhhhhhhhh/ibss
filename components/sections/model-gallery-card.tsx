"use client";

import * as LucideIcons from "lucide-react";
import { Check } from "lucide-react";
import type { ModelLabEntry } from "@/lib/data/model-lab";
import { cn } from "@/lib/utils";

interface ModelGalleryCardProps {
  model: ModelLabEntry;
  active: boolean;
  language: "en" | "vi";
  onSelect: () => void;
  index: number;
}

export function ModelGalleryCard({ model, active, language, onSelect, index }: ModelGalleryCardProps) {
  const Icon = LucideIcons[model.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "model-gallery-card group relative flex-shrink-0 w-[200px] sm:w-[220px] text-left rounded-2xl overflow-hidden transition-all duration-400",
        active ? "model-gallery-card-active scale-[1.02]" : "hover:scale-[1.01] opacity-80 hover:opacity-100"
      )}
      style={{ "--model-accent": model.accent } as React.CSSProperties}
    >
      <div className={cn("model-gallery-card-art relative h-[120px] bg-gradient-to-br", model.gradient)}>
        <div className="absolute inset-0 model-gallery-mesh opacity-40" aria-hidden />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(circle at 70% 30%, ${model.accent}55, transparent 55%)` }}
          aria-hidden
        />
        {Icon && (
          <span
            className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-35 transition-opacity inline-flex"
            style={{ color: model.accent }}
            aria-hidden
          >
            <Icon className="h-10 w-10" />
          </span>
        )}
        <span
          className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border"
          style={{
            color: model.accent,
            borderColor: `${model.accent}44`,
            background: `${model.accent}15`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {active && (
          <span className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-emerald-950">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="p-3.5 border-t border-white/[0.06] bg-[#021a0f]/90">
        <p className={cn("text-sm font-semibold leading-tight truncate", active ? "text-white" : "text-white/75")}>
          {language === "en" ? model.name : model.nameVi}
        </p>
        <p className="text-[10px] text-white/40 mt-1 truncate">
          {language === "en" ? model.category : model.categoryVi}
        </p>
        <p className="text-[10px] font-mono mt-1.5" style={{ color: active ? model.accent : "rgba(255,255,255,0.35)" }}>
          {model.nodes}
        </p>
      </div>
    </button>
  );
}