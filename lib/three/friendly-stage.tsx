"use client";

import { ContactShadows, Float } from "@react-three/drei";
import type { ReactNode } from "react";
import { friendlyPalette } from "@/lib/three/friendly-materials";

interface FriendlyStageProps {
  children: ReactNode;
  accent?: string;
  showPedestal?: boolean;
}

export function FriendlyStage({ children, accent = friendlyPalette.emerald, showPedestal = true }: FriendlyStageProps) {
  return (
    <>
      <color attach="background" args={[friendlyPalette.night]} />
      <fog attach="fog" args={[friendlyPalette.night, 14, 32]} />

      <ambientLight intensity={0.85} color="#e8fff5" />
      <directionalLight position={[6, 10, 4]} intensity={1.1} color="#fffef8" castShadow />
      <directionalLight position={[-4, 6, -3]} intensity={0.35} color="#a7f3d0" />
      <pointLight position={[0, 5, 2]} intensity={0.5} color={accent} distance={18} />
      <hemisphereLight args={["#d1fae5", friendlyPalette.night, 0.55]} />

      {showPedestal && (
        <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.15}>
          <group position={[0, -0.05, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[5.5, 64]} />
              <meshStandardMaterial
                color={friendlyPalette.platform}
                emissive={accent}
                emissiveIntensity={0.06}
                roughness={0.9}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
              <ringGeometry args={[4.8, 5.2, 64]} />
              <meshBasicMaterial color={accent} transparent opacity={0.2} />
            </mesh>
          </group>
        </Float>
      )}

      <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={12} blur={2.5} far={6} color="#021a0f" />

      <group position={[0, 0.15, 0]}>{children}</group>
    </>
  );
}