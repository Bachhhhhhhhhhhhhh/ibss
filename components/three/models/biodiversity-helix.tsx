"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";
import { seededRange } from "@/lib/three/seeded-random";

export function BiodiversityHelix() {
  const helix = useRef<THREE.Group>(null);
  const fireflies = useRef<THREE.Group>(null);

  const beads = Array.from({ length: 28 }, (_, i) => {
    const t = (i / 28) * Math.PI * 3;
    const r = 0.9;
    return {
      pos: [Math.cos(t) * r, (i / 28) * 3.5 - 1.75, Math.sin(t) * r] as [number, number, number],
      color: [friendlyPalette.jade, friendlyPalette.lavender, friendlyPalette.peach, friendlyPalette.sun][i % 4],
    };
  });

  const fireflyPositions = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        pos: [
          seededRange(i * 3, -1.5, 1.5),
          seededRange(i * 3 + 1, -1.5, 1.5),
          seededRange(i * 3 + 2, -1.5, 1.5),
        ] as [number, number, number],
      })),
    []
  );

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (helix.current) helix.current.rotation.y = t * 0.25;
    if (fireflies.current) fireflies.current.rotation.y = -t * 0.15;
  });

  return (
    <Float speed={1.3} floatIntensity={0.12}>
      <group>
        <group ref={helix}>
          {beads.map((b, i) => (
            <mesh key={i} position={b.pos} castShadow>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={0.35} roughness={0.4} />
            </mesh>
          ))}
          <mesh>
            <torusKnotGeometry args={[0.5, 0.08, 64, 8, 2, 3]} />
            <meshStandardMaterial color={friendlyPalette.mint} emissive={friendlyPalette.jade} emissiveIntensity={0.15} transparent opacity={0.4} />
          </mesh>
        </group>
        <group ref={fireflies}>
          {fireflyPositions.map((f, i) => (
            <mesh key={i} position={f.pos}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.9} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}