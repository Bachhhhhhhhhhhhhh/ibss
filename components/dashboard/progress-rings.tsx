"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useI18nStore } from "@/lib/stores/i18n";
import { AnimatedCounter } from "@/components/common/animated-counter";

interface RingProps {
  label: string;
  current: number;
  target: number;
  color: string;
}

function ProgressRing({ label, current, target, color }: RingProps) {
  const pct = Math.min(100, (current / target) * 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, type: "spring" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-white tabular-nums">
            <AnimatedCounter value={current} decimals={1} suffix="%" />
          </span>
        </div>
      </div>
      <p className="text-xs text-white/50 mt-2 text-center">{label}</p>
      <p className="text-xs text-white/30">/ {target}% target</p>
    </div>
  );
}

export function ProgressRings() {
  const metrics = useLiveMetricsStore((s) => s.displayMetrics);
  const language = useI18nStore((s) => s.language);

  const rings: RingProps[] = [
    { label: language === "en" ? "Scope 1+2" : "Phạm vi 1+2", current: metrics.scope1Progress + metrics.scope2Progress, target: 20, color: "#10b981" },
    { label: language === "en" ? "Scope 3" : "Phạm vi 3", current: metrics.scope3Progress, target: 30, color: "#3b82f6" },
    { label: language === "en" ? "Renewable" : "Tái tạo", current: metrics.renewablePercent, target: 100, color: "#f59e0b" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {language === "en" ? "SBTi Near-Term Targets" : "Mục tiêu Ngắn hạn SBTi"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around flex-wrap gap-6" role="group" aria-label="SBTi progress rings">
          {rings.map((ring) => (
            <ProgressRing key={ring.label} {...ring} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}