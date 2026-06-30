"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

const BUILDINGS: { pos: [number, number, number]; size: [number, number, number]; color: string; solar?: boolean }[] = [
  { pos: [-1.2, 0.5, -1], size: [0.5, 1, 0.5], color: "#e7e5e4" },
  { pos: [0, 0.7, -1.2], size: [0.6, 1.4, 0.6], color: friendlyPalette.cream, solar: true },
  { pos: [1.2, 0.4, -1], size: [0.45, 0.8, 0.45], color: "#d6d3d1" },
  { pos: [-1, 0.35, 0.3], size: [0.4, 0.7, 0.4], color: friendlyPalette.cream },
  { pos: [0.2, 0.9, 0.2], size: [0.55, 1.8, 0.55], color: "#fafaf9", solar: true },
  { pos: [1.1, 0.55, 0.4], size: [0.5, 1.1, 0.5], color: "#e7e5e4", solar: true },
  { pos: [-0.5, 0.25, 1.1], size: [0.35, 0.5, 0.35], color: "#d6d3d1" },
  { pos: [0.8, 0.3, 1], size: [0.4, 0.6, 0.4], color: friendlyPalette.cream },
  { pos: [-1.3, 0.2, 0.8], size: [0.35, 0.4, 0.35], color: "#f5f5f4" },
];

export function SmartGridCity() {
  const particles = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (particles.current) particles.current.rotation.y = s.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={1} floatIntensity={0.08}>
      <group>
        {BUILDINGS.map((b, i) => (
          <group key={i} position={b.pos}>
            <RoundedBox args={b.size} radius={0.06} smoothness={3} castShadow>
              <meshStandardMaterial color={b.color} roughness={0.55} />
            </RoundedBox>
            {b.solar && (
              <RoundedBox args={[b.size[0] * 0.9, 0.04, b.size[2] * 0.9]} radius={0.02} position={[0, b.size[1] / 2 + 0.03, 0]}>
                <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.4} />
              </RoundedBox>
            )}
          </group>
        ))}
        {/* Energy flow ring */}
        <group ref={particles}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 2, 0.15, Math.sin(a) * 2]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.8} />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}