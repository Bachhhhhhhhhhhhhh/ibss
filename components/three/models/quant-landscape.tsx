"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

const BARS = [
  { h: 1.2, color: friendlyPalette.jade, x: -2.4 },
  { h: 1.8, color: friendlyPalette.emerald, x: -1.6 },
  { h: 1.4, color: friendlyPalette.forest, x: -0.8 },
  { h: 2.2, color: friendlyPalette.mint, x: 0 },
  { h: 1.6, color: friendlyPalette.sky, x: 0.8 },
  { h: 2.5, color: friendlyPalette.jade, x: 1.6 },
  { h: 2.0, color: friendlyPalette.emerald, x: 2.4 },
];

export function QuantLandscape() {
  const group = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <Float speed={1} floatIntensity={0.08}>
      <group ref={group}>
        {BARS.map((b, i) => (
          <group key={i} position={[b.x, b.h / 2, 0]}>
            <RoundedBox args={[0.55, b.h, 0.55]} radius={0.08} smoothness={3} castShadow>
              <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={0.15} roughness={0.5} />
            </RoundedBox>
            <mesh position={[0, b.h / 2 + 0.08, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
        <RoundedBox args={[5.5, 0.08, 1.2]} radius={0.04} position={[0, 0.04, 0]} receiveShadow>
          <meshStandardMaterial color={friendlyPalette.platform} roughness={0.9} />
        </RoundedBox>
        <mesh position={[0, 3.2, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={friendlyPalette.mint} emissive={friendlyPalette.jade} emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}