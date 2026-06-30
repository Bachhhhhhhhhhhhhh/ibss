"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

export function EsgGlobe() {
  const globe = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  const pins = Array.from({ length: 24 }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / 24);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.05;
    return {
      pos: [r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)] as [number, number, number],
      color: i % 3 === 0 ? friendlyPalette.sun : i % 3 === 1 ? friendlyPalette.jade : friendlyPalette.sky,
    };
  });

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (globe.current) globe.current.rotation.y = t * 0.18;
    if (ring.current) ring.current.rotation.z = t * 0.25;
  });

  return (
    <Float speed={1.2} floatIntensity={0.12}>
      <group>
        <group ref={globe}>
          <Sphere args={[2, 48, 48]} castShadow>
            <meshStandardMaterial
              color={friendlyPalette.forest}
              emissive={friendlyPalette.emerald}
              emissiveIntensity={0.08}
              roughness={0.55}
              metalness={0.05}
            />
          </Sphere>
          {/* Soft atmosphere */}
          <Sphere args={[2.15, 32, 32]}>
            <meshStandardMaterial color={friendlyPalette.sky} transparent opacity={0.12} roughness={0.1} />
          </Sphere>
          {pins.map((p, i) => (
            <Float key={i} speed={1.5 + i * 0.05} floatIntensity={0.08}>
              <mesh position={p.pos}>
                <sphereGeometry args={[0.07, 10, 10]} />
                <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.6} />
              </mesh>
            </Float>
          ))}
        </group>
        <mesh ref={ring} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.8, 0.03, 8, 64]} />
          <meshStandardMaterial color={friendlyPalette.mint} emissive={friendlyPalette.jade} emissiveIntensity={0.4} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0.5, 0]}>
          <torusGeometry args={[3.2, 0.02, 8, 64]} />
          <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.25} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}