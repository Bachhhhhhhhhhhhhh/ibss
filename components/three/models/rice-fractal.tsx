"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { friendlyPalette } from "@/lib/three/friendly-materials";

export function RiceFractal() {
  return (
    <Float speed={1.1} floatIntensity={0.1}>
      <group>
        {Array.from({ length: 8 }, (_, i) => {
          const w = 2.4 - i * 0.28;
          const y = i * 0.14;
          return (
            <RoundedBox key={i} args={[w, 0.1, 1.8 - i * 0.15]} radius={0.03} position={[0, y, -i * 0.06]} castShadow>
              <meshStandardMaterial
                color={i % 2 ? friendlyPalette.jade : friendlyPalette.forest}
                emissive={friendlyPalette.mint}
                emissiveIntensity={0.08}
                roughness={0.75}
              />
            </RoundedBox>
          );
        })}
        {/* Central pagoda */}
        <group position={[0, 1.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.28, 0.5, 8]} />
            <meshStandardMaterial color={friendlyPalette.cream} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.45, 0]} castShadow>
            <coneGeometry args={[0.35, 0.3, 4]} />
            <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.2} roughness={0.5} />
          </mesh>
        </group>
        {/* Water shimmer */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color={friendlyPalette.water} emissive={friendlyPalette.sky} emissiveIntensity={0.12} transparent opacity={0.6} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}