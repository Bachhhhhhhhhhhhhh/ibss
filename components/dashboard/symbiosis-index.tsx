"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useI18nStore } from "@/lib/stores/i18n";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { GlowCard } from "@/components/common/glow-card";
import { cn } from "@/lib/utils";

function RadialGauge({ value, size = 140 }: { value: number; size?: number }) {
  const r = (size - 12) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="gauge-ring -rotate-90" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="6"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
      />
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SymbiosisIndex() {
  const metrics = useLiveMetricsStore((s) => s.displayMetrics);
  const language = useI18nStore((s) => s.language);
  const isUp = metrics.symbiosisDelta >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <GlowCard glowColor="rgba(16, 185, 129, 0.22)" className="overflow-visible ultra-glass">
        <div className="relative p-8 md:p-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-4 w-4 text-emerald-400" />
                <p className="text-xs text-emerald-400/90 uppercase tracking-[0.25em] font-semibold">
                  {language === "en" ? "Live Symbiosis Index" : "Chỉ số Cộng sinh Trực tiếp"}
                </p>
                <span className="live-dot" aria-label="Live" />
              </div>
              <div className="flex items-end gap-5 flex-wrap">
                <span className="text-[clamp(4rem,11vw,7.5rem)] font-display text-gradient-emerald tabular-nums leading-none" aria-live="polite">
                  <AnimatedCounter value={metrics.symbiosisScore} decimals={1} />
                </span>
                <div
                  className={cn(
                    "flex items-center gap-1.5 pb-3 px-4 py-2 rounded-full text-sm font-semibold ultra-glass",
                    isUp ? "text-emerald-400 border-emerald-500/20" : "text-red-400 border-red-500/20"
                  )}
                >
                  {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {isUp ? "+" : ""}
                  {metrics.symbiosisDelta.toFixed(2)}
                </div>
              </div>
              <p className="text-sm text-theme-subtle mt-4 max-w-md font-light">
                {language === "en"
                  ? "Composite ESG intelligence score synthesizing environmental, social, and governance signals across Engma's global operations."
                  : "Điểm thông minh ESG tổng hợp từ tín hiệu môi trường, xã hội và quản trị trên toàn cầu Engma."}
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative hidden sm:flex items-center justify-center">
                <RadialGauge value={metrics.symbiosisScore} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-display text-emerald-400 tabular-nums">
                    {Math.round(metrics.symbiosisScore)}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-theme-subtle mb-3 uppercase tracking-wider">
                  {language === "en" ? "Pillar Weight" : "Trọng số Trụ cột"}
                </p>
                <div className="flex gap-4">
                  {[
                    { label: "E", val: 38, color: "bg-emerald-500" },
                    { label: "S", val: 32, color: "bg-blue-500" },
                    { label: "G", val: 30, color: "bg-amber-500" },
                  ].map((p) => (
                    <div key={p.label} className="text-center">
                      <div className="w-11 h-20 rounded-2xl bg-white/5 overflow-hidden flex flex-col justify-end mb-2 border border-white/8">
                        <motion.div
                          className={cn("w-full rounded-t-xl", p.color)}
                          animate={{ height: `${p.val}%` }}
                          transition={{ type: "spring", stiffness: 60 }}
                          style={{ opacity: 0.75 }}
                        />
                      </div>
                      <span className="text-[10px] text-theme-subtle font-mono font-semibold">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 relative">
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-700 via-emerald-400 to-amber-400 relative"
                animate={{ width: `${metrics.symbiosisScore}%` }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2.5 text-[10px] text-theme-subtle font-mono tracking-wider">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}