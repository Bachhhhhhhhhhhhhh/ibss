"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlowCard } from "@/components/common/glow-card";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  trend?: number;
  delay?: number;
  className?: string;
  accent?: "emerald" | "amber" | "blue";
}

const accentMap = {
  emerald: { icon: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", glow: "rgba(16, 185, 129, 0.12)" },
  amber: { icon: "bg-amber-500/15 text-amber-400 border-amber-500/20", glow: "rgba(245, 158, 11, 0.1)" },
  blue: { icon: "bg-blue-500/15 text-blue-400 border-blue-500/20", glow: "rgba(59, 130, 246, 0.1)" },
};

export function KpiCard({
  title,
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  icon: Icon,
  trend,
  delay = 0,
  className,
  accent = "emerald",
}: KpiCardProps) {
  const a = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 18 }}
    >
      <GlowCard glowColor={a.glow} className={className}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className={cn("p-3 rounded-2xl border", a.icon)}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
                {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
              </div>
            )}
          </div>
          <p className="text-xs text-theme-subtle mb-2 uppercase tracking-[0.12em] font-medium">{title}</p>
          <p className="text-3xl md:text-4xl font-display text-foreground tabular-nums leading-none">
            <AnimatedCounter value={value} decimals={decimals} suffix={suffix} prefix={prefix} />
          </p>
          <div className="mt-5 flex items-end gap-[3px] h-7 spark-luxury opacity-50 group-hover:opacity-80 transition-opacity">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-emerald-600/80 to-emerald-400/40 min-h-[2px]"
                style={{ height: `${28 + Math.sin(i * 0.85 + delay) * 30 + ((i * 5 + delay * 8) % 24)}%` }}
              />
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}