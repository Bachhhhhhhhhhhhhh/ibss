"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Droplets, Zap, Activity, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";

const TOOLTIP_STYLE = {
  background: "rgba(5,46,22,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 11,
};

function MiniStat({
  label,
  value,
  suffix = "",
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="luxury-stat rounded-xl px-3 py-2.5 min-w-0">
      <p className="text-[9px] text-white/40 uppercase tracking-wider truncate mb-1">{label}</p>
      <p className="text-sm font-display tabular-nums" style={{ color }}>
        <AnimatedCounter value={value} decimals={suffix === "%" ? 1 : 0} suffix={suffix} />
      </p>
    </div>
  );
}

export function EnergyChart() {
  const chartData = useLiveMetricsStore((s) => s.chartData);
  const energyWater = useQuantEngineStore((s) => s.snapshot.energyWater);
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const history = useMemo(() => chartData, [chartData]);
  const forecast = useMemo(() => energyWater?.forecast ?? [], [energyWater?.forecast]);
  const combined = useMemo(
    () => [
      ...history.map((p) => ({ ...p, segment: "hist" as const })),
      ...forecast.map((p) => ({ ...p, segment: "forecast" as const })),
    ],
    [history, forecast]
  );

  const bd = energyWater?.breakdown;
  const targets = energyWater?.targets;

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                {vi ? "Mô hình Hiệu suất Năng lượng & Nước" : "Energy & Water Performance Model"}
              </CardTitle>
              <p className="text-[10px] text-white/40 font-mono mt-1.5 max-w-xl">
                {vi
                  ? "E-W Index = 0,55×ηₙ + 0,45×ηᵥ | VRV + LED + Solar | Mưa + tái chế + hành vi"
                  : "E-W Index = 0.55×ηₑ + 0.45×ηw | VRV + LED + Solar | Rain + recycle + behavioral"}
              </p>
            </div>
            {bd && (
              <div className="text-right">
                <p className="text-[9px] text-emerald-400/70 uppercase tracking-widest">
                  {vi ? "Chỉ số Cộng sinh E-W" : "Symbiosis E-W Index"}
                </p>
                <p className="text-2xl font-display text-emerald-400 tabular-nums">
                  <AnimatedCounter value={bd.symbiosisEWIndex} decimals={1} />
                </p>
              </div>
            )}
          </div>

          {bd && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
              <MiniStat label={vi ? "VRV tiết kiệm" : "VRV Savings"} value={bd.vrvSavingsPct} suffix="%" color="#10b981" />
              <MiniStat label={vi ? "LED tối ưu" : "LED Optimize"} value={bd.ledOptimizationPct} suffix="%" color="#34d399" />
              <MiniStat label={vi ? "Solar mái" : "Solar Canopy"} value={bd.solarContributionPct} suffix="%" color="#f59e0b" />
              <MiniStat label={vi ? "Nước mưa" : "Rainwater"} value={bd.rainwaterHarvestPct} suffix="%" color="#38bdf8" />
              <MiniStat label={vi ? "Tái chế xám" : "Greywater"} value={bd.greywaterRecyclePct} suffix="%" color="#60a5fa" />
              <MiniStat label={vi ? "kWh/giờ" : "kWh/hr saved"} value={bd.kwhSavedHour} color="#a7f3d0" />
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="w-full sm:w-auto flex-wrap h-auto gap-1">
              <TabsTrigger value="overview" className="text-xs gap-1.5">
                <Zap className="h-3 w-3" />
                {vi ? "Tổng quan" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="energy" className="text-xs gap-1.5">
                <Sun className="h-3 w-3" />
                {vi ? "Stack Năng lượng" : "Energy Stack"}
              </TabsTrigger>
              <TabsTrigger value="water" className="text-xs gap-1.5">
                <Droplets className="h-3 w-3" />
                {vi ? "Vòng Nước" : "Water Loop"}
              </TabsTrigger>
              <TabsTrigger value="forecast" className="text-xs gap-1.5">
                <Wind className="h-3 w-3" />
                {vi ? "Dự báo 6h" : "6h Forecast"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="h-[320px]" role="img" aria-label="Energy water overview">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={combined} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ewEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ewWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} interval="preserveStartEnd" />
                    <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} domain={[65, 100]} />
                    <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.25)" fontSize={10} tickLine={false} domain={[0, 40]} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    {targets && (
                      <>
                        <ReferenceLine yAxisId="left" y={targets.energyEfficiency2030} stroke="#10b981" strokeDasharray="4 4" label={{ value: "2030 E", fill: "#10b981", fontSize: 9 }} />
                        <ReferenceLine yAxisId="left" y={targets.waterCircularity2030} stroke="#3b82f6" strokeDasharray="4 4" label={{ value: "2030 W", fill: "#3b82f6", fontSize: 9 }} />
                      </>
                    )}
                    <Area yAxisId="left" type="monotone" dataKey="energyEfficiency" name={vi ? "Hiệu suất NL %" : "Energy Eff %"} stroke="#10b981" fill="url(#ewEnergy)" strokeWidth={2} dot={false} connectNulls />
                    <Area yAxisId="left" type="monotone" dataKey="waterCircularity" name={vi ? "Tuần hoàn Nước %" : "Water Circ %"} stroke="#3b82f6" fill="url(#ewWater)" strokeWidth={2} dot={false} connectNulls />
                    <Line yAxisId="right" type="monotone" dataKey="renewableShare" name={vi ? "% Tái tạo" : "Renewable %"} stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 3" connectNulls />
                    <Line yAxisId="left" type="monotone" dataKey="symbiosisEWIndex" name="E-W Index" stroke="#a78bfa" strokeWidth={2.5} dot={false} connectNulls />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="energy">
              <div className="h-[320px]" role="img" aria-label="Energy stack breakdown">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} domain={[0, 35]} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="vrvSavings" name="VRV" stackId="e" fill="#10b981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="ledOptimization" name="LED" stackId="e" fill="#34d399" />
                    <Bar dataKey="solarContribution" name={vi ? "Solar" : "Solar"} stackId="e" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="gridDemand" name={vi ? "Nhu cầu lưới" : "Grid Demand"} stroke="#ef4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="energyEfficiency" name={vi ? "Tổng η" : "Total η"} stroke="#fff" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="water">
              <div className="h-[320px]" role="img" aria-label="Water loop breakdown">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                    <YAxis yAxisId="pct" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} domain={[0, 30]} />
                    <YAxis yAxisId="vol" orientation="right" stroke="rgba(255,255,255,0.25)" fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar yAxisId="pct" dataKey="rainwaterHarvest" name={vi ? "Mưa 200m³" : "Rain 200m³"} stackId="w" fill="#38bdf8" />
                    <Bar yAxisId="pct" dataKey="greywaterRecycle" name={vi ? "Tái chế" : "Recycle"} stackId="w" fill="#60a5fa" />
                    <Bar yAxisId="pct" dataKey="behavioralSaving" name={vi ? "Hành vi" : "Behavior"} stackId="w" fill="#818cf8" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="pct" type="monotone" dataKey="waterCircularity" name={vi ? "Tuần hoàn %" : "Circularity %"} stroke="#e0f2fe" strokeWidth={2} dot={false} />
                    <Line yAxisId="vol" type="monotone" dataKey="litresRecoveredHour" name={vi ? "L/giờ" : "L/hr"} stroke="#22d3ee" strokeWidth={1.5} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="forecast">
              <div className="h-[320px]" role="img" aria-label="6 hour forecast">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecast} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fcBand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} domain={[70, 100]} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Area type="monotone" dataKey="energyForecastHigh" stroke="none" fill="url(#fcBand)" name={vi ? "Khoảng tin cậy E" : "E confidence"} />
                    <Area type="monotone" dataKey="energyForecastLow" stroke="none" fill="#021a0f" name="" />
                    <Line type="monotone" dataKey="energyForecast" name={vi ? "Dự báo NL" : "Energy Fcast"} stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="waterForecast" name={vi ? "Dự báo Nước" : "Water Fcast"} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}