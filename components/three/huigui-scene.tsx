"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { huiguiHotspots } from "@/lib/data/huigui-hotspots";
import { HuiguiMegastructure } from "@/components/three/models/huigui-megastructure";
import { FriendlyStage } from "@/lib/three/friendly-stage";
import type { HuiguiHotspot } from "@/types";

function HotspotMarker({
  hotspot,
  onClick,
  active,
}: {
  hotspot: HuiguiHotspot;
  onClick: () => void;
  active: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2 + hotspot.position[0]) * 0.08;
    meshRef.current.scale.setScalar(active ? s * 1.2 : s);
  });

  return (
    <Float speed={2} floatIntensity={0.2}>
      <group position={hotspot.position}>
        <mesh
          ref={meshRef}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.documentElement.dataset.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.documentElement.dataset.cursor = "";
          }}
        >
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial
            color={active ? "#fcd34d" : "#6ee7b7"}
            emissive={active ? "#f59e0b" : "#10b981"}
            emissiveIntensity={active ? 0.7 : 0.45}
            roughness={0.35}
          />
        </mesh>
        <mesh scale={2.2}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial
            color={active ? "#f59e0b" : "#34d399"}
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <FriendlyStage accent="#10b981">
      <HuiguiMegastructure />
      {huiguiHotspots.map((h) => (
        <HotspotMarker
          key={h.id}
          hotspot={h}
          active={activeId === h.id}
          onClick={() => onSelect(activeId === h.id ? null : h.id)}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.08}
      />
    </FriendlyStage>
  );
}

interface HuiguiSceneProps {
  activeHotspot: string | null;
  onSelectHotspot: (id: string | null) => void;
  isVisible?: boolean;
}

export function HuiguiScene({ activeHotspot, onSelectHotspot, isVisible = true }: HuiguiSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-white/10 relative touch-none"
    >
      <Canvas
        camera={{ position: [5, 4, 7], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "demand"}
        style={{ background: "#0c1f17" }}
      >
        <Suspense fallback={null}>
          <Scene activeId={activeHotspot} onSelect={onSelectHotspot} />
        </Suspense>
      </Canvas>
    </div>
  );
}