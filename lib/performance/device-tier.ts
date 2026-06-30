import type { PerformanceTier } from "./tier-config";

export function detectDeviceTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;

  if (isMobile && cores <= 4 && memory <= 4) return "low";
  if (isMobile || (isCoarse && memory <= 4)) return "medium";
  if (cores >= 10 && memory >= 8 && !isMobile) return "ultra";
  if (cores >= 6 && memory >= 4) return "high";
  return "medium";
}