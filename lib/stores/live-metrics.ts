import { create } from "zustand";
import type { ChartDataPoint, LiveEvent, LiveMetrics } from "@/types";
import { getQuantLiveMetrics, useQuantEngineStore } from "@/lib/stores/quant-engine";
import { randomIntBetween } from "@/lib/utils";

const EVENT_TEMPLATES = [
  { msg: (n: number) => `${n.toLocaleString()} fireflies now active around Huigui • biodiversity model updated`, msgVi: (n: number) => `${n.toLocaleString()} đom đóm hoạt động quanh Huigui • mô hình đa dạng SH cập nhật`, pillar: "environmental" as const, type: "info" as const },
  { msg: () => `GHG model: Scope 3 reduction accelerating via supplier SBTi onboarding`, msgVi: () => `Mô hình GHG: Giảm Phạm vi 3 tăng tốc qua SBTi nhà cung cấp`, pillar: "governance" as const, type: "success" as const },
  { msg: (n: number) => `Water footprint model: ${n.toLocaleString()} L saved today (η=20%)`, msgVi: (n: number) => `Mô hình nước: tiết kiệm ${n.toLocaleString()} L hôm nay (η=20%)`, pillar: "environmental" as const, type: "info" as const },
  { msg: () => `Carbon avoidance model recalculated — employee offset included`, msgVi: () => `Mô hình tránh carbon tính lại — đã gồm bù phát thải nhân viên`, pillar: "environmental" as const, type: "success" as const },
  { msg: () => `Holt forecast: Symbiosis score trajectory updated with 95% CI`, msgVi: () => `Dự báo Holt: quỹ đạo điểm Cộng sinh cập nhật khoảng tin cậy 95%`, pillar: "governance" as const, type: "milestone" as const },
  { msg: () => `ESG composite: 0.45E + 0.30S + 0.25G recomputed from live inputs`, msgVi: () => `ESG tổng hợp: 0,45M + 0,30X + 0,25Q tính lại từ dữ liệu trực tiếp`, pillar: "governance" as const, type: "info" as const },
  { msg: () => `Carbon intensity CI = tCO₂e/Revenue(M) — ESG Alpha refreshed`, msgVi: () => `Cường độ carbon CI = tCO₂e/Doanh thu(M) — ESG Alpha làm mới`, pillar: "environmental" as const, type: "milestone" as const },
  { msg: () => `Qiandongnan education reach feeds Social pillar (40% weight)`, msgVi: () => `Tiếp cận giáo dục Qiandongnan vào trụ Xã hội (trọng số 40%)`, pillar: "social" as const, type: "info" as const },
];

interface LiveMetricsStore {
  metrics: LiveMetrics;
  displayMetrics: LiveMetrics;
  chartData: ChartDataPoint[];
  events: LiveEvent[];
  setDisplayMetrics: (metrics: Partial<LiveMetrics>) => void;
  tickMetrics: () => void;
  addEvent: () => void;
  updateChart: () => void;
  syncFromQuantEngine: () => void;
}

function getInitialState() {
  const metrics = getQuantLiveMetrics();
  const chartData = useQuantEngineStore.getState().snapshot.performanceHistory;
  return { metrics, displayMetrics: { ...metrics }, chartData };
}

export const useLiveMetricsStore = create<LiveMetricsStore>((set, get) => {
  const initial = getInitialState();

  return {
    metrics: initial.metrics,
    displayMetrics: initial.displayMetrics,
    chartData: initial.chartData.length > 0 ? initial.chartData : [],
    events: [
      {
        id: "init-1",
        timestamp: new Date(),
        message: "Quant engine initialized • 6 computation models active",
        messageVi: "Công cụ định lượng khởi tạo • 6 mô hình tính toán hoạt động",
        pillar: "all",
        type: "milestone",
      },
    ],

    setDisplayMetrics: (partial) =>
      set((s) => ({ displayMetrics: { ...s.displayMetrics, ...partial } })),

    syncFromQuantEngine: () => {
      const snap = useQuantEngineStore.getState().snapshot;
      set({
        metrics: getQuantLiveMetrics(),
        chartData: snap.performanceHistory,
      });
    },

    tickMetrics: () => {
      const updated = useQuantEngineStore.getState().tick(1);
      const chartData = useQuantEngineStore.getState().snapshot.performanceHistory;
      set({ metrics: updated, chartData });
    },

    addEvent: () => {
      const template = EVENT_TEMPLATES[randomIntBetween(0, EVENT_TEMPLATES.length - 1)];
      const m = get().metrics;
      const event: LiveEvent = {
        id: `evt-${Date.now()}-${randomIntBetween(1000, 9999)}`,
        timestamp: new Date(),
        message: template.msg(m.firefliesActive),
        messageVi: template.msgVi(m.firefliesActive),
        pillar: template.pillar,
        type: template.type,
      };
      set((s) => ({ events: [event, ...s.events].slice(0, 50) }));
    },

    updateChart: () => {
      const chartData = useQuantEngineStore.getState().snapshot.performanceHistory;
      set({ chartData });
    },
  };
});