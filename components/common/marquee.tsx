"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: "slow" | "normal";
}

export function Marquee({ items, className, speed = "normal" }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden border-y border-white/5 bg-white/[0.02]", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#021a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#021a0f] to-transparent z-10 pointer-events-none" />
      <div
        className={cn("flex gap-12 py-4 whitespace-nowrap animate-marquee", speed === "slow" && "[animation-duration:50s]")}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-sm text-white/30 font-medium tracking-wide">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}