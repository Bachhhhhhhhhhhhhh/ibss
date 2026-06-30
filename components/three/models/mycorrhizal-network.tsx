"use client";

import { Float } from "@react-three/drei";
import { friendlyPalette } from "@/lib/three/friendly-materials";

function MiniTree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.5, 6]} />
        <meshStandardMaterial color={friendlyPalette.soil} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <coneGeometry args={[0.28, 0.55, 8]} />
        <meshStandardMaterial color={friendlyPalette.forest} emissive={friendlyPalette.jade} emissiveIntensity={0.1} roughness={0.7} />
      </mesh>
    </group>
  );
}

export function MycorrhizalNetwork() {
  const trees: [number, number, number][] = [
    [-1.5, -1, 0.9], [1.2, -0.8, 1], [-0.5, 1.2, 0.85], [1.5, 1, 1.1], [0, -1.5, 1], [-1.8, 0.5, 0.75], [1.8, 0.3, 0.95], [0, 0, 1.2],
  ];

  return (
    <Float speed={1.1} floatIntensity={0.1}>
      <group>
        {/* Soft hill */}
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
          <sphereGeometry args={[2.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={friendlyPalette.forest} emissive={friendlyPalette.emerald} emissiveIntensity={0.06} roughness={0.85} />
        </mesh>
        {trees.map(([x, z, s], i) => (
          <MiniTree key={i} x={x} z={z} scale={s} />
        ))}
        {/* Underground glow network */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[0.5, 2.2, 32]} />
          <meshStandardMaterial color={friendlyPalette.lavender} emissive={friendlyPalette.lavender} emissiveIntensity={0.2} transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[0.3, 0.5, 16]} />
          <meshStandardMaterial color={friendlyPalette.peach} emissive={friendlyPalette.peach} emissiveIntensity={0.4} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}