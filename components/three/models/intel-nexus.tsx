"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

function NewsCard({ angle, radius }: { angle: number; radius: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime * 0.35 + angle;
      ref.current.position.set(Math.cos(t) * radius, 0.3 + Math.sin(t * 2) * 0.1, Math.sin(t) * radius);
      ref.current.lookAt(0, 0.3, 0);
    }
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.04} smoothness={2}>
        <meshStandardMaterial color={friendlyPalette.cream} emissive={friendlyPalette.mint} emissiveIntensity={0.08} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.emerald} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0.03]}>
        <planeGeometry args={[0.4, 0.04]} />
        <meshStandardMaterial color={friendlyPalette.sky} emissive={friendlyPalette.water} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function IntelNexus() {
  const core = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (core.current) {
      core.current.rotation.y = s.clock.elapsedTime * 0.4;
      const scale = 1 + Math.sin(s.clock.elapsedTime * 1.5) * 0.05;
      core.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.1}>
      <group>
        <Sphere ref={core} args={[0.55, 32, 32]} castShadow>
          <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.emerald} emissiveIntensity={0.3} roughness={0.35} />
        </Sphere>
        <mesh>
          <torusGeometry args={[0.85, 0.03, 8, 48]} />
          <meshStandardMaterial color={friendlyPalette.sky} emissive={friendlyPalette.water} emissiveIntensity={0.35} transparent opacity={0.7} />
        </mesh>
        {Array.from({ length: 6 }, (_, i) => (
          <NewsCard key={i} angle={(i / 6) * Math.PI * 2} radius={1.6} />
        ))}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={`p-${i}`} position={[Math.cos(a) * 1.2, 0.1, Math.sin(a) * 1.2]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.9} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}