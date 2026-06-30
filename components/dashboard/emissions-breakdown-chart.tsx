"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";

const SCOPE_COLORS = ["#10b981", "#38bdf8", "#f59e0b"];

export function EmissionsBreakdownChart() {
  const language = useI18nStore((s) => s.language);
  const emissions = useQuantEngineStore((s) => s.snapshot.emissions);
  const history = useQuantEngineStore((s) => s.snapshot.emissionsHistory);

  const currentData = [
    {
      name: language === "en" ? "Scope 1" : "Phạm vi 1",
      value: emissions.scope1,
      fill: SCOPE_COLORS[0],
    },
    {
      name: language === "en" ? "Scope 2" : "Phạm vi 2",
      value: emissions.scope2,
      fill: SCOPE_COLORS[1],
    },
    {
      name: language === "en" ? "Scope 3" : "Phạm vi 3",
      value: emissions.scope3,
      fill: SCOPE_COLORS[2],
    },
  ];

  const trendData = history.slice(-8).map((h) => ({
    period: h.period,
    scope1: h.scope1,
    scope2: h.scope2,
    scope3: h.scope3,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {language === "en" ? "GHG Emissions Model Output" : "Kết quả Mô hình Phát thải GHG"}
          </CardTitle>
          <p className="text-xs text-white/45 font-mono mt-1">
            Σ(activity × EF) — {language === "en" ? "Total" : "Tổng"}: {emissions.total.toLocaleString()} tCO₂e
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[240px]" role="img" aria-label="Current emissions by scope">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={72} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(5,46,22,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      fontSize: 11,
                    }}
                    formatter={(v) => [`${Number(v)} tCO₂e`, ""]}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                    {currentData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[240px]" role="img" aria-label="Emissions trend over ticks">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="period" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} width={36} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(5,46,22,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      fontSize: 11,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="scope1" name="S1" stackId="a" fill={SCOPE_COLORS[0]} />
                  <Bar dataKey="scope2" name="S2" stackId="a" fill={SCOPE_COLORS[1]} />
                  <Bar dataKey="scope3" name="S3" stackId="a" fill={SCOPE_COLORS[2]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}