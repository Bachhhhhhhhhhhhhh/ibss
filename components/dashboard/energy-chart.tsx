"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useI18nStore } from "@/lib/stores/i18n";

export function EnergyChart() {
  const chartData = useLiveMetricsStore((s) => s.chartData);
  const language = useI18nStore((s) => s.language);

  const data = useMemo(() => chartData, [chartData]);

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {language === "en" ? "Energy & Water Performance" : "Hiệu suất Năng lượng & Nước"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full" role="img" aria-label="Energy and water performance chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{ background: "rgba(5,46,22,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                />
                <Legend />
                <Area type="monotone" dataKey="energy" name={language === "en" ? "Energy Efficiency %" : "Hiệu suất Năng lượng %"} stroke="#10b981" fill="url(#energyGrad)" strokeWidth={2} isAnimationActive animationDuration={800} />
                <Area type="monotone" dataKey="water" name={language === "en" ? "Water Circularity %" : "Tuần hoàn Nước %"} stroke="#3b82f6" fill="url(#waterGrad)" strokeWidth={2} isAnimationActive animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}