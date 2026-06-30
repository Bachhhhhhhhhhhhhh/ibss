export type PerformanceTier = "ultra" | "high" | "medium" | "low";

export interface TierSettings {
  stars: number;
  leaves: number;
  particles: number;
  auroraOrbs: number;
  dprMax: number;
  antialias: boolean;
  hero3d: boolean;
  cinematicOverlay: boolean;
  lenis: boolean;
  customCursor: boolean;
  sectionParallax: boolean;
}

export const TIER_SETTINGS: Record<PerformanceTier, TierSettings> = {
  ultra: {
    stars: 1400,
    leaves: 120,
    particles: 42,
    auroraOrbs: 5,
    dprMax: 2,
    antialias: true,
    hero3d: true,
    cinematicOverlay: true,
    lenis: true,
    customCursor: true,
    sectionParallax: true,
  },
  high: {
    stars: 900,
    leaves: 80,
    particles: 28,
    auroraOrbs: 4,
    dprMax: 1.5,
    antialias: true,
    hero3d: true,
    cinematicOverlay: true,
    lenis: true,
    customCursor: true,
    sectionParallax: true,
  },
  medium: {
    stars: 500,
    leaves: 50,
    particles: 18,
    auroraOrbs: 3,
    dprMax: 1.25,
    antialias: false,
    hero3d: true,
    cinematicOverlay: false,
    lenis: true,
    customCursor: false,
    sectionParallax: true,
  },
  low: {
    stars: 0,
    leaves: 0,
    particles: 8,
    auroraOrbs: 2,
    dprMax: 1,
    antialias: false,
    hero3d: false,
    cinematicOverlay: false,
    lenis: false,
    customCursor: false,
    sectionParallax: false,
  },
};

export function getTierClass(tier: PerformanceTier): string {
  return `perf-tier-${tier}`;
}