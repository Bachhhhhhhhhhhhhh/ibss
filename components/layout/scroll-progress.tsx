"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #10b981, #34d399, #f59e0b, #10b981)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 h-[2px] w-8 origin-left z-[61] bg-white/60 blur-sm"
        style={{ scaleX, x: 0 }}
        aria-hidden="true"
      />
    </>
  );
}