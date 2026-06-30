"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { friendlyPalette } from "@/lib/three/friendly-materials";

export function PredictionWave() {
  const group = useRef<THREE.Group>(null);

  const { histPoints, forecastPoints } = useMemo(() => {
    const hist: THREE.Vector3[] = [];
    const forecast: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * 5 - 2.5;
      const y = 0.5 + Math.sin(i * 0.25) * 0.4 + (i / 40) * 1.2;
      if (i <= 24) hist.push(new THREE.Vector3(x, y, 0));
      else forecast.push(new THREE.Vector3(x, y + 0.3, 0));
    }
    return { histPoints: hist, forecastPoints: forecast };
  }, []);

  const histCurve = useMemo(() => new THREE.CatmullRomCurve3(histPoints), [histPoints]);
  const forecastCurve = useMemo(() => new THREE.CatmullRomCurve3(forecastPoints), [forecastPoints]);

  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.18) * 0.1;
  });

  return (
    <Float speed={1.1} floatIntensity={0.1}>
      <group ref={group}>
        <mesh>
          <tubeGeometry args={[histCurve, 48, 0.08, 8, false]} />
          <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.emerald} emissiveIntensity={0.25} roughness={0.4} />
        </mesh>
        <mesh>
          <tubeGeometry args={[forecastCurve, 32, 0.08, 8, false]} />
          <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.35} roughness={0.35} transparent opacity={0.9} />
        </mesh>
        {/* Confidence band */}
        <mesh position={[0.6, 1.5, -0.2]} rotation={[0, 0, 0.3]}>
          <planeGeometry args={[2.2, 1.2]} />
          <meshStandardMaterial color={friendlyPalette.sun} transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
        {/* Future marker */}
        <mesh position={[2.2, 2.2, 0]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color={friendlyPalette.sun} emissive={friendlyPalette.sun} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-2.2, 0.8, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color={friendlyPalette.jade} emissive={friendlyPalette.mint} emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}