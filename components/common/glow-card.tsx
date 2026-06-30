"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(16, 185, 129, 0.18)",
  tilt = true,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });

    if (tilt && !reduced) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rotateY.set(((e.clientX - cx) / rect.width) * 10);
      rotateX.set(((cy - e.clientY) / rect.height) * 10);
    }
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        tilt && !reduced
          ? { rotateX: springX, rotateY: springY, transformPerspective: 1200 }
          : undefined
      }
      className={cn(
        "premium-card luxury-border rounded-2xl overflow-hidden relative group",
        className
      )}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, ${glowColor}, transparent 55%)`,
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-[1] bg-gradient-to-br from-white/5 via-transparent to-emerald-500/5" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}