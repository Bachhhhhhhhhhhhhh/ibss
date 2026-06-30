import type { PredictionSeries, QuantMetric } from "@/types";

export interface FacilityBaseline {
  baseYear: number;
  revenueMRmb: number;
  scope1Tco2e: number;
  scope2Tco2e: number;
  scope3Tco2e: number;
  electricityKwhYear: number;
  gridEmissionFactor: number;
  waterBaselineM3: number;
  renewableTarget2030: number;
  scope12ReductionTarget: number;
  scope3ReductionTarget: number;
}

export interface SimulationInputs {
  /** Hours elapsed in simulation */
  elapsedHours: number;
  renewableSharePct: number;
  energyReductionPct: number;
  waterEfficiencyPct: number;
  supplierSbtiPct: number;
  treesPlantedCumulative: number;
  firefliesActive: number;
  educationReach: number;
  employeeCo2OffsetKg: number;
}

export interface EmissionsBreakdown {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
  scope1Progress: number;
  scope2Progress: number;
  scope3Progress: number;
}

export interface WaterFootprintResult {
  baselineM3: number;
  currentM3: number;
  savedM3: number;
  savedLitresToday: number;
  efficiencyPct: number;
}

export interface CarbonAvoidanceResult {
  fromRenewables: number;
  fromEnergyEfficiency: number;
  fromTrees: number;
  fromEmployees: number;
  totalTonnes: number;
}

export interface ESGPillarScores {
  environmental: number;
  social: number;
  governance: number;
  composite: number;
}

export interface QuantModelDefinition {
  id: string;
  name: string;
  nameVi: string;
  formula: string;
  formulaVi: string;
  unit: string;
  color: string;
}

export interface QuantModelOutput {
  modelId: string;
  value: number;
  previousValue: number;
  delta: number;
  breakdown?: Record<string, number>;
}

export interface QuantEngineSnapshot {
  tickIndex: number;
  lastComputed: Date;
  inputs: SimulationInputs;
  emissions: EmissionsBreakdown;
  water: WaterFootprintResult;
  carbonAvoidance: CarbonAvoidanceResult;
  esgScores: ESGPillarScores;
  carbonIntensity: number;
  esgAlpha: number;
  modelOutputs: QuantModelOutput[];
  metrics: QuantMetric[];
  predictions: PredictionSeries[];
  emissionsHistory: { period: string; scope1: number; scope2: number; scope3: number }[];
  scoreHistory: { composite: number; emissions: number; renewable: number }[];
  performanceHistory: { time: string; energy: number; water: number; timestamp: number }[];
}