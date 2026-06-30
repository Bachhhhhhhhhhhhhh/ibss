"use client";

import { usePerformanceStore } from "@/lib/stores/performance";

export function CinematicOverlay() {
  const cinematic = usePerformanceStore((s) => s.settings.cinematicOverlay);
  if (!cinematic) return null;

  return (
    <div className="cinematic-overlay" aria-hidden="true">
      <div className="cinematic-scanline" />
      <div className="cinematic-edge-glow" />
    </div>
  );
}