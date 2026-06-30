import * as THREE from "three";

export const palette = {
  emerald: "#10b981",
  emeraldDark: "#052e16",
  emeraldDeep: "#021a0f",
  jade: "#34d399",
  amber: "#f59e0b",
  slate: "#1e293b",
  glass: "#a7f3d0",
  earth: "#78716c",
  water: "#0ea5e9",
  soil: "#44403c",
} as const;

export function emeraldGlass(opacity = 0.35) {
  return new THREE.MeshPhysicalMaterial({
    color: palette.emerald,
    metalness: 0.15,
    roughness: 0.25,
    transmission: 0.55,
    thickness: 0.4,
    transparent: true,
    opacity,
  });
}

export function matteEarth(color = palette.earth) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0.02 });
}

export function emissivePulse(color: string, intensity = 0.4) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.4,
    metalness: 0.1,
  });
}