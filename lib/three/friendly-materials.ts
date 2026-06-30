import * as THREE from "three";

/** Soft, approachable palette — warm & trustworthy */
export const friendlyPalette = {
  cream: "#faf8f5",
  mint: "#6ee7b7",
  jade: "#34d399",
  emerald: "#10b981",
  forest: "#059669",
  sky: "#7dd3fc",
  water: "#38bdf8",
  sun: "#fcd34d",
  peach: "#fda4af",
  lavender: "#c4b5fd",
  earth: "#a8a29e",
  soil: "#78716c",
  night: "#0c1f17",
  platform: "#0f2a1c",
} as const;

export function softMat(color: string, opts?: { emissive?: string; emissiveIntensity?: number; roughness?: number }) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: opts?.emissive ?? color,
    emissiveIntensity: opts?.emissiveIntensity ?? 0.08,
    roughness: opts?.roughness ?? 0.65,
    metalness: 0.05,
  });
}

export function glowMat(color: string, intensity = 0.35) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.35,
    metalness: 0.1,
    transparent: true,
    opacity: 0.92,
  });
}

export function glassMat(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0,
    roughness: 0.15,
    transmission: 0.72,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85,
  });
}