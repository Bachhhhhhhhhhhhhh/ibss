import { create } from "zustand";
import { initialSimulationInputs } from "@/lib/quant/baseline";
import { computeQuantTick, createInitialSnapshot } from "@/lib/quant/engine";
import type { QuantEngineSnapshot } from "@/lib/quant/types";
import type { LiveMetrics } from "@/types";

function roundDelta(v: number) {
  return Math.round(v * 100) / 100;
}

function snapshotToLiveMetrics(s: QuantEngineSnapshot, symbiosisDelta = 0): LiveMetrics {
  return {
    symbiosisScore: s.esgScores.composite,
    symbiosisDelta,
    co2AvoidedTonnes: s.carbonAvoidance.totalTonnes,
    treesPlantedMonth: s.inputs.treesPlantedCumulative,
    waterSavedTodayLitres: s.water.savedLitresToday,
    renewablePercent: s.inputs.renewableSharePct,
    supplierSbtiAdoption: s.inputs.supplierSbtiPct,
    firefliesActive: s.inputs.firefliesActive,
    energyReductionPercent: s.inputs.energyReductionPct,
    scope1Progress: s.emissions.scope1Progress,
    scope2Progress: s.emissions.scope2Progress,
    scope3Progress: s.emissions.scope3Progress,
    employeeCo2OffsetKg: s.inputs.employeeCo2OffsetKg,
  };
}

interface QuantEngineStore {
  snapshot: QuantEngineSnapshot;
  tick: (hourStep?: number) => LiveMetrics;
  reset: () => void;
}

export const useQuantEngineStore = create<QuantEngineStore>((set, get) => ({
  snapshot: createInitialSnapshot(),

  tick: (hourStep = 1) => {
    const prev = get().snapshot;
    const next = computeQuantTick({
      inputs: prev.inputs,
      prev,
      hourStep,
    });
    const symbiosisDelta = roundDelta(next.esgScores.composite - prev.esgScores.composite);
    set({ snapshot: next });
    return snapshotToLiveMetrics(next, symbiosisDelta);
  },

  reset: () => {
    set({
      snapshot: computeQuantTick({
        inputs: initialSimulationInputs(),
        hourStep: 0,
      }),
    });
  },
}));

export function getQuantLiveMetrics(): LiveMetrics {
  return snapshotToLiveMetrics(useQuantEngineStore.getState().snapshot);
}