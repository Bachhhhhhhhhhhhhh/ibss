import { create } from "zustand";
import type { SimulationSpeed } from "@/types";

interface SimulationStore {
  speed: SimulationSpeed;
  setSpeed: (speed: SimulationSpeed) => void;
  cycleSpeed: () => void;
  getMultiplier: () => number;
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  speed: "1x",
  setSpeed: (speed) => set({ speed }),
  cycleSpeed: () => {
    const order: SimulationSpeed[] = ["1x", "5x", "pause"];
    const idx = order.indexOf(get().speed);
    set({ speed: order[(idx + 1) % order.length] });
  },
  getMultiplier: () => {
    const s = get().speed;
    if (s === "5x") return 5;
    if (s === "pause") return 0;
    return 1;
  },
}));