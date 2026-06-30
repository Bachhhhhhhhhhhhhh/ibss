"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useI18nStore } from "@/lib/stores/i18n";

export function FloatingCta() {
  const language = useI18nStore((s) => s.language);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 max-w-[220px] hidden md:block"
      role="complementary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, type: "spring" }}
    >
      <div className="glass-panel px-4 py-3.5 rounded-2xl text-xs text-white/50 flex items-start gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-emerald-500/10">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 shrink-0">
          <FileText className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <span className="leading-relaxed">
          {language === "en"
            ? "Built to complement official PPT + Video submission"
            : "Bổ sung cho nộp PPT + Video chính thức"}
        </span>
      </div>
    </motion.div>
  );
}