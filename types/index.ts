export type Pillar = "environmental" | "social" | "governance" | "all";

export type SimulationSpeed = "1x" | "5x" | "pause";

export type Language = "en" | "vi";

export interface LiveMetrics {
  symbiosisScore: number;
  symbiosisDelta: number;
  co2AvoidedTonnes: number;
  treesPlantedMonth: number;
  waterSavedTodayLitres: number;
  renewablePercent: number;
  supplierSbtiAdoption: number;
  firefliesActive: number;
  energyReductionPercent: number;
  scope1Progress: number;
  scope2Progress: number;
  scope3Progress: number;
  employeeCo2OffsetKg: number;
}

export interface ChartDataPoint {
  time: string;
  energy: number;
  water: number;
  timestamp: number;
  energyEfficiency?: number;
  waterCircularity?: number;
  vrvSavings?: number;
  ledOptimization?: number;
  solarContribution?: number;
  gridDemand?: number;
  renewableShare?: number;
  rainwaterHarvest?: number;
  greywaterRecycle?: number;
  behavioralSaving?: number;
  symbiosisEWIndex?: number;
  kwhSavedHour?: number;
  litresRecoveredHour?: number;
  energyForecast?: number;
  waterForecast?: number;
  energyForecastLow?: number;
  energyForecastHigh?: number;
  waterForecastLow?: number;
  waterForecastHigh?: number;
}

export interface LiveEvent {
  id: string;
  timestamp: Date;
  message: string;
  messageVi: string;
  pillar: Pillar;
  type: "info" | "success" | "milestone";
}

export interface Initiative {
  id: string;
  title: string;
  titleVi: string;
  pillar: Exclude<Pillar, "all">;
  year: number;
  impactType: string;
  impactTypeVi: string;
  shortDescription: string;
  shortDescriptionVi: string;
  keyMetric: string;
  keyMetricVi: string;
  fullDescription: string;
  fullDescriptionVi: string;
  icon: string;
}

export interface HuiguiHotspot {
  id: string;
  name: string;
  nameVi: string;
  position: [number, number, number];
  description: string;
  descriptionVi: string;
  metric: string;
  metricVi: string;
  icon: string;
}

export type MapRegion = "east" | "west" | "bridge" | "global";
export type MapTier = "hub" | "regional" | "field" | "partnership";

export interface MapLocation {
  id: string;
  name: string;
  nameVi: string;
  lat: number;
  lng: number;
  pillar: Exclude<Pillar, "all">;
  pillars?: Exclude<Pillar, "all">[];
  region: MapRegion;
  tier: MapTier;
  year: number;
  initiativeIds: string[];
  connections: string[];
  description: string;
  descriptionVi: string;
  impactScore: number;
  metrics: { label: string; labelVi: string; value: string }[];
  reach?: {
    beneficiaries?: number;
    investmentRmb?: number;
    carbonTco2e?: number;
  };
}

export interface StrategySliders {
  renewableInvestment: number;
  supplierEngagement: number;
  communityBudget: number;
  greenTalentIntensity: number;
  circularOffice: number;
}

export interface SavedScenario {
  id: string;
  name: string;
  createdAt: string;
  sliders: StrategySliders;
  projectedScore: number;
  netZeroYear: number;
}

export interface IntelNewsItem {
  id: string;
  headline: string;
  headlineVi: string;
  source: string;
  category: "environmental" | "social" | "governance";
  sentiment: "positive" | "neutral" | "negative";
  timestamp: Date;
}

export interface QuantMetric {
  id: string;
  label: string;
  labelVi: string;
  value: number;
  delta: number;
  unit: string;
  trend: "up" | "down";
}

export interface PredictionPoint {
  period: string;
  value: number;
  confidenceLow?: number;
  confidenceHigh?: number;
}

export interface PredictionSeries {
  id: string;
  label: string;
  labelVi: string;
  unit: string;
  color: string;
  historical: PredictionPoint[];
  forecast: PredictionPoint[];
}

export interface ScoringCriterion {
  name: string;
  nameVi: string;
  points: number;
  description: string;
  descriptionVi: string;
}