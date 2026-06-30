"use client";

export function AmbientBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-mesh" />
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="mesh-grid absolute inset-0 opacity-60" />
      {/* CSS floating particles */}
      {Array.from({ length: 18 }, (_, i) => (
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