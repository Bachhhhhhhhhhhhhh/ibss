import { ENGMA_BASELINE } from "@/lib/quant/baseline";
import type { FacilityBaseline, SimulationInputs } from "@/lib/quant/types";
import type { ChartDataPoint } from "@/types";

const HOUR_MS = 3_600_000;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function round(v: number, d = 1) {
  const p = 10 ** d;
  return Math.round(v * p) / p;
}

/** Diurnal office load curve — peaks 09:00–17:00 */
function diurnalFactor(hourOfDay: number): number {
  const h = hourOfDay % 24;
  if (h >= 9 && h <= 17) return 1 + 0.08 * Math.sin(((h - 9) / 8) * Math.PI);
  if (h >= 6 && h < 9) return 0.82 + (h - 6) * 0.06;
  if (h > 17 && h <= 21) return 0.88 - (h - 17) * 0.04;
  return 0.72;
}

export interface EnergyWaterBreakdown {
  vrvSavingsPct: number;
  ledOptimizationPct: number;
  solarContributionPct: number;
  gridDemandPct: number;
  rainwaterHarvestPct: number;
  greywaterRecyclePct: number;
  behavioralSavingPct: number;
  energyEfficiency: number;
  waterCircularity: number;
  symbiosisEWIndex: number;
  kwhSavedHour: number;
  litresRecoveredHour: number;
}

export interface EnergyWaterSnapshot {
  breakdown: EnergyWaterBreakdown;
  history: ChartDataPoint[];
  forecast: ChartDataPoint[];
  targets: {
    energyEfficiency2030: number;
    waterCircularity2030: number;
    renewable2030: number;
  };
}

function computeBreakdown(
  baseline: FacilityBaseline,
  inputs: SimulationInputs,
  hourOfDay: number
): EnergyWaterBreakdown {
  const diurnal = diurnalFactor(hourOfDay);
  const etaE = inputs.energyReductionPct / 100;
  const etaW = inputs.waterEfficiencyPct / 100;
  const renewable = inputs.renewableSharePct / 100;

  const vrvSavingsPct = round(clamp(etaE * 42 * diurnal, 0, 18), 1);
  const ledOptimizationPct = round(clamp(etaE * 28 * diurnal + 2, 0, 12), 1);
  const solarContributionPct = round(clamp(renewable * 22 + etaE * 4, 0, 28), 1);
  const gridDemandPct = round(
    clamp(100 - vrvSavingsPct - ledOptimizationPct - solarContributionPct * 0.6, 35, 95),
    1
  );

  const rainwaterHarvestPct = round(clamp(etaW * 18 + 6, 4, 28), 1);
  const greywaterRecyclePct = round(clamp(etaW * 14 + 4, 3, 22), 1);
  const behavioralSavingPct = round(clamp(etaW * 12 * diurnal, 2, 16), 1);

  const energyEfficiency = round(
    clamp(78 + vrvSavingsPct + ledOptimizationPct + solarContributionPct * 0.85, 70, 98),
    1
  );
  const waterCircularity = round(
    clamp(68 + rainwaterHarvestPct + greywaterRecyclePct + behavioralSavingPct, 65, 96),
    1
  );

  const symbiosisEWIndex = round(0.55 * energyEfficiency + 0.45 * waterCircularity, 1);

  const kwhSavedHour = round(
    (baseline.electricityKwhYear / 8760) *
      (vrvSavingsPct + ledOptimizationPct) /
      100 *
      diurnal,
    0
  );
  const litresRecoveredHour = round(
    ((baseline.waterBaselineM3 * 1000) / 8760) *
      (rainwaterHarvestPct + greywaterRecyclePct) /
      100,
    0
  );

  return {
    vrvSavingsPct,
    ledOptimizationPct,
    solarContributionPct,
    gridDemandPct,
    rainwaterHarvestPct,
    greywaterRecyclePct,
    behavioralSavingPct,
    energyEfficiency,
    waterCircularity,
    symbiosisEWIndex,
    kwhSavedHour,
    litresRecoveredHour,
  };
}

function toChartPoint(
  timestamp: number,
  breakdown: EnergyWaterBreakdown,
  inputs: SimulationInputs,
  extras?: Partial<ChartDataPoint>
): ChartDataPoint {
  return {
    time: new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    timestamp,
    energy: breakdown.energyEfficiency,
    water: breakdown.waterCircularity,
    energyEfficiency: breakdown.energyEfficiency,
    waterCircularity: breakdown.waterCircularity,
    vrvSavings: breakdown.vrvSavingsPct,
    ledOptimization: breakdown.ledOptimizationPct,
    solarContribution: breakdown.solarContributionPct,
    gridDemand: breakdown.gridDemandPct,
    renewableShare: round(inputs.renewableSharePct, 1),
    rainwaterHarvest: breakdown.rainwaterHarvestPct,
    greywaterRecycle: breakdown.greywaterRecyclePct,
    behavioralSaving: breakdown.behavioralSavingPct,
    symbiosisEWIndex: breakdown.symbiosisEWIndex,
    kwhSavedHour: breakdown.kwhSavedHour,
    litresRecoveredHour: breakdown.litresRecoveredHour,
    ...extras,
  };
}

export function buildEnergyWaterHistory(
  inputs: SimulationInputs,
  prevHistory?: ChartDataPoint[],
  tickIndex = 0
): ChartDataPoint[] {
  const baseline = ENGMA_BASELINE;
  const now = Date.now();
  const history = prevHistory ?? [];

  if (history.length === 0) {
    return Array.from({ length: 24 }, (_, i) => {
      const ts = now - (23 - i) * HOUR_MS;
      const hour = new Date(ts).getHours();
      const drift = Math.sin(i * 0.35) * 1.2;
      const simInputs: SimulationInputs = {
        ...inputs,
        renewableSharePct: clamp(inputs.renewableSharePct - 1.5 + i * 0.08, 0, 100),
        energyReductionPct: clamp(inputs.energyReductionPct + drift * 0.3, 0, 30),
        waterEfficiencyPct: clamp(inputs.waterEfficiencyPct + drift * 0.2, 0, 35),
      };
      const bd = computeBreakdown(baseline, simInputs, hour);
      return toChartPoint(ts, bd, simInputs);
    });
  }

  const hour = new Date(now).getHours();
  const bd = computeBreakdown(baseline, inputs, hour);
  const point = toChartPoint(now, bd, inputs);
  return [...history.slice(-23), point];
}

export function buildEnergyWaterForecast(
  inputs: SimulationInputs,
  lastPoint: ChartDataPoint
): ChartDataPoint[] {
  const baseline = ENGMA_BASELINE;
  const horizon = 6;
  const slopeE = (inputs.energyReductionPct - 12) * 0.04;
  const slopeW = (inputs.waterEfficiencyPct - 15) * 0.03;

  return Array.from({ length: horizon }, (_, i) => {
    const h = i + 1;
    const ts = Date.now() + h * HOUR_MS;
    const hour = new Date(ts).getHours();
    const projected: SimulationInputs = {
      ...inputs,
      renewableSharePct: clamp(inputs.renewableSharePct + h * 0.15, 0, 100),
      energyReductionPct: clamp(inputs.energyReductionPct + h * 0.05, 0, 30),
      waterEfficiencyPct: clamp(inputs.waterEfficiencyPct + h * 0.04, 0, 35),
    };
    const bd = computeBreakdown(baseline, projected, hour);
    const energyF = round((lastPoint.energyEfficiency ?? lastPoint.energy) + slopeE * h + h * 0.12, 1);
    const waterF = round((lastPoint.waterCircularity ?? lastPoint.water) + slopeW * h + h * 0.08, 1);

    return toChartPoint(ts, bd, projected, {
      time: `+${h}h`,
      energyForecast: energyF,
      waterForecast: waterF,
      energyForecastLow: round(energyF - 1.8 - h * 0.2, 1),
      energyForecastHigh: round(energyF + 1.5 + h * 0.15, 1),
      waterForecastLow: round(waterF - 2 - h * 0.25, 1),
      waterForecastHigh: round(waterF + 1.6 + h * 0.2, 1),
    });
  });
}

export function computeEnergyWaterSnapshot(
  inputs: SimulationInputs,
  prevHistory?: ChartDataPoint[]
): EnergyWaterSnapshot {
  const history = buildEnergyWaterHistory(inputs, prevHistory);
  const last = history[history.length - 1];
  const hour = new Date().getHours();
  const breakdown = computeBreakdown(ENGMA_BASELINE, inputs, hour);
  const forecast = buildEnergyWaterForecast(inputs, last);

  return {
    breakdown,
    history,
    forecast,
    targets: {
      energyEfficiency2030: 95,
      waterCircularity2030: 92,
      renewable2030: baselineRenewableTarget(),
    },
  };
}

function baselineRenewableTarget() {
  return ENGMA_BASELINE.renewableTarget2030;
}