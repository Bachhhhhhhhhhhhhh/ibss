"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useI18nStore } from "@/lib/stores/i18n";

export function Preloader() {
  const reduced = useReducedMotion();
  const language = useI18nStore((s) => s.language);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    if (reduced) return;
    const duration = 2200;
    const start = Date.now();
    const timer = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setPhase("ready");
        setTimeout(() => setDone(true), 600);
      }
    }, 40);

    return () => clearInterval(timer);
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

            <div className="w-56 h-[3px] bg-white/8 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-amber-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="text-xs font-mono text-emerald-400/70 tabular-nums">
              {phase === "ready"
                ? language === "en"
                  ? "Ready"
                  : "Sẵn sàng"
                : `${Math.round(progress)}%`}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}