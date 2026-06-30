"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { seededRandom } from "@/lib/three/seeded-random";

function FloatingLeaves({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 28;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 16;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 14;
      col[i * 3] = 0.05;
      col[i * 3 + 1] = 0.5 + seededRandom(i * 3 + 4) * 0.3;
      col[i * 3 + 2] = 0.3;
    }
    return { pos, col };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[positions.col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function HeroMegastructureSilhouette() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.35 + Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
      groupRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, -2, -5]} scale={0.55}>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 4, 3]} />
        <meshBasicMaterial color="#052e16" transparent opacity={0.25} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 3.9 + i * 0.1, -i * 0.06]} rotation={[0, i * 0.04, 0]}>
          <boxGeometry args={[3.6 - i * 0.4, 0.08, 2.4 - i * 0.25]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.15 + i * 0.02} />
        </mesh>
      ))}
      <mesh position={[-2.5, 1, 0]}>
        <boxGeometry args={[1.2, 2.5, 2]} />
        <meshBasicMaterial color="#44403c" transparent opacity={0.2} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) ringsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ringsRef} position={[-3, 1, -3]}>
      {[3, 3.8, 4.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.5 + i * 0.2, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.02, 6, 48]} />
          <meshBasicMaterial color={i % 2 ? "#10b981" : "#f59e0b"} transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

function DnaHelixMini() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  const spheres = useMemo(() => {
    const s: [number, number, number][] = [];
    for (let i = 0; i < 16; i++) {
      const t = (i / 16) * Math.PI * 3;
      s.push([Math.cos(t) * 0.8, i * 0.2 - 1.5, Math.sin(t) * 0.8]);
    }
    return s;
  }, []);

  return (
    <group ref={ref} position={[-4, 0, -2]} scale={0.8}>
      {spheres.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 3 ? "#34d399" : "#fbbf24"} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

interface HeroParticlesProps {
  isVisible?: boolean;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={0.45} color="#10b981" />
      <pointLight position={[-5, 2, 3]} intensity={0.2} color="#f59e0b" />
      <Stars radius={60} depth={30} count={600} factor={1.6} saturation={0.18} fade speed={0.25} />
      <FloatingLeaves />
      <HeroMegastructureSilhouette />
      <OrbitalRings />
      <DnaHelixMini />
    </>
  );
}

export function HeroParticles({ isVisible = true }: HeroParticlesProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "demand"}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}