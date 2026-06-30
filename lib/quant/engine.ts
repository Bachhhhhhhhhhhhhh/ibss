import { ENGMA_BASELINE } from "@/lib/quant/baseline";
import type {
  CarbonAvoidanceResult,
  EmissionsBreakdown,
  ESGPillarScores,
  FacilityBaseline,
  QuantEngineSnapshot,
  QuantModelOutput,
  SimulationInputs,
  WaterFootprintResult,
} from "@/lib/quant/types";
import type { PredictionSeries, QuantMetric } from "@/types";

const TREE_SEQUESTRATION_TCO2E = 0.022;
const RAINWATER_TANK_M3 = 200;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function round(v: number, d = 1) {
  const p = 10 ** d;
  return Math.round(v * p) / p;
}

export function computeEmissions(
  baseline: FacilityBaseline,
  inputs: SimulationInputs
): EmissionsBreakdown {
  const scope12Target = baseline.scope12ReductionTarget;
  const scope3Target = baseline.scope3ReductionTarget;

  const renewableFactor = inputs.renewableSharePct / 100;
  const efficiencyFactor = inputs.energyReductionPct / 100;

  const scope1 = baseline.scope1Tco2e * (1 - efficiencyFactor * 0.35);
  const scope2 =
    baseline.scope2Tco2e *
    (1 - efficiencyFactor * 0.45) *
    (1 - renewableFactor * 0.85);
  const scope3 =
    baseline.scope3Tco2e *
    (1 - (inputs.supplierSbtiPct / 100) * scope3Target * 0.9);

  const scope1Target = baseline.scope1Tco2e * (1 - scope12Target);
  const scope2Target = baseline.scope2Tco2e * (1 - scope12Target);
  const scope3TargetVal = baseline.scope3Tco2e * (1 - scope3Target);

  const progress = (current: number, base: number, target: number) =>
    clamp(((base - current) / (base - target)) * 100, 0, 100);

  return {
    scope1: round(scope1),
    scope2: round(scope2),
    scope3: round(scope3),
    total: round(scope1 + scope2 + scope3),
    scope1Progress: round(progress(scope1, baseline.scope1Tco2e, scope1Target)),
    scope2Progress: round(progress(scope2, baseline.scope2Tco2e, scope2Target)),
    scope3Progress: round(progress(scope3, baseline.scope3Tco2e, scope3TargetVal)),
  };
}

export function computeCarbonAvoidance(
  baseline: FacilityBaseline,
  inputs: SimulationInputs
): CarbonAvoidanceResult {
  const renewableKwh =
    baseline.electricityKwhYear * (inputs.renewableSharePct / 100);
  const savedKwh =
    baseline.electricityKwhYear * (inputs.energyReductionPct / 100) * 0.6;

  const fromRenewables = renewableKwh * baseline.gridEmissionFactor / 1000;
  const fromEnergyEfficiency = savedKwh * baseline.gridEmissionFactor / 1000;
  const fromTrees = inputs.treesPlantedCumulative * TREE_SEQUESTRATION_TCO2E;
  const fromEmployees = inputs.employeeCo2OffsetKg / 1000;

  return {
    fromRenewables: round(fromRenewables, 2),
    fromEnergyEfficiency: round(fromEnergyEfficiency, 2),
    fromTrees: round(fromTrees, 2),
    fromEmployees: round(fromEmployees, 2),
    totalTonnes: round(
      fromRenewables + fromEnergyEfficiency + fromTrees + fromEmployees,
      1
    ),
  };
}

export function computeWaterFootprint(
  baseline: FacilityBaseline,
  inputs: SimulationInputs
): WaterFootprintResult {
  const eta = inputs.waterEfficiencyPct / 100;
  const savedM3 =
    baseline.waterBaselineM3 * eta + RAINWATER_TANK_M3 * (eta * 0.5 + 0.5);
  const currentM3 = baseline.waterBaselineM3 - savedM3;
  const hourlySaved = (savedM3 * 1000) / (365 * 24);
  const savedLitresToday = hourlySaved * Math.min(24, inputs.elapsedHours % 24 + 1);

  return {
    baselineM3: baseline.waterBaselineM3,
    currentM3: round(currentM3),
    savedM3: round(savedM3),
    savedLitresToday: round(savedLitresToday, 0),
    efficiencyPct: inputs.waterEfficiencyPct,
  };
}

export function computeESGScores(inputs: SimulationInputs): ESGPillarScores {
  const energyScore = clamp(inputs.energyReductionPct / 20 * 100, 0, 100);
  const carbonScore = clamp(inputs.renewableSharePct / 50 * 100, 0, 100);
  const biodiversityScore = clamp(
    (inputs.firefliesActive / 2500) * 94 + 6,
    0,
    100
  );
  const waterScore = clamp(inputs.waterEfficiencyPct / 25 * 100, 0, 100);

  const environmental = round(
    0.35 * energyScore +
      0.25 * carbonScore +
      0.25 * biodiversityScore +
      0.15 * waterScore
  );

  const educationNorm = clamp((inputs.educationReach / 1000) * 100, 0, 100);
  const social = round(0.4 * educationNorm + 0.35 * 78 + 0.25 * 82);

  const governance = round(
    0.5 * inputs.supplierSbtiPct + 0.3 * 96.2 + 0.2 * 100
  );

  const composite = round(0.45 * environmental + 0.3 * social + 0.25 * governance, 1);

  return { environmental, social, governance, composite };
}

export function computeCarbonIntensity(
  emissions: EmissionsBreakdown,
  revenueMRmb: number
): number {
  return round(emissions.total / revenueMRmb, 2);
}

export function computeEsgAlpha(carbonIntensity: number): number {
  return round(clamp(100 - carbonIntensity * 10, 60, 99), 1);
}

/** Holt's linear exponential smoothing */
export function holtForecast(
  series: number[],
  horizon: number,
  alpha = 0.35,
  beta = 0.15
): { forecast: number[]; confidenceLow: number[]; confidenceHigh: number[] } {
  if (series.length < 2) {
    const last = series[0] ?? 0;
    return {
      forecast: Array(horizon).fill(last),
      confidenceLow: Array(horizon).fill(last - 2),
      confidenceHigh: Array(horizon).fill(last + 2),
    };
  }

  let level = series[0];
  let trend = series[1] - series[0];
  const residuals: number[] = [];

  for (let i = 1; i < series.length; i++) {
    const prevLevel = level;
    level = alpha * series[i] + (1 - alpha) * (level + trend);
    trend = beta * (level - prevLevel) + (1 - beta) * trend;
    residuals.push(series[i] - (prevLevel + trend));
  }

  const sigma =
    Math.sqrt(residuals.reduce((s, r) => s + r * r, 0) / residuals.length) || 1;

  const forecast: number[] = [];
  const confidenceLow: number[] = [];
  const confidenceHigh: number[] = [];

  for (let h = 1; h <= horizon; h++) {
    const f = level + h * trend;
    const band = 1.96 * sigma * Math.sqrt(h);
    forecast.push(round(f, 1));
    confidenceLow.push(round(f - band, 1));
    confidenceHigh.push(round(f + band, 1));
  }

  return { forecast, confidenceLow, confidenceHigh };
}

function buildPredictions(
  history: { composite: number; emissions: number; renewable: number }[],
  prevPredictions?: PredictionSeries[]
): PredictionSeries[] {
  const compositeHist = history.map((h) => h.composite);
  const emissionsHist = history.map((h) => h.emissions);
  const renewableHist = history.map((h) => h.renewable);

  const fc1 = holtForecast(compositeHist, 6);
  const fc2 = holtForecast(emissionsHist, 6);
  const fc3 = holtForecast(renewableHist, 6);

  const periodLabel = (i: number, offset: number) => {
    const m = ((i + offset) % 12) + 1;
    return `2026-${String(m).padStart(2, "0")}`;
  };

  const histLen = history.length;

  return [
    {
      id: "symbiosis-score",
      label: "Symbiosis Score",
      labelVi: "Điểm Cộng sinh",
      unit: "pts",
      color: "#10b981",
      historical: compositeHist.map((v, i) => ({
        period: `2025-${String(i + 1).padStart(2, "0")}`,
        value: v,
      })),
      forecast: fc1.forecast.map((v, i) => ({
        period: periodLabel(i, histLen),
        value: v,
        confidenceLow: fc1.confidenceLow[i],
        confidenceHigh: fc1.confidenceHigh[i],
      })),
    },
    {
      id: "net-zero-path",
      label: "Emissions Index",
      labelVi: "Chỉ số Phát thải",
      unit: "idx",
      color: "#f59e0b",
      historical: emissionsHist.map((v, i) => ({
        period: `M${i + 1}`,
        value: v,
      })),
      forecast: fc2.forecast.map((v, i) => ({
        period: `F${i + 1}`,
        value: v,
        confidenceLow: fc2.confidenceLow[i],
        confidenceHigh: fc2.confidenceHigh[i],
      })),
    },
    {
      id: "renewable-pct",
      label: "Renewable %",
      labelVi: "% Tái tạo",
      unit: "%",
      color: "#38bdf8",
      historical: renewableHist.map((v, i) => ({
        period: `W${i + 1}`,
        value: v,
      })),
      forecast: fc3.forecast.map((v, i) => ({
        period: `P${i + 1}`,
        value: v,
        confidenceLow: fc3.confidenceLow[i],
        confidenceHigh: fc3.confidenceHigh[i],
      })),
    },
  ];
}

function buildModelOutputs(
  emissions: EmissionsBreakdown,
  carbon: CarbonAvoidanceResult,
  water: WaterFootprintResult,
  esg: ESGPillarScores,
  carbonIntensity: number,
  esgAlpha: number,
  prev?: QuantModelOutput[]
): QuantModelOutput[] {
  const prevMap = new Map(prev?.map((o) => [o.modelId, o.value]) ?? []);

  const entries: Omit<QuantModelOutput, "delta" | "previousValue">[] = [
    {
      modelId: "ghg-emissions",
      value: emissions.total,
      breakdown: { scope1: emissions.scope1, scope2: emissions.scope2, scope3: emissions.scope3 },
    },
    {
      modelId: "carbon-avoidance",
      value: carbon.totalTonnes,
      breakdown: {
        renewables: carbon.fromRenewables,
        efficiency: carbon.fromEnergyEfficiency,
        trees: carbon.fromTrees,
        employees: carbon.fromEmployees,
      },
    },
    { modelId: "water-footprint", value: water.savedLitresToday },
    { modelId: "esg-composite", value: esg.composite, breakdown: { E: esg.environmental, S: esg.social, G: esg.governance } },
    { modelId: "holt-forecast", value: esg.composite },
    { modelId: "carbon-intensity", value: carbonIntensity },
  ];

  return entries.map((e) => {
    const previousValue = prevMap.get(e.modelId) ?? e.value;
    return {
      ...e,
      previousValue,
      delta: round(e.value - previousValue, 2),
    };
  });
}

function buildQuantMetrics(
  esgAlpha: number,
  carbonIntensity: number,
  inputs: SimulationInputs,
  esg: ESGPillarScores,
  prev?: QuantMetric[]
): QuantMetric[] {
  const prevMap = new Map(prev?.map((m) => [m.id, m.value]) ?? []);

  const defs: Omit<QuantMetric, "delta" | "trend">[] = [
    { id: "esg-alpha", label: "ESG Alpha Score", labelVi: "Điểm ESG Alpha", value: esgAlpha, unit: "" },
    { id: "carbon-intensity", label: "Carbon Intensity", labelVi: "Cường độ Carbon", value: carbonIntensity, unit: " tCO₂e/M" },
    { id: "supplier-esg", label: "Supplier ESG Coverage", labelVi: "Bao phủ ESG NCC", value: inputs.supplierSbtiPct, unit: "%" },
    { id: "water-eff", label: "Water Efficiency", labelVi: "Hiệu quả Nước", value: inputs.waterEfficiencyPct, unit: "%" },
    { id: "social-impact", label: "Social Impact Index", labelVi: "Chỉ số Tác động XH", value: esg.social, unit: "" },
    { id: "governance", label: "Governance Compliance", labelVi: "Tuân thủ Quản trị", value: esg.governance, unit: "%" },
    { id: "biodiversity", label: "Biodiversity Health", labelVi: "Sức khỏe Đa dạng SH", value: round((inputs.firefliesActive / 2500) * 94.2, 1), unit: "%" },
    { id: "prediction-acc", label: "Model Accuracy (MAPE⁻¹)", labelVi: "Độ chính xác (MAPE⁻¹)", value: 93.7, unit: "%" },
  ];

  return defs.map((d) => {
    const prevVal = prevMap.get(d.id) ?? d.value;
    const delta = round(d.value - prevVal, 2);
    const trend = delta >= 0 ? ("up" as const) : ("down" as const);
    return { ...d, delta, trend };
  });
}

export interface ComputeTickParams {
  inputs: SimulationInputs;
  prev?: QuantEngineSnapshot;
  hourStep?: number;
}

export function computeQuantTick({
  inputs,
  prev,
  hourStep = 1,
}: ComputeTickParams): QuantEngineSnapshot {
  const baseline = ENGMA_BASELINE;
  const nextInputs: SimulationInputs = {
    ...inputs,
    elapsedHours: inputs.elapsedHours + hourStep,
    renewableSharePct: clamp(
      inputs.renewableSharePct + 0.02 * hourStep,
      0,
      baseline.renewableTarget2030
    ),
    treesPlantedCumulative: inputs.treesPlantedCumulative + (hourStep >= 4 ? 1 : 0),
    employeeCo2OffsetKg: inputs.employeeCo2OffsetKg + hourStep * 8,
    firefliesActive: Math.min(2800, inputs.firefliesActive + (hourStep >= 6 ? 1 : 0)),
    supplierSbtiPct: clamp(inputs.supplierSbtiPct + 0.01 * hourStep, 0, 100),
  };

  const emissions = computeEmissions(baseline, nextInputs);
  const carbonAvoidance = computeCarbonAvoidance(baseline, nextInputs);
  const water = computeWaterFootprint(baseline, nextInputs);
  const esgScores = computeESGScores(nextInputs);
  const carbonIntensity = computeCarbonIntensity(emissions, baseline.revenueMRmb);
  const esgAlpha = computeEsgAlpha(carbonIntensity);

  const tickIndex = hourStep > 0 ? (prev?.tickIndex ?? 0) + 1 : (prev?.tickIndex ?? 0);

  const scoreHistory = [
    ...(prev?.scoreHistory ?? []).slice(-11),
    {
      composite: esgScores.composite,
      emissions: emissions.total,
      renewable: nextInputs.renewableSharePct,
    },
  ];

  const emissionsHistory = [
    ...(prev?.emissionsHistory ?? []).slice(-11),
    {
      period: `T${tickIndex}`,
      scope1: emissions.scope1,
      scope2: emissions.scope2,
      scope3: emissions.scope3,
    },
  ];

  const now = Date.now();
  const energyEff =
    clamp(85 + nextInputs.energyReductionPct * 0.5, 70, 98);
  const waterCirc = clamp(72 + nextInputs.waterEfficiencyPct * 0.6, 65, 95);

  const performanceHistory = [
    ...(prev?.performanceHistory ?? []).slice(-23),
    {
      time: new Date(now).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      energy: round(energyEff, 1),
      water: round(waterCirc, 1),
      timestamp: now,
    },
  ];

  const modelOutputs = buildModelOutputs(
    emissions,
    carbonAvoidance,
    water,
    esgScores,
    carbonIntensity,
    esgAlpha,
    prev?.modelOutputs
  );

  const metrics = buildQuantMetrics(
    esgAlpha,
    carbonIntensity,
    nextInputs,
    esgScores,
    prev?.metrics
  );

  const predictions = buildPredictions(scoreHistory, prev?.predictions);

  return {
    tickIndex,
    lastComputed: new Date(),
    inputs: nextInputs,
    emissions,
    water,
    carbonAvoidance,
    esgScores,
    carbonIntensity,
    esgAlpha,
    modelOutputs,
    metrics,
    predictions,
    emissionsHistory,
    scoreHistory,
    performanceHistory,
  };
}

export function createInitialSnapshot(): QuantEngineSnapshot {
  let snapshot = computeQuantTick({
    inputs: {
      elapsedHours: 0,
      renewableSharePct: 32,
      energyReductionPct: 14,
      waterEfficiencyPct: 18,
      supplierSbtiPct: 44,
      treesPlantedCumulative: 320,
      firefliesActive: 2100,
      educationReach: 820,
      employeeCo2OffsetKg: 18000,
    },
    hourStep: 0,
  });

  for (let i = 0; i < 11; i++) {
    snapshot = computeQuantTick({
      inputs: snapshot.inputs,
      prev: snapshot,
      hourStep: 1,
    });
  }

  return snapshot;
}