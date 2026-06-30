import { create } from "zustand";
import type { IntelNewsItem } from "@/types";
import { useQuantEngineStore } from "@/lib/stores/quant-engine";
import { randomIntBetween } from "@/lib/utils";

const NEWS_POOL: Omit<IntelNewsItem, "id" | "timestamp">[] = [
  { headline: "Huigui Building reports 15% YoY energy reduction in Q2 2025", headlineVi: "Tòa Huigui báo cáo giảm 15% năng lượng so với cùng kỳ Q2/2025", source: "Engma ESG", category: "environmental", sentiment: "positive" },
  { headline: "SBTi validates Engma near-term targets — Scope 3 at 30% reduction", headlineVi: "SBTi xác thực mục tiêu ngắn hạn Engma — Phạm vi 3 giảm 30%", source: "SBTi Registry", category: "governance", sentiment: "positive" },
  { headline: "Supplier #47 commits to science-based targets via onboarding accelerator", headlineVi: "Nhà cung cấp #47 cam kết mục tiêu khoa học qua chương trình tăng tốc", source: "Supply Chain", category: "governance", sentiment: "positive" },
  { headline: "2,147 fireflies active — wetland restoration index at 94.2%", headlineVi: "2.147 đom đóm hoạt động — chỉ số phục hồi đầm lầy 94,2%", source: "Biodiversity Lab", category: "environmental", sentiment: "positive" },
  { headline: "Qiandongnan tech education reaches 847 students this quarter", headlineVi: "Giáo dục công nghệ Qiandongnan tiếp cận 847 học sinh quý này", source: "Social Impact", category: "social", sentiment: "positive" },
  { headline: "Renewable electricity share climbs to 34.2% — on track for 2030 target", headlineVi: "Tỷ lệ điện tái tạo lên 34,2% — đúng lộ trình 2030", source: "Energy Ops", category: "environmental", sentiment: "positive" },
  { headline: "SHRM partnership session trains 120 HR leaders on ESG competency", headlineVi: "Phiên đối tác SHRM đào tạo 120 lãnh đạo HR về năng lực ESG", source: "SHRM Global", category: "social", sentiment: "neutral" },
  { headline: "Minqin tree-planting phase adds 28 saxaul saplings this week", headlineVi: "Giai đoạn trồng cây Mân Tần thêm 28 cây saxaul tuần này", source: "EngmaIntec", category: "environmental", sentiment: "positive" },
  { headline: "Employee green behaviors offset 18.4 tonnes CO₂ this month", headlineVi: "Hành vi xanh nhân viên bù 18,4 tấn CO₂ tháng này", source: "Behavioral ESG", category: "environmental", sentiment: "positive" },
  { headline: "IBSS 2026 competition countdown: 16 days to submission deadline", headlineVi: "Đếm ngược IBSS 2026: còn 16 ngày đến hạn nộp bài", source: "Competition Hub", category: "governance", sentiment: "neutral" },
];

interface IntelFeedStore {
  news: IntelNewsItem[];
  lastUpdated: Date;
  syncFromQuant: () => void;
  addNewsItem: () => void;
}

export const useIntelFeedStore = create<IntelFeedStore>((set) => ({
  news: NEWS_POOL.slice(0, 6).map((n, i) => ({
    ...n,
    id: `news-init-${i}`,
    timestamp: new Date(Date.now() - i * 120000),
  })),
  lastUpdated: new Date(),

  syncFromQuant: () => {
    set({ lastUpdated: useQuantEngineStore.getState().snapshot.lastComputed });
  },

  addNewsItem: () => {
    const pool = NEWS_POOL[randomIntBetween(0, NEWS_POOL.length - 1)];
    const item: IntelNewsItem = {
      ...pool,
      id: `news-${Date.now()}`,
      timestamp: new Date(),
    };
    set((s) => ({ news: [item, ...s.news].slice(0, 20), lastUpdated: new Date() }));
  },
}));