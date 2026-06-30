import type { FacilityBaseline, SimulationInputs } from "@/lib/quant/types";

export const ENGMA_BASELINE: FacilityBaseline = {
  baseYear: 2023,
  revenueMRmb: 2840,
  scope1Tco2e: 448,
  scope2Tco2e: 1186,
  scope3Tco2e: 3824,
  electricityKwhYear: 4_820_000,
  gridEmissionFactor: 0.000581,
  waterBaselineM3: 18_400,
  renewableTarget2030: 100,
  scope12ReductionTarget: 0.2,
  scope3ReductionTarget: 0.3,
};

export const QUANT_MODELS = [
  {
    id: "ghg-emissions",
    name: "GHG Emissions Model",
    nameVi: "Mô hình Phát thải GHG",
    formula: "Σ(activity × EF) — Scope 1/2/3 per GHG Protocol",
    formulaVi: "Σ(hoạt động × hệ số) — Phạm vi 1/2/3 theo GHG Protocol",
    unit: "tCO₂e",
    color: "#10b981",
  },
  {
    id: "carbon-avoidance",
    name: "Carbon Avoidance Model",
    nameVi: "Mô hình Tránh Carbon",
    formula: "Renewable kWh×EF + Trees×0.022 + Saved kWh×EF + Employee offset",
    formulaVi: "kWh tái tạo×EF + Cây×0,022 + kWh tiết kiệm×EF + Bù nhân viên",
    unit: "tCO₂e",
    color: "#34d399",
  },
  {
    id: "water-footprint",
    name: "Water Footprint Model",
    nameVi: "Mô hình Dấu chân Nước",
    formula: "Saved = Baseline × η + Rainwater(200m³) × 1000 L",
    formulaVi: "Tiết kiệm = Cơ sở × η + Nước mưa(200m³) × 1000 L",
    unit: "L",
    color: "#38bdf8",
  },
  {
    id: "esg-composite",
    name: "ESG Composite Score",
    nameVi: "Điểm Tổng hợp ESG",
    formula: "0.45E + 0.30S + 0.25G (weighted pillar normalization)",
    formulaVi: "0,45M + 0,30X + 0,25Q (chuẩn hóa trọng số trụ cột)",
    unit: "pts",
    color: "#f59e0b",
  },
  {
    id: "holt-forecast",
    name: "Holt Linear Forecast",
    nameVi: "Dự báo Holt Tuyến tính",
    formula: "Lₜ=αYₜ+(1-α)(Lₜ₋₁+Tₜ₋₁); Fₜ₊ₕ=Lₜ+hTₜ",
    formulaVi: "Lₜ=αYₜ+(1-α)(Lₜ₋₁+Tₜ₋₁); Fₜ₊ₕ=Lₜ+hTₜ",
    unit: "idx",
    color: "#a78bfa",
  },
  {
    id: "carbon-intensity",
    name: "Carbon Intensity Model",
    nameVi: "Mô hình Cường độ Carbon",
    formula: "CI = Total tCO₂e / Revenue(M RMB); α = 100 − CI×10",
    formulaVi: "CI = Tổng tCO₂e / Doanh thu(M RMB); α = 100 − CI×10",
    unit: "t/M",
    color: "#fb7185",
  },
] as const;

export function initialSimulationInputs(): SimulationInputs {
  return {
    elapsedHours: 0,
    renewableSharePct: 34.2,
    energyReductionPct: 15,
    waterEfficiencyPct: 20,
    supplierSbtiPct: 47,
    treesPlantedCumulative: 342,
    firefliesActive: 2147,
    educationReach: 847,
    employeeCo2OffsetKg: 18420,
  };
}