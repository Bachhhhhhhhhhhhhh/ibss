"use client";

import { Cloud, Droplets, TreePine, Zap, Users, Sparkles, Leaf, type LucideIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { EnergyChart } from "@/components/dashboard/energy-chart";
import { ProgressRings } from "@/components/dashboard/progress-rings";
import { SymbiosisIndex } from "@/components/dashboard/symbiosis-index";
import { QuantComputeDashboard } from "@/components/dashboard/quant-compute-dashboard";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useI18nStore } from "@/lib/stores/i18n";

interface KpiItem {
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: number;
  accent?: "emerald" | "amber" | "blue";
}

export function DashboardSection() {
  const metrics = useLiveMetricsStore((s) => s.displayMetrics);
  const language = useI18nStore((s) => s.language);

  const overviewKpis: KpiItem[] = [
    { title: language === "en" ? "CO₂ Avoided" : "CO₂ Tránh được", value: metrics.co2AvoidedTonnes, decimals: 1, suffix: "t", icon: Cloud, trend: 0.4 },
    { title: language === "en" ? "Trees Planted" : "Cây Trồng", value: metrics.treesPlantedMonth, icon: TreePine, trend: 2, accent: "emerald" },
    { title: language === "en" ? "Water Saved Today" : "Nước Tiết kiệm", value: metrics.waterSavedTodayLitres, suffix: "L", icon: Droplets, trend: 1.2, accent: "blue" },
    { title: language === "en" ? "Renewable Energy" : "Năng lượng Tái tạo", value: metrics.renewablePercent, decimals: 1, suffix: "%", icon: Zap, trend: 0.3, accent: "amber" },
  ];

  const envKpis: KpiItem[] = [
    { title: language === "en" ? "Fireflies Active" : "Đom đóm Hoạt động", value: metrics.firefliesActive, icon: Sparkles, accent: "amber" },
    { title: language === "en" ? "Energy Reduction" : "Giảm Năng lượng", value: metrics.energyReductionPercent, suffix: "%", icon: Zap },
    { title: language === "en" ? "Employee CO₂ Offset" : "Bù CO₂ Nhân viên", value: metrics.employeeCo2OffsetKg, suffix: " kg", icon: Leaf },
    { title: language === "en" ? "Scope 1 Progress" : "Tiến độ Phạm vi 1", value: metrics.scope1Progress, decimals: 1, suffix: "%", icon: Cloud, accent: "blue" },
  ];

  const socialKpis: KpiItem[] = [
    { title: language === "en" ? "Community Programs" : "Chương trình Cộng đồng", value: 12, icon: Users, accent: "blue" },
    { title: language === "en" ? "Education Reach" : "Tiếp cận Giáo dục", value: 847, icon: Users },
    { title: language === "en" ? "Inclusive Hires" : "Tuyển dụng Hòa nhập", value: 34, icon: Users, accent: "emerald" },
    { title: language === "en" ? "Health Run" : "Chạy Từ thiện", value: 520, icon: Users, accent: "amber" },
  ];

  const govKpis: KpiItem[] = [
    { title: language === "en" ? "SBTi Suppliers" : "Nhà cung cấp SBTi", value: metrics.supplierSbtiAdoption, suffix: "%", icon: Users },
    { title: language === "en" ? "Compliance" : "Tuân thủ", value: 96.2, decimals: 1, suffix: "%", icon: Users, accent: "emerald" },
    { title: language === "en" ? "Governance" : "Quản trị", value: 91, suffix: "/100", icon: Users, accent: "blue" },
    { title: language === "en" ? "Ethics Training" : "Đào tạo Đạo đức", value: 100, suffix: "%", icon: Users, accent: "amber" },
  ];

  const renderKpis = (kpis: KpiItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {kpis.map((kpi, i) => (
        <KpiCard key={kpi.title} {...kpi} delay={i * 0.08} />
      ))}
    </div>
  );

  return (
    <SectionWrapper
      id="dashboard"
      sectionNumber="01"
      eyebrow={language === "en" ? "Live Engine" : "Công cụ Trực tiếp"}
      title={language === "en" ? "Symbiosis Dashboard" : "Bảng điều khiển Cộng sinh"}
      subtitle={language === "en" ? "Real-time ESG intelligence — every metric breathes with the pulse of Engma's global symbiosis" : "Thông minh ESG thời gian thực — mọi chỉ số sống động theo nhịp cộng sinh toàn cầu của Engma"}
      className="pattern-circuit"
    >
      <div className="mb-10">
        <SymbiosisIndex />
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="w-full sm:w-auto h-auto p-1.5 gap-1">
          <TabsTrigger value="overview" className="px-5 py-2.5">{language === "en" ? "Overview" : "Tổng quan"}</TabsTrigger>
          <TabsTrigger value="environmental" className="px-5 py-2.5">{language === "en" ? "Environmental" : "Môi trường"}</TabsTrigger>
          <TabsTrigger value="social" className="px-5 py-2.5">{language === "en" ? "Social" : "Xã hội"}</TabsTrigger>
          <TabsTrigger value="governance" className="px-5 py-2.5">{language === "en" ? "Governance" : "Quản trị"}</TabsTrigger>
          <TabsTrigger value="quant" className="px-5 py-2.5">{language === "en" ? "Quant Models" : "Mô hình Định lượng"}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">{renderKpis(overviewKpis)}</TabsContent>
        <TabsContent value="environmental">{renderKpis(envKpis)}</TabsContent>
        <TabsContent value="social">{renderKpis(socialKpis)}</TabsContent>
        <TabsContent value="governance">{renderKpis(govKpis)}</TabsContent>
        <TabsContent value="quant">
          <QuantComputeDashboard />
        </TabsContent>
      </Tabs>

      {/* Bento grid */}
      <div className="grid lg:grid-cols-12 gap-5 mt-10">
        <div className="lg:col-span-8 space-y-5">
          <EnergyChart />
          <ProgressRings />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
      </div>
    </SectionWrapper>
  );
}