"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePerformanceStore } from "@/lib/stores/performance";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const cinematic = usePerformanceStore((s) => s.settings.cinematicOverlay);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #10b981, #34d399, #f59e0b, #a855f7, #10b981)",
          backgroundSize: "300% 100%",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 h-[2px] w-10 origin-left z-[61] bg-white/70 blur-sm"
        style={{ scaleX, opacity: cinematic ? 0.9 : 0.6 }}
        aria-hidden="true"
      />
      {cinematic && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-px origin-left z-[59]"
          style={{
            scaleX,
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)",
            boxShadow: "0 0 16px rgba(16,185,129,0.35)",
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}