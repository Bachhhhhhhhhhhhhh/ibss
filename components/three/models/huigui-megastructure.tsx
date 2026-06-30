"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

function CuteTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={friendlyPalette.soil} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color={friendlyPalette.forest} emissive={friendlyPalette.jade} emissiveIntensity={0.12} roughness={0.7} />
      </mesh>
    </group>
  );
}

export function HuiguiMegastructure() {
  const group = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={group} scale={0.85}>
        {/* Main tower — soft cream blocks */}
        <RoundedBox args={[2.2, 2.8, 1.6]} radius={0.12} smoothness={4} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial color={friendlyPalette.cream} roughness={0.55} metalness={0.02} />
        </RoundedBox>

        {/* Green terrace steps */}
        {[0, 1, 2].map((i) => (
          <RoundedBox
            key={i}
            args={[2.6 - i * 0.3, 0.1, 2 - i * 0.2]}
            radius={0.04}
            position={[0, 3.1 + i * 0.14, -0.1 - i * 0.05]}
            castShadow
          >
            <meshStandardMaterial
              color={i % 2 ? friendlyPalette.jade : friendlyPalette.forest}
              emissive={friendlyPalette.mint}
              emissiveIntensity={0.1}
              roughness={0.75}
            />
          </RoundedBox>
        ))}

        {/* Rooftop garden dome */}
        <Sphere args={[0.35, 16, 16]} position={[0, 3.65, 0]} castShadow>
          <meshStandardMaterial color={friendlyPalette.mint} emissive={friendlyPalette.jade} emissiveIntensity={0.2} roughness={0.6} />
        </Sphere>

        {/* Warm window lights */}
        {[-0.6, 0, 0.6].flatMap((x) =>
          [0.8, 1.5, 2.2].map((y, i) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.81]}>
              <planeGeometry args={[0.25, 0.3]} />
              <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.5 + (i % 2) * 0.2} />
            </mesh>
          ))
        )}

        {/* Side wings */}
        <RoundedBox args={[0.9, 1.6, 1.2]} radius={0.08} position={[-1.65, 0.9, 0]} castShadow>
          <meshStandardMaterial color="#e7e5e4" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.9, 1.6, 1.2]} radius={0.08} position={[1.65, 0.9, 0]} castShadow>
          <meshStandardMaterial color="#e7e5e4" roughness={0.6} />
        </RoundedBox>

        {/* Wetland pond */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 1.8]}>
          <circleGeometry args={[0.9, 32]} />
          <meshStandardMaterial color={friendlyPalette.water} emissive={friendlyPalette.sky} emissiveIntensity={0.15} roughness={0.2} metalness={0.1} transparent opacity={0.85} />
        </mesh>

        <CuteTree position={[-2.2, 0, 1.2]} />
        <CuteTree position={[2.2, 0, 1.2]} />
        <CuteTree position={[-1.5, 0, -1.5]} />
        <CuteTree position={[1.5, 0, -1.5]} />

        {/* Firefly glow dots */}
        {Array.from({ length: 8 }, (_, i) => (
          <Float key={i} speed={2 + i * 0.3} floatIntensity={0.4}>
            <mesh position={[Math.sin(i * 1.2) * 2, 0.5 + (i % 3) * 0.4, Math.cos(i * 1.2) * 2]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={1.2} />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
}