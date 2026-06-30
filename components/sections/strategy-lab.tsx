"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Lightbulb, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { InteractionHint } from "@/components/common/interaction-hint";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScenarioManager } from "@/components/strategy/scenario-manager";
import { useStrategyStore } from "@/lib/stores/strategy";
import { useI18nStore } from "@/lib/stores/i18n";
import { buildProjectionData, SLIDER_LABELS } from "@/lib/strategy/calculations";
import { generateStrategyPdf } from "@/lib/pdf/generate-strategy-pdf";

const SLIDER_KEYS = Object.keys(SLIDER_LABELS) as (keyof typeof SLIDER_LABELS)[];

export function StrategyLabSection() {
  const sliders = useStrategyStore((s) => s.sliders);
  const setSlider = useStrategyStore((s) => s.setSlider);
  const projectedScore = useStrategyStore((s) => s.projectedScore2030);
  const netZeroYearFn = useStrategyStore((s) => s.netZeroYear);
  const recommendations = useStrategyStore((s) => s.recommendations);
  const recommendationsVi = useStrategyStore((s) => s.recommendationsVi);
  const savedScenarios = useStrategyStore((s) => s.savedScenarios);
  const loadedScenarioId = useStrategyStore((s) => s.loadedScenarioId);
  const language = useI18nStore((s) => s.language);

  const [exporting, setExporting] = useState(false);

  const score = projectedScore();
  const nzYear = netZeroYearFn();
  const recs = language === "en" ? recommendations() : recommendationsVi();
  const loadedName = savedScenarios.find((s) => s.id === loadedScenarioId)?.name;

  const projectionData = useMemo(
    () =>
      buildProjectionData(sliders).map((d) => ({
        year: d.year.toString(),
        emissions: d.emissions,
        target: d.target,
      })),
    [sliders]
  );

  const handleExport = async () => {
    setExporting(true);
    try {
      await generateStrategyPdf({
        sliders,
        language,
        scenarioName: loadedName,
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <SectionWrapper
      id="strategy"
      sectionNumber="06"
      eyebrow={language === "en" ? "Innovation" : "Đổi mới"}
      title={language === "en" ? "Strategy Lab" : "Phòng Lab Chiến lược"}
      subtitle={
        language === "en"
          ? "Try different scenarios with simple sliders — see how your choices affect the path to Net-Zero 2050."
          : "Thử các kịch bản bằng thanh trượt đơn giản — xem lựa chọn ảnh hưởng thế nào đến mục tiêu Net-Zero 2050."
      }
      className="pattern-circuit"
      align="left"
    >
      <InteractionHint
        className="mb-8"
        en="Drag the sliders below to test different ESG strategies. Save scenarios to compare options, then export a premium PDF report."
        vi="Kéo các thanh trượt bên dưới để thử chiến lược ESG khác nhau. Lưu kịch bản để so sánh, sau đó xuất báo cáo PDF cao cấp."
      />

      <div className="ultra-glass luxury-border rounded-3xl p-6 md:p-8 mb-8">
        <ScenarioManager />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {SLIDER_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <label className="text-sm text-theme-muted">
                  {SLIDER_LABELS[key][language]}
                </label>
                <span className="text-sm text-emerald-400 font-medium tabular-nums">{sliders[key]}%</span>
              </div>
              <Slider
                value={[sliders[key]]}
                onValueChange={([v]) => setSlider(key, v)}
                max={100}
                step={1}
                aria-label={SLIDER_LABELS[key][language]}
              />
            </motion.div>
          ))}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                {language === "en" ? "Recommended Global Scaling Actions" : "Hành động Mở rộng Toàn cầu Đề xuất"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recs.map((rec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2 text-sm text-theme-muted"
                  >
                    <span className="text-emerald-400 shrink-0">→</span>
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button onClick={handleExport} disabled={exporting} className="w-full sm:w-auto">
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {language === "en" ? "Export Beautiful PDF Report" : "Xuất Báo cáo PDF Đẹp"}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center p-6">
              <p className="text-xs text-theme-subtle mb-1">
                {language === "en" ? "Projected Score 2030" : "Điểm Dự kiến 2030"}
              </p>
              <p className="text-4xl font-serif text-emerald-400">{score}</p>
            </Card>
            <Card className="text-center p-6">
              <p className="text-xs text-theme-subtle mb-1">
                {language === "en" ? "Net-Zero Year" : "Năm Net-Zero"}
              </p>
              <p className="text-4xl font-serif text-amber-400">{nzYear}</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {language === "en" ? "Path to Net-Zero 2050" : "Lộ trình Net-Zero 2050"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]" role="img" aria-label="Net-zero projection chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis dataKey="year" stroke="var(--chart-axis)" fontSize={10} tickLine={false} interval={4} />
                    <YAxis stroke="var(--chart-axis)" fontSize={11} tickLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--tooltip-bg)",
                        border: "1px solid var(--glass-border)",
                        borderRadius: 12,
                        fontSize: 12,
                        color: "var(--foreground)",
                      }}
                    />
                    <ReferenceLine
                      y={0}
                      stroke="#f59e0b"
                      strokeDasharray="5 5"
                      label={{ value: "Net-Zero", fill: "#f59e0b", fontSize: 11 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="emissions"
                      name={language === "en" ? "Projected Emissions" : "Phát thải Dự kiến"}
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive
                      animationDuration={600}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name={language === "en" ? "SBTi Pathway" : "Lộ trình SBTi"}
                      stroke="#f59e0b"
                      strokeWidth={1.5}
                      strokeDasharray="5 5"
                      dot={false}
                      isAnimationActive
                      animationDuration={600}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}