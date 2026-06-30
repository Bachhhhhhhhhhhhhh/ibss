"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";

export function QuantForecastPanel() {
  const language = useI18nStore((s) => s.language);
  const predictions = useQuantEngineStore((s) => s.snapshot.predictions);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {predictions.map((series, i) => {
        const chartData = [
          ...series.historical.map((p) => ({ ...p, type: "hist" as const })),
          ...series.forecast.map((p) => ({ ...p, type: "forecast" as const })),
        ];

        return (
          <motion.div
            key={series.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {language === "en" ? series.label : series.labelVi}
                </CardTitle>
                <p className="text-[10px] text-white/40 font-mono">
                  Holt: Lₜ=αYₜ+(1-α)(Lₜ₋₁+Tₜ₋₁)
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]" role="img" aria-label={`${series.label} Holt forecast`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id={`qgrad-${series.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={series.color} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={series.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="period" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} interval="preserveStartEnd" />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} width={32} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(5,46,22,0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 10,
                          fontSize: 11,
                        }}
                      />
                      <ReferenceLine
                        x={series.historical.at(-1)?.period}
                        stroke="#f59e0b"
                        strokeDasharray="4 4"
                        label={{
                          value: language === "en" ? "Forecast →" : "Dự báo →",
                          position: "insideTopRight",
                          fill: "#f59e0b",
                          fontSize: 9,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={series.color}
                        fill={`url(#qgrad-${series.id})`}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive
                        animationDuration={600}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}