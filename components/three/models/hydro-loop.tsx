"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

export function HydroLoop() {
  const drops = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (drops.current) drops.current.rotation.y = s.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={1.2} floatIntensity={0.12}>
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.12, 16, 48]} />
          <meshStandardMaterial color={friendlyPalette.water} emissive={friendlyPalette.sky} emissiveIntensity={0.2} roughness={0.25} metalness={0.1} transparent opacity={0.75} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos(i * 2.1) * 1.2, 0.3 + i * 0.1, Math.sin(i * 2.1) * 1.2]} castShadow>
            <cylinderGeometry args={[0.35, 0.4, 0.6, 16]} />
            <meshStandardMaterial color={friendlyPalette.sky} emissive={friendlyPalette.water} emissiveIntensity={0.15} roughness={0.3} transparent opacity={0.8} />
          </mesh>
        ))}
        <group ref={drops}>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 1.8, 0.1 + Math.sin(i) * 0.1, Math.sin(a) * 1.8]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color={friendlyPalette.sky} emissive={friendlyPalette.water} emissiveIntensity={0.7} />
              </mesh>
            );
          })}
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[0.8, 32]} />
          <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.mint} emissiveIntensity={0.1} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}