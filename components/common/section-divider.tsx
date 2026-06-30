"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const dotScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1.2, 0]);

  return (
    <div ref={ref} className="relative py-10" aria-hidden="true">
      <motion.div
        className="beam-divider max-w-2xl mx-auto origin-center"
        style={reduced ? {} : { scaleX, opacity }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={reduced ? {} : { scale: dotScale, opacity }}
      >
        <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400/30 animate-ping" />
      </motion.div>
    </div>
  );
}