"use client";

import { Info } from "lucide-react";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

interface InteractionHintProps {
  en: string;
  vi: string;
  className?: string;
}

export function InteractionHint({ en, vi, className }: InteractionHintProps) {
  const language = useI18nStore((s) => s.language);

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/15 text-sm text-white/65",
        className
      )}
      role="note"
    >
      <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden />
      <p className="leading-relaxed">{language === "en" ? en : vi}</p>
    </div>
  );
}