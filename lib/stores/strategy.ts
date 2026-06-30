import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SavedScenario, StrategySliders } from "@/types";
import {
  buildRecommendations,
  netZeroYear,
  projectedScore2030,
} from "@/lib/strategy/calculations";

const DEFAULT: StrategySliders = {
  renewableInvestment: 50,
  supplierEngagement: 60,
  communityBudget: 45,
  greenTalentIntensity: 55,
  circularOffice: 40,
};

interface StrategyStore {
  sliders: StrategySliders;
  savedScenarios: SavedScenario[];
  loadedScenarioId: string | null;
  setSlider: (key: keyof StrategySliders, value: number) => void;
  loadSliders: (sliders: StrategySliders) => void;
  projectedScore2030: () => number;
  netZeroYear: () => number;
  recommendations: () => string[];
  recommendationsVi: () => string[];
  saveScenario: (name: string) => string;
  loadScenario: (id: string) => void;
  renameScenario: (id: string, name: string) => void;
  deleteScenario: (id: string) => void;
  clearLoadedScenario: () => void;
}

function snapshotMetrics(sliders: StrategySliders) {
  return {
    projectedScore: projectedScore2030(sliders),
    netZeroYear: netZeroYear(sliders),
  };
}

export const useStrategyStore = create<StrategyStore>()(
  persist(
    (set, get) => ({
      sliders: { ...DEFAULT },
      savedScenarios: [],
      loadedScenarioId: null,

      setSlider: (key, value) =>
        set((s) => ({
          sliders: { ...s.sliders, [key]: value },
          loadedScenarioId: null,
        })),

      loadSliders: (sliders) => set({ sliders: { ...sliders }, loadedScenarioId: null }),

      projectedScore2030: () => projectedScore2030(get().sliders),
      netZeroYear: () => netZeroYear(get().sliders),
      recommendations: () => buildRecommendations(get().sliders, "en"),
      recommendationsVi: () => buildRecommendations(get().sliders, "vi"),

      saveScenario: (name) => {
        const trimmed = name.trim();
        if (!trimmed) return "";
        const sliders = get().sliders;
        const metrics = snapshotMetrics(sliders);
        const id = `scenario-${Date.now()}`;
        const scenario: SavedScenario = {
          id,
          name: trimmed,
          createdAt: new Date().toISOString(),
          sliders: { ...sliders },
          ...metrics,
        };
        set((s) => ({
          savedScenarios: [scenario, ...s.savedScenarios],
          loadedScenarioId: id,
        }));
        return id;
      },

      loadScenario: (id) => {
        const scenario = get().savedScenarios.find((s) => s.id === id);
        if (!scenario) return;
        set({
          sliders: { ...scenario.sliders },
          loadedScenarioId: id,
        });
      },

      renameScenario: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((s) => ({
          savedScenarios: s.savedScenarios.map((sc) =>
            sc.id === id ? { ...sc, name: trimmed } : sc
          ),
        }));
      },

      deleteScenario: (id) => {
        set((s) => ({
          savedScenarios: s.savedScenarios.filter((sc) => sc.id !== id),
          loadedScenarioId: s.loadedScenarioId === id ? null : s.loadedScenarioId,
        }));
      },

      clearLoadedScenario: () => set({ loadedScenarioId: null }),
    }),
    {
      name: "symbiosis-nexus-scenarios",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ savedScenarios: state.savedScenarios }),
    }
  )
);