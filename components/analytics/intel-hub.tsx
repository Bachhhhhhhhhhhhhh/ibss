"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { vi as viLocale } from "date-fns/locale";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  Activity,
  BarChart3,
  LineChart,
  Newspaper,
  TrendingDown,
  TrendingUp,
  Rss,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { useIntelFeedStore } from "@/lib/stores/intel-feed";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { useI18nStore } from "@/lib/stores/i18n";
import { useSimulationStore } from "@/lib/stores/simulation";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS = {
  environmental: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  social: "text-sky-400 bg-sky-500/10 border-sky-500/25",
  governance: "text-amber-400 bg-amber-500/10 border-amber-500/25",
};

export function IntelHub() {
  const language = useI18nStore((s) => s.language);
  const news = useIntelFeedStore((s) => s.news);
  const quantMetrics = useQuantEngineStore((s) => s.snapshot.metrics);
  const predictions = useQuantEngineStore((s) => s.snapshot.predictions);
  const lastUpdated = useQuantEngineStore((s) => s.snapshot.lastComputed);
  const syncFromQuant = useIntelFeedStore((s) => s.syncFromQuant);
  const addNewsItem = useIntelFeedStore((s) => s.addNewsItem);
  const speed = useSimulationStore((s) => s.speed);
  const getMultiplier = useSimulationStore((s) => s.getMultiplier);

  useEffect(() => {
    if (speed === "pause") return;
    const mult = getMultiplier();
    const syncTimer = setInterval(syncFromQuant, Math.max(3000, 5000 / mult));
    const newsTimer = setInterval(addNewsItem, Math.max(8000, 14000 / mult));
    return () => {
      clearInterval(syncTimer);
      clearInterval(newsTimer);
    };
  }, [speed, syncFromQuant, addNewsItem, getMultiplier]);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="section-eyebrow mb-3">
            {language === "en" ? "Intelligence Layer" : "Tầng Tình báo"}
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-foreground title-luxury">
            {language === "en" ? "Analytics & Live Intel" : "Phân tích & Tin tức Trực tiếp"}
          </h3>
          <p className="text-sm text-theme-muted mt-2 max-w-xl">
            {language === "en"
              ? "Computed outputs from 6 quant models — GHG, carbon, water, ESG, Holt forecast — plus live ESG news."
              : "Kết quả từ 6 mô hình định lượng — GHG, carbon, nước, ESG, dự báo Holt — cùng tin ESG trực tiếp."}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full ultra-glass text-xs text-emerald-400">
          <span className="live-dot scale-75" />
          <span className="font-mono">
            {language === "en" ? "Updated" : "Cập nhật"}{" "}
            {formatDistanceToNow(lastUpdated, { addSuffix: true, locale: language === "vi" ? viLocale : undefined })}
          </span>
        </div>
      </div>

      <Tabs defaultValue="quant" className="space-y-6">
        <TabsList className="w-full sm:w-auto flex-wrap h-auto">
          <TabsTrigger value="quant" className="gap-2">
            <BarChart3 className="h-3.5 w-3.5" />
            {language === "en" ? "Quant Analysis" : "Phân tích Định lượng"}
          </TabsTrigger>
          <TabsTrigger value="predict" className="gap-2">
            <LineChart className="h-3.5 w-3.5" />
            {language === "en" ? "Predictions" : "Dự đoán"}
          </TabsTrigger>
          <TabsTrigger value="news" className="gap-2">
            <Newspaper className="h-3.5 w-3.5" />
            {language === "en" ? "Live News" : "Tin Trực tiếp"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quant">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quantMetrics.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="luxury-stat luxury-border rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <Activity className="h-4 w-4 text-emerald-400/70" />
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      m.trend === "up" ? "text-emerald-400 bg-emerald-500/10" : "text-sky-400 bg-sky-500/10"
                    )}
                  >
                    {m.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {m.delta > 0 ? "+" : ""}
                    {m.delta}
                  </span>
                </div>
                <p className="text-[10px] text-theme-subtle uppercase tracking-wider mb-1">
                  {language === "en" ? m.label : m.labelVi}
                </p>
                <p className="text-2xl font-display text-foreground tabular-nums">
                  <AnimatedCounter value={m.value} decimals={m.unit === "%" || m.unit === "" ? 1 : 0} suffix={m.unit} />
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predict">
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="ultra-glass luxury-border rounded-2xl p-5"
                >
                  <p className="text-sm font-medium text-foreground mb-1">
                    {language === "en" ? series.label : series.labelVi}
                  </p>
                  <p className="text-[10px] text-theme-subtle mb-4 uppercase tracking-wider">
                    {language === "en" ? "Historical + Forecast" : "Lịch sử + Dự báo"}
                  </p>
                  <div className="h-[180px]" role="img" aria-label={`${series.label} forecast chart`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id={`grad-${series.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={series.color} stopOpacity={0.35} />
                            <stop offset="100%" stopColor={series.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                        <XAxis dataKey="period" stroke="var(--chart-axis)" fontSize={9} tickLine={false} interval="preserveStartEnd" />
                        <YAxis stroke="var(--chart-axis)" fontSize={9} tickLine={false} width={32} />
                        <Tooltip
                          contentStyle={{
                            background: "var(--tooltip-bg)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: 10,
                            fontSize: 11,
                          }}
                        />
                        <ReferenceLine x={series.historical.at(-1)?.period} stroke="#f59e0b" strokeDasharray="4 4" />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={series.color}
                          fill={`url(#grad-${series.id})`}
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive
                          animationDuration={800}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="news">
          <div className="ultra-glass luxury-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-emerald-500/5">
              <Rss className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                {language === "en" ? "ESG Intelligence Feed" : "Luồng Tình báo ESG"}
              </span>
              <span className="live-dot ml-auto scale-75" />
            </div>
            <ul className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
              <AnimatePresence initial={false}>
                {news.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                          CATEGORY_COLORS[item.category]
                        )}
                      >
                        {item.category.slice(0, 3).toUpperCase()}
                      </span>
                      <span className="text-[10px] text-theme-subtle">{item.source}</span>
                      <span className="text-[10px] text-theme-subtle ml-auto font-mono">
                        {formatDistanceToNow(item.timestamp, {
                          addSuffix: true,
                          locale: language === "vi" ? viLocale : undefined,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {language === "en" ? item.headline : item.headlineVi}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}