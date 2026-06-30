"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useI18nStore } from "@/lib/stores/i18n";
import { preloadCriticalAssets } from "@/lib/performance/asset-preload";

export function Preloader() {
  const reduced = useReducedMotion();
  const language = useI18nStore((s) => s.language);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("");
  const [phase, setPhase] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }

    let cancelled = false;

    preloadCriticalAssets((pct, stepLabel) => {
      if (cancelled) return;
      setProgress(pct);
      if (stepLabel) setLabel(stepLabel);
      if (pct >= 100) setPhase("ready");
    }).then(() => {
      if (cancelled) return;
      setTimeout(() => setDone(true), 350);
    });

    const safety = setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setPhase("ready");
        setTimeout(() => setDone(true), 300);
      }
    }, 6000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#021a0f] overflow-hidden"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="preloader-scan" />
          <div className="mesh-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.12),transparent)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="preloader-logo w-20 h-20 rounded-3xl ultra-glass luxury-border flex items-center justify-center mb-8">
              <Leaf className="h-9 w-9 text-emerald-400" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-emerald-400/80">
                {language === "en" ? "Initializing Experience" : "Khởi tạo Trải nghiệm"}
              </p>
            </div>

            <p className="font-display text-3xl md:text-4xl text-white mb-2 tracking-tight">
              Symbiosis Nexus
            </p>
            <p className="text-sm text-white/40 mb-10 font-light">
              {language === "en" ? "Crafting Engma's Global ESG Future" : "Kiến tạo Tương lai ESG Toàn cầu Engma"}
            </p>

            <div className="w-64 h-[3px] bg-white/8 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-amber-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>

            <p className="text-xs font-mono text-emerald-400/70 tabular-nums min-h-[1rem]">
              {phase === "ready"
                ? language === "en"
                  ? "Ready"
                  : "Sẵn sàng"
                : label
                  ? `${Math.round(progress)}% · ${label}`
                  : `${Math.round(progress)}%`}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}