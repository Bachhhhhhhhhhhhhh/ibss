"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeftRight,
  Globe2,
  GitBranch,
  Layers,
  Network,
  Users,
  Leaf,
} from "lucide-react";
import { computeGlobalNetworkStats, getCorridorMetrics } from "@/lib/quant/global-network-model";
import { symbiosisCorridors } from "@/lib/data/symbiosis-corridors";
import { mapLocations } from "@/lib/data/map-locations";
import { useI18nStore } from "@/lib/stores/i18n";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { cn, formatNumber } from "@/lib/utils";

const TOOLTIP_STYLE = {
  background: "rgba(5,46,22,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 11,
};

const pillarColors = {
  environmental: "#10b981",
  social: "#3b82f6",
  governance: "#a855f7",
};

const corridorTypeColors: Record<string, string> = {
  humanitarian: "#fb7185",
  "hr-esg": "#60a5fa",
  ecological: "#34d399",
  education: "#fbbf24",
  governance: "#c084fc",
};

function StatTile({
  label,
  value,
  suffix = "",
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}) {
  return (
    <div className="luxury-stat rounded-xl p-3 min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 shrink-0" style={{ color }} />
        <p className="text-[9px] text-white/40 uppercase tracking-wider truncate">{label}</p>
      </div>
      <p className="text-lg font-display tabular-nums" style={{ color }}>
        <AnimatedCounter value={value} decimals={Number.isInteger(value) ? 0 : 1} suffix={suffix} />
      </p>
    </div>
  );
}

interface GlobalNetworkPanelProps {
  highlightedCorridorId?: string | null;
  onCorridorSelect?: (id: string) => void;
  className?: string;
}

export function GlobalNetworkPanel({
  highlightedCorridorId,
  onCorridorSelect,
  className,
}: GlobalNetworkPanelProps) {
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const stats = useMemo(() => computeGlobalNetworkStats(), []);
  const corridors = useMemo(() => getCorridorMetrics(), []);

  const pillarData = useMemo(
    () =>
      (["environmental", "social", "governance"] as const).map((p) => ({
        pillar: vi
          ? p === "environmental"
            ? "Môi trường"
            : p === "social"
              ? "Xã hội"
              : "Quản trị"
          : p.charAt(0).toUpperCase() + p.slice(1),
        count: stats.pillarDistribution[p],
        fill: pillarColors[p],
      })),
    [stats.pillarDistribution, vi]
  );

  const regionRadar = useMemo(
    () => [
      { axis: vi ? "Đông" : "East", value: stats.eastNodes, fullMark: 5 },
      { axis: vi ? "Tây" : "West", value: stats.westNodes, fullMark: 5 },
      { axis: vi ? "Cầu nối" : "Bridge", value: stats.bridgeNodes, fullMark: 5 },
      { axis: vi ? "Hành lang" : "Corridors", value: stats.activeCorridors, fullMark: 8 },
      { axis: vi ? "Tác động" : "Impact", value: stats.avgImpactScore / 20, fullMark: 5 },
    ],
    [stats, vi]
  );

  const bridgeGaugeRotation = useMemo(
    () => Math.min(180, (stats.bridgeIndex / 120) * 180),
    [stats.bridgeIndex]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("space-y-4", className)}
    >
      <div className="glass-panel p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Network className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-white">
            {vi ? "Chỉ số Cầu nối Đông-Tây" : "East-West Bridge Index"}
          </h3>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-28 h-14 shrink-0">
            <div className="absolute inset-0 rounded-t-full border-[6px] border-white/10 border-b-0" />
            <div
              className="absolute bottom-0 left-1/2 w-1 h-12 origin-bottom bg-gradient-to-t from-emerald-500 to-amber-400 rounded-full transition-transform duration-700"
              style={{ transform: `translateX(-50%) rotate(${bridgeGaugeRotation - 90}deg)` }}
            />
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-serif text-amber-400 tabular-nums">
              <AnimatedCounter value={stats.bridgeIndex} decimals={1} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
            <StatTile
              label={vi ? "Điểm nút" : "Nodes"}
              value={stats.totalLocations}
              icon={Globe2}
              color="#34d399"
            />
            <StatTile
              label={vi ? "Hành lang" : "Corridors"}
              value={stats.activeCorridors}
              icon={GitBranch}
              color="#60a5fa"
            />
            <StatTile
              label={vi ? "Tầm với (km)" : "Reach (km)"}
              value={stats.totalReachKm}
              icon={ArrowLeftRight}
              color="#fbbf24"
            />
            <StatTile
              label={vi ? "TB Tác động" : "Avg Impact"}
              value={stats.avgImpactScore}
              icon={Layers}
              color="#c084fc"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          label={vi ? "Người hưởng lợi" : "Beneficiaries"}
          value={stats.totalBeneficiaries}
          icon={Users}
          color="#3b82f6"
        />
        <StatTile
          label={vi ? "Carbon liên kết (t)" : "Carbon linked (t)"}
          value={stats.totalCarbonLinked}
          icon={Leaf}
          color="#10b981"
        />
      </div>

      <div className="glass-panel p-4 rounded-2xl">
        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">
          {vi ? "Phân bố Trụ cột ESG" : "ESG Pillar Distribution"}
        </p>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pillarData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
              <XAxis type="number" hide domain={[0, "dataMax + 1"]} />
              <YAxis type="category" dataKey="pillar" width={72} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
                {pillarData.map((entry) => (
                  <Cell key={entry.pillar} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl">
        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">
          {vi ? "Radar Mạng lưới" : "Network Radar"}
        </p>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={regionRadar} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 9 }} />
              <Radar
                name="Network"
                dataKey="value"
                stroke="#34d399"
                fill="#34d399"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl">
        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">
          {vi ? "Hành lang Cộng sinh" : "Symbiosis Corridors"}
        </p>
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {corridors.map((c) => {
            const corridor = symbiosisCorridors.find((sc) => sc.id === c.id);
            const from = mapLocations.find((l) => l.id === corridor?.fromId);
            const to = mapLocations.find((l) => l.id === corridor?.toId);
            const active = highlightedCorridorId === c.id;

            return (
              <button
                key={c.id}
                onClick={() => onCorridorSelect?.(c.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all",
                  active
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-white/5 border-white/5 hover:border-white/15"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-xs text-white/85 truncate">{vi ? c.labelVi : c.label}</p>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: `${corridorTypeColors[c.type] ?? "#34d399"}25`,
                      color: corridorTypeColors[c.type],
                    }}
                  >
                    {c.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.strength}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ background: corridorTypeColors[c.type] }}
                    />
                  </div>
                  <span className="text-[10px] text-white/50 tabular-nums w-8">{c.strength}%</span>
                </div>
                <p className="text-[9px] text-white/35 mt-1.5 truncate">
                  {from && to
                    ? `${vi ? from.nameVi : from.name} → ${vi ? to.nameVi : to.name}`
                    : `${formatNumber(c.distanceKm)} km`}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function CorridorDetailPanel({ corridorId }: { corridorId: string }) {
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const corridor = symbiosisCorridors.find((c) => c.id === corridorId);
  if (!corridor) return null;

  const from = mapLocations.find((l) => l.id === corridor.fromId);
  const to = mapLocations.find((l) => l.id === corridor.toId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 rounded-2xl"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
            {vi ? "Hành lang" : "Corridor"}
          </p>
          <h4 className="text-base font-medium text-white">{vi ? corridor.labelVi : corridor.label}</h4>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full shrink-0"
          style={{
            background: `${corridorTypeColors[corridor.type]}20`,
            color: corridorTypeColors[corridor.type],
          }}
        >
          {corridor.type}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="luxury-stat rounded-xl p-3 text-center">
          <p className="text-lg font-semibold text-emerald-400 tabular-nums">
            {Math.round(corridor.strength * 100)}%
          </p>
          <p className="text-[9px] text-white/40 uppercase">{vi ? "Độ mạnh" : "Strength"}</p>
        </div>
        <div className="luxury-stat rounded-xl p-3 text-center">
          <p className="text-lg font-semibold text-amber-400 tabular-nums">
            {formatNumber(corridor.distanceKm)}
          </p>
          <p className="text-[9px] text-white/40 uppercase">km</p>
        </div>
        <div className="luxury-stat rounded-xl p-3 text-center">
          <p className="text-lg font-semibold text-blue-400">2</p>
          <p className="text-[9px] text-white/40 uppercase">{vi ? "Nút" : "Nodes"}</p>
        </div>
      </div>

      {from && to && (
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="truncate flex-1 p-2 rounded-lg bg-white/5">{vi ? from.nameVi : from.name}</span>
          <ArrowLeftRight className="h-3.5 w-3.5 shrink-0 text-white/30" />
          <span className="truncate flex-1 p-2 rounded-lg bg-white/5">{vi ? to.nameVi : to.name}</span>
        </div>
      )}
    </motion.div>
  );
}