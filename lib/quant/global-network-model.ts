import { symbiosisCorridors } from "@/lib/data/symbiosis-corridors";
import { mapLocations } from "@/lib/data/map-locations";
import { haversineKm } from "@/lib/map/geo-utils";
import type { MapLocation, Pillar } from "@/types";

export interface GlobalNetworkStats {
  totalLocations: number;
  eastNodes: number;
  westNodes: number;
  bridgeNodes: number;
  activeCorridors: number;
  totalReachKm: number;
  avgImpactScore: number;
  bridgeIndex: number;
  pillarDistribution: Record<Exclude<Pillar, "all">, number>;
  totalBeneficiaries: number;
  totalCarbonLinked: number;
}

export interface CorridorMetric {
  id: string;
  label: string;
  labelVi: string;
  strength: number;
  distanceKm: number;
  type: string;
}

function round(v: number, d = 1) {
  return Math.round(v * 10 ** d) / 10 ** d;
}

export function computeGlobalNetworkStats(
  locations: MapLocation[] = mapLocations
): GlobalNetworkStats {
  const eastNodes = locations.filter((l) => l.region === "east").length;
  const westNodes = locations.filter((l) => l.region === "west").length;
  const bridgeNodes = locations.filter((l) => l.region === "bridge").length;

  const pillarDistribution: Record<Exclude<Pillar, "all">, number> = {
    environmental: 0,
    social: 0,
    governance: 0,
  };
  locations.forEach((l) => {
    pillarDistribution[l.pillar]++;
    l.pillars?.forEach((p) => {
      if (p !== l.pillar) pillarDistribution[p]++;
    });
  });

  const avgImpactScore = round(
    locations.reduce((s, l) => s + l.impactScore, 0) / locations.length,
    1
  );

  const corridorStrengths = symbiosisCorridors.map((c) => c.strength);
  const bridgeIndex = round(
    (corridorStrengths.reduce((a, b) => a + b, 0) / corridorStrengths.length) *
      100 *
      (1 + bridgeNodes * 0.05),
    1
  );

  let totalReachKm = 0;
  symbiosisCorridors.forEach((c) => {
    const from = locations.find((l) => l.id === c.fromId);
    const to = locations.find((l) => l.id === c.toId);
    if (from && to) {
      totalReachKm += haversineKm(from.lat, from.lng, to.lat, to.lng);
    } else {
      totalReachKm += c.distanceKm;
    }
  });

  const totalBeneficiaries = locations.reduce(
    (s, l) => s + (l.reach?.beneficiaries ?? 0),
    0
  );
  const totalCarbonLinked = locations.reduce(
    (s, l) => s + (l.reach?.carbonTco2e ?? 0),
    0
  );

  return {
    totalLocations: locations.length,
    eastNodes,
    westNodes,
    bridgeNodes,
    activeCorridors: symbiosisCorridors.length,
    totalReachKm: Math.round(totalReachKm),
    avgImpactScore,
    bridgeIndex,
    pillarDistribution,
    totalBeneficiaries,
    totalCarbonLinked,
  };
}

export function getCorridorMetrics(): CorridorMetric[] {
  return symbiosisCorridors.map((c) => ({
    id: c.id,
    label: c.label,
    labelVi: c.labelVi,
    strength: round(c.strength * 100, 0),
    distanceKm: c.distanceKm,
    type: c.type,
  }));
}

export function getHubLocation(locations: MapLocation[] = mapLocations) {
  return locations.find((l) => l.tier === "hub") ?? locations[0];
}