"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { seededRandom } from "@/lib/three/seeded-random";
import { usePerformanceStore } from "@/lib/stores/performance";

function FloatingLeaves({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 32;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 18;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 16;
      col[i * 3] = 0.05;
      col[i * 3 + 1] = 0.5 + seededRandom(i * 3 + 4) * 0.35;
      col[i * 3 + 2] = 0.28;
    }
    return { pos, col };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
  });

  if (count === 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[positions.col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function EnergyField({ rings = 4 }: { rings?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {Array.from({ length: rings }, (_, i) => (
        <mesh key={i} rotation={[Math.PI / 2.2 + i * 0.15, i * 0.4, 0]}>
          <torusGeometry args={[3.5 + i * 1.2, 0.015, 8, 64]} />
          <meshBasicMaterial
            color={i % 2 ? "#10b981" : "#f59e0b"}
            transparent
            opacity={0.18 - i * 0.03}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

function LightRibbons() {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 32; j++) {
        const t = j / 32;
        const angle = t * Math.PI * 2 + i;
        pts.push(
          new THREE.Vector3(
            Math.cos(angle) * (3 + i * 0.5),
            Math.sin(t * Math.PI * 2) * 1.5,
            Math.sin(angle) * (2 + i * 0.3) - 3
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      const mat = new THREE.LineBasicMaterial({
        color: i % 2 ? "#34d399" : "#fbbf24",
        transparent: true,
        opacity: 0.12,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={ref}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

function HeroMegastructureSilhouette() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.35 + Math.sin(state.clock.elapsedTime * 0.07) * 0.06;
      groupRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.14) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -2, -6]} scale={0.6}>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4.2, 4.2, 3.2]} />
        <meshBasicMaterial color="#052e16" transparent opacity={0.3} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 3.9 + i * 0.1, -i * 0.06]} rotation={[0, i * 0.04, 0]}>
          <boxGeometry args={[3.8 - i * 0.35, 0.08, 2.6 - i * 0.22]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.14 + i * 0.02} />
        </mesh>
      ))}
      <mesh position={[-2.8, 1, 0]}>
        <boxGeometry args={[1.4, 2.8, 2.2]} />
        <meshBasicMaterial color="#44403c" transparent opacity={0.22} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) ringsRef.current.rotation.z = state.clock.elapsedTime * 0.045;
  });

  return (
    <group ref={ringsRef} position={[-3.5, 1, -4]}>
      {[3, 3.8, 4.5, 5.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.5 + i * 0.18, 0, i * 0.45]}>
          <torusGeometry args={[r, 0.02, 6, 56]} />
          <meshBasicMaterial color={i % 2 ? "#10b981" : "#f59e0b"} transparent opacity={0.1 + i * 0.02} />
        </mesh>
      ))}
    </group>
  );
}

function DnaHelixMini() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  const spheres = useMemo(() => {
    const s: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      const t = (i / 20) * Math.PI * 3.5;
      s.push([Math.cos(t) * 0.9, i * 0.18 - 1.6, Math.sin(t) * 0.9]);
    }
    return s;
  }, []);

  return (
    <group ref={ref} position={[-4.5, 0, -2.5]} scale={0.85}>
      {spheres.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshBasicMaterial color={i % 3 ? "#34d399" : "#fbbf24"} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function NebulaFog() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.15) * 0.03);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <sphereGeometry args={[12, 16, 16]} />
      <meshBasicMaterial color="#052e16" transparent opacity={0.35} side={THREE.BackSide} />
    </mesh>
  );
}

function CameraDrift() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 0.4;
    camera.position.y = Math.cos(t * 0.06) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ starCount, leafCount, tier }: { starCount: number; leafCount: number; tier: string }) {
  const isUltra = tier === "ultra";

  return (
    <>
      <ambientLight intensity={0.28} />
      <pointLight position={[6, 6, 6]} intensity={0.5} color="#10b981" />
      <pointLight position={[-6, 2, 4]} intensity={0.25} color="#f59e0b" />
      <pointLight position={[0, -3, 5]} intensity={0.12} color="#34d399" />
      {starCount > 0 && (
        <Stars radius={80} depth={40} count={starCount} factor={1.8} saturation={0.2} fade speed={0.3} />
      )}
      <NebulaFog />
      <FloatingLeaves count={leafCount} />
      <EnergyField rings={isUltra ? 6 : 4} />
      {isUltra && <LightRibbons />}
      <HeroMegastructureSilhouette />
      <OrbitalRings />
      <DnaHelixMini />
      <CameraDrift />
    </>
  );
}

interface HeroParticlesProps {
  isVisible?: boolean;
}

export function HeroParticles({ isVisible = true }: HeroParticlesProps) {
  const settings = usePerformanceStore((s) => s.settings);
  const tier = usePerformanceStore((s) => s.tier);

  if (!settings.hero3d) {
    return (
      <div className="absolute inset-0 hero-css-fallback" aria-hidden="true">
        <div className="hero-css-nebula" />
        <div className="hero-css-grid" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, settings.dprMax]}
        gl={{ antialias: settings.antialias, alpha: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "demand"}
      >
        <Suspense fallback={null}>
          <Scene starCount={settings.stars} leafCount={settings.leaves} tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}