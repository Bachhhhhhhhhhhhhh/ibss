"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const spring = useSpring(value, { stiffness: 80, damping: 24, mass: 0.6 });
  const mounted = useRef(false);

  const display = useTransform(spring, (v) => `${prefix}${formatNumber(v, decimals)}${suffix}`);

  useEffect(() => {
    if (!mounted.current) {
      spring.jump(value);
      mounted.current = true;
      return;
    }
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span className={className} aria-live="polite">
      {display}
    </motion.span>
  );
}