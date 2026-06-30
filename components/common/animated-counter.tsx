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

export function AnimatedCounter({ value, decimals = 0, suffix = "", prefix = "", className }: AnimatedCounterProps) {
  const spring = useSpring(value, { stiffness: 60, damping: 20, mass: 0.8 });
  const display = useTransform(spring, (v) => formatNumber(v, decimals));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`;
    });
    return unsub;
  }, [display, prefix, suffix]);

  return (
    <motion.span ref={ref} className={className} aria-live="polite">
      {prefix}{formatNumber(value, decimals)}{suffix}
    </motion.span>
  );
}