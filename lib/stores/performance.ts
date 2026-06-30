import { create } from "zustand";
import { detectDeviceTier } from "@/lib/performance/device-tier";
import { TIER_SETTINGS, getTierClass, type PerformanceTier, type TierSettings } from "@/lib/performance/tier-config";

interface PerformanceState {
  tier: PerformanceTier;
  settings: TierSettings;
  initialized: boolean;
  init: () => void;
  setTier: (tier: PerformanceTier) => void;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  tier: "high",
  settings: TIER_SETTINGS.high,
  initialized: false,
  init: () => {
    const tier = detectDeviceTier();
    const settings = TIER_SETTINGS[tier];
    document.documentElement.classList.add(getTierClass(tier));
    document.documentElement.dataset.perfTier = tier;
    set({ tier, settings, initialized: true });
  },
  setTier: (tier) => {
    (["ultra", "high", "medium", "low"] as PerformanceTier[]).forEach((t) => {
      document.documentElement.classList.remove(getTierClass(t));
    });
    document.documentElement.classList.add(getTierClass(tier));
    document.documentElement.dataset.perfTier = tier;
    set({ tier, settings: TIER_SETTINGS[tier] });
  },
}));