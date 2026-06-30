"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

export function CarbonLattice() {
  const group = useRef<THREE.Group>(null);

  const atoms: [number, number, number][] = [
    [0, 0, 0],
    [0.9, 0.5, 0],
    [-0.9, 0.5, 0],
    [0, -0.9, 0.5],
    [0.5, 0, 0.9],
    [-0.5, 0, -0.9],
  ];

  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.3} floatIntensity={0.15}>
      <group ref={group}>
        <Sphere args={[0.35, 24, 24]} castShadow>
          <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.mint} emissiveIntensity={0.25} roughness={0.4} />
        </Sphere>
        {atoms.slice(1).map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.35} roughness={0.45} />
          </mesh>
        ))}
        <mesh>
          <torusGeometry args={[1.4, 0.02, 8, 48]} />
          <meshStandardMaterial color={friendlyPalette.sky} emissive={friendlyPalette.water} emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}