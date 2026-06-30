"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

function useFinePointer() {
  return useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, getFinePointerServerSnapshot);
}

export function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = !reduced && finePointer;
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 800, damping: 35 });
  const dotY = useSpring(y, { stiffness: 800, damping: 35 });
  const ringX = useSpring(x, { stiffness: 180, damping: 20 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        "a, button, [role='button'], [role='tab'], input, textarea, select, label, canvas"
      );
      const cursorOverride = document.documentElement.dataset.cursor === "pointer";
      setHovering(isInteractive || cursorOverride);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] pointer-events-none z-[9999] cursor-ring-premium"
        style={{ x: ringX, y: ringY, scale: hovering ? 1.8 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 280, damping: 18 } }}
        aria-hidden="true"
      >
        <div />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-emerald-400 pointer-events-none z-[9999] shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ x: dotX, y: dotY, scale: hovering ? 0.5 : 1 }}
        aria-hidden="true"
      />
    </>
  );
}