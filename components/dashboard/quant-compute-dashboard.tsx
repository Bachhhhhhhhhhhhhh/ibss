"use client";

import { Cpu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantModelRegistry } from "@/components/dashboard/quant-model-registry";
import { EmissionsBreakdownChart } from "@/components/dashboard/emissions-breakdown-chart";
import { QuantForecastPanel } from "@/components/dashboard/quant-forecast-panel";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";
import { AnimatedCounter } from "@/components/common/animated-counter";

export function QuantComputeDashboard() {
  const language = useI18nStore((s) => s.language);
  const snapshot = useQuantEngineStore((s) => s.snapshot);

  const exportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      tickIndex: snapshot.tickIndex,
      models: snapshot.modelOutputs,
      emissions: snapshot.emissions,
      carbonAvoidance: snapshot.carbonAvoidance,
      water: snapshot.water,
      esgScores: snapshot.esgScores,
      predictions: snapshot.predictions,
      metrics: snapshot.metrics,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `symbiosis-quant-export-${snapshot.tickIndex}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow mb-2 flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" />
            {language === "en" ? "Quantitative Engine" : "Công cụ Định lượng"}
          </p>
          <p className="text-sm text-white/50 max-w-2xl">
            {language === "en"
              ? "Six computation models run each simulation tick — GHG, carbon avoidance, water, ESG composite, Holt forecast, and carbon intensity. Results feed the dashboard below."
              : "Sáu mô hình tính toán chạy mỗi tick mô phỏng — GHG, tránh carbon, nước, ESG tổng hợp, dự báo Holt và cường độ carbon. Kết quả đổ vào dashboard bên dưới."}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="luxury-stat rounded-xl px-4 py-2 text-center">
            <p className="text-[10px] text-white/40 uppercase">{language === "en" ? "Ticks" : "Lần tính"}</p>
            <p className="text-lg font-display tabular-nums text-emerald-400">
              <AnimatedCounter value={snapshot.tickIndex} decimals={0} />
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={exportJson} className="gap-2">
            <Download className="h-3.5 w-3.5" />
            {language === "en" ? "Export JSON" : "Xuất JSON"}
          </Button>
        </div>
      </div>

      <QuantModelRegistry />

      <EmissionsBreakdownChart />

      <div>
        <p className="text-xs text-amber-400/80 uppercase tracking-widest font-semibold mb-4">
          {language === "en" ? "Holt Forecast Outputs" : "Kết quả Dự báo Holt"}
        </p>
        <QuantForecastPanel />
      </div>
    </div>
  );
}