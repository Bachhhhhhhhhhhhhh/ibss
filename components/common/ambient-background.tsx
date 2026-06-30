"use client";

import { usePerformanceStore } from "@/lib/stores/performance";

export function AmbientBackground() {
  const settings = usePerformanceStore((s) => s.settings);
  const tier = usePerformanceStore((s) => s.tier);

  const particleCount = settings.particles;
  const orbCount = settings.auroraOrbs;

  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-mesh" />
      <div className="symbiosis-field" />
      {orbCount >= 1 && <div className="aurora-orb aurora-orb-1" />}
      {orbCount >= 2 && <div className="aurora-orb aurora-orb-2" />}
      {orbCount >= 3 && <div className="aurora-orb aurora-orb-3" />}
      {orbCount >= 4 && <div className="aurora-orb aurora-orb-4" />}
      {orbCount >= 5 && <div className="aurora-orb aurora-orb-5" />}
      <div className="mesh-grid absolute inset-0 opacity-60" />
      {tier === "ultra" && <div className="light-leak light-leak-1" />}
      {tier === "ultra" && <div className="light-leak light-leak-2" />}
      {Array.from({ length: particleCount }, (_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 10) % 90}%`,
            animationDuration: `${5 + (i % 5) * 1.2}s`,
            animationDelay: `${i * 0.35}s`,
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            opacity: 0.2 + (i % 4) * 0.15,
          }}
        />
      ))}
    </div>
  );
}