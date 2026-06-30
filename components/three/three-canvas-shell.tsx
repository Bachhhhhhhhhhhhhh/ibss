"use client";

import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { usePerformanceStore } from "@/lib/stores/performance";

interface ThreeCanvasShellProps {
  children: ReactNode;
  height?: string;
  camera?: { position: [number, number, number]; fov?: number };
  isVisible?: boolean;
  hint?: string;
  className?: string;
}

export function ThreeCanvasShell({
  children,
  height = "h-[480px] md:h-[560px]",
  camera = { position: [6, 4, 8], fov: 45 },
  isVisible = true,
  hint = "Drag · Scroll zoom",
  className = "",
}: ThreeCanvasShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settings = usePerformanceStore((s) => s.settings);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", stop, { passive: true });
    return () => el.removeEventListener("wheel", stop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full ${height} rounded-3xl overflow-hidden border border-white/10 bg-[#021a0f] relative touch-none ${className}`}
    >
      <Canvas
        camera={{ position: camera.position, fov: camera.fov ?? 45 }}
        dpr={[1, settings.dprMax]}
        gl={{ antialias: settings.antialias, alpha: false, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "demand"}
        style={{ background: "#021a0f" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      {hint && (
        <div className="absolute bottom-3 left-3 right-3 flex justify-center pointer-events-none z-10">
          <span className="text-[10px] text-white/30 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {hint}
          </span>
        </div>
      )}
    </div>
  );
}