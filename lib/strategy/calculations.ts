import type { StrategySliders } from "@/types";

export function projectedScore2030(sliders: StrategySliders): number {
  const base = 72;
  const score =
    base +
    sliders.renewableInvestment * 0.12 +
    sliders.supplierEngagement * 0.1 +
    sliders.communityBudget * 0.06 +
    sliders.greenTalentIntensity * 0.08 +
    sliders.circularOffice * 0.07;
  return Math.min(99, Math.round(score * 10) / 10);
}

export function netZeroYear(sliders: StrategySliders): number {
  const avg = (sliders.renewableInvestment + sliders.supplierEngagement + sliders.circularOffice) / 3;
  if (avg >= 80) return 2045;
  if (avg >= 60) return 2048;
  if (avg >= 40) return 2050;
  return 2053;
}

export function buildRecommendations(sliders: StrategySliders, language: "en" | "vi"): string[] {
  const recs: string[] = [];
  if (language === "en") {
    if (sliders.renewableInvestment >= 60)
      recs.push("Roll out Huigui Symbiosis Hub model to 12 new APAC offices by 2028");
    if (sliders.supplierEngagement >= 55)
      recs.push("Launch SBTi supplier onboarding accelerator — target 75% adoption by 2029");
    if (sliders.communityBudget >= 50)
      recs.push("Expand Qiandongnan tech education to 5 additional provinces");
    if (sliders.greenTalentIntensity >= 50)
      recs.push("Embed ESG competency framework into all HR client deliverables via SHRM partnership");
    if (sliders.circularOffice >= 45)
      recs.push("Deploy AI-powered symbiosis monitoring platform across all Engma facilities");
    if (recs.length === 0)
      recs.push("Increase baseline investments across all pillars to unlock symbiotic scaling potential");
  } else {
    if (sliders.renewableInvestment >= 60)
      recs.push("Triển khai mô hình Huigui Symbiosis Hub tại 12 văn phòng APAC mới đến 2028");
    if (sliders.supplierEngagement >= 55)
      recs.push("Khởi động chương trình tăng tốc SBTi nhà cung cấp — mục tiêu 75% đến 2029");
    if (sliders.communityBudget >= 50)
      recs.push("Mở rộng giáo dục công nghệ Qiandongnan sang 5 tỉnh thêm");
    if (sliders.greenTalentIntensity >= 50)
      recs.push("Tích hợp khung năng lực ESG vào tất cả dịch vụ HR qua đối tác SHRM");
    if (sliders.circularOffice >= 45)
      recs.push("Triển khai nền tảng giám sát cộng sinh AI tại tất cả cơ sở Engma");
    if (recs.length === 0)
      recs.push("Tăng đầu tư cơ sở trên tất cả trụ cột để mở khóa tiềm năng mở rộng cộng sinh");
  }
  return recs;
}

export function buildProjectionData(sliders: StrategySliders) {
  const baseEmissions = 100;
  const nzYear = netZeroYear(sliders);
  const reductionRate = (sliders.renewableInvestment + sliders.supplierEngagement + sliders.circularOffice) / 300;
  return Array.from({ length: 26 }, (_, i) => {
    const year = 2025 + i;
    const emissions = Math.max(0, baseEmissions * Math.pow(1 - reductionRate, i));
    return {
      year,
      emissions: Math.round(emissions * 10) / 10,
      target: year <= 2050 ? Math.max(0, 100 - (year - 2025) * (100 / (nzYear - 2025))) : 0,
    };
  });
}

export const SLIDER_LABELS = {
  renewableInvestment: { en: "Renewable Energy Investment %", vi: "Đầu tư Năng lượng Tái tạo %" },
  supplierEngagement: { en: "Supplier Engagement Rate", vi: "Tỷ lệ Tương tác Nhà cung cấp" },
  communityBudget: { en: "Community Program Budget", vi: "Ngân sách Chương trình Cộng đồng" },
  greenTalentIntensity: { en: "Green Talent Development Intensity", vi: "Cường độ Phát triển Nhân tài Xanh" },
  circularOffice: { en: "Circular Office Practices", vi: "Thực hành Văn phòng Tuần hoàn" },
} as const;