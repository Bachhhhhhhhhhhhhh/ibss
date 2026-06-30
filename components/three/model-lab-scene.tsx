"use client";

import { useState, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { ThreeCanvasShell } from "@/components/three/three-canvas-shell";
import { FriendlyStage } from "@/lib/three/friendly-stage";
import { ModelComponents } from "@/components/three/model-registry";

const CAMERA_MAP: Record<string, { position: [number, number, number]; fov?: number }> = {
  "huigui-twin": { position: [5, 4, 7], fov: 42 },
  "esg-globe": { position: [0, 2, 8], fov: 48 },
  "carbon-lattice": { position: [4, 3, 6], fov: 45 },
  mycorrhizal: { position: [5, 4, 6], fov: 46 },
  "smart-grid": { position: [6, 5, 7], fov: 44 },
  "hydro-loop": { position: [5, 3.5, 7], fov: 44 },
  "rice-fractal": { position: [5, 4, 6.5], fov: 42 },
  "biodiversity-helix": { position: [0, 1.5, 7], fov: 48 },
  "quant-engine": { position: [0, 3, 8], fov: 45 },
  "prediction-oracle": { position: [0, 2.5, 7.5], fov: 46 },
  "intel-nexus": { position: [0, 2, 8], fov: 48 },
};

const ACCENT_MAP: Record<string, string> = {
  "huigui-twin": "#10b981",
  "esg-globe": "#38bdf8",
  "carbon-lattice": "#fbbf24",
  mycorrhizal: "#a78bfa",
  "smart-grid": "#f59e0b",
  "hydro-loop": "#0ea5e9",
  "rice-fractal": "#22c55e",
  "biodiversity-helix": "#f472b6",
  "quant-engine": "#34d399",
  "prediction-oracle": "#f59e0b",
  "intel-nexus": "#7dd3fc",
};

function ModelScene({ modelId, autoRotate }: { modelId: string; autoRotate: boolean }) {
  const accent = ACCENT_MAP[modelId] ?? "#10b981";
  const Model = ModelComponents[modelId];

  return (
    <FriendlyStage accent={accent}>
      {Model && <Model />}
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
      />
    </FriendlyStage>
  );
}

interface ModelLabSceneProps {
  modelId: string;
  modelName: string;
  accentColor: string;
  isVisible?: boolean;
}

export function ModelLabScene({ modelId, modelName, accentColor, isVisible = true }: ModelLabSceneProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const camera = CAMERA_MAP[modelId] ?? CAMERA_MAP["huigui-twin"];

  return (
    <div
      className="model-viewport-frame relative"
      onPointerDown={() => setAutoRotate(false)}
      onPointerUp={() => setTimeout(() => setAutoRotate(true), 6000)}
      style={{ "--model-accent": accentColor } as React.CSSProperties}
    >
      <div className="model-viewport-chrome" aria-hidden>
        <span className="model-viewport-corner model-viewport-corner-tl" />
        <span className="model-viewport-corner model-viewport-corner-tr" />
        <span className="model-viewport-corner model-viewport-corner-bl" />
        <span className="model-viewport-corner model-viewport-corner-br" />
      </div>

      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between pointer-events-none">
        <div className="model-viewport-badge">
          <span className="live-dot scale-75" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Live 3D</span>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md max-w-[60%] truncate"
          style={{
            color: accentColor,
            borderColor: `${accentColor}44`,
            background: `${accentColor}12`,
          }}
        >
          {modelName}
        </div>
      </div>

      <ThreeCanvasShell
        camera={camera}
        isVisible={isVisible}
        height="h-[420px] md:h-[520px]"
        hint=""
        className="!border-0 !rounded-none !bg-transparent"
      >
        <Suspense fallback={null}>
          <ModelScene modelId={modelId} autoRotate={autoRotate && isVisible} />
        </Suspense>
      </ThreeCanvasShell>
    </div>
  );
}