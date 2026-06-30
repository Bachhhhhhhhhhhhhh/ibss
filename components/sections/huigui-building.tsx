"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { X, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { InteractionHint } from "@/components/common/interaction-hint";
import { Card, CardContent } from "@/components/ui/card";
import { huiguiHotspots, huiguiMetrics } from "@/lib/data/huigui-hotspots";
import { useI18nStore } from "@/lib/stores/i18n";
import { useInView } from "@/lib/hooks/use-in-view";
import { SceneErrorBoundary } from "@/components/three/scene-error-boundary";
import { cn } from "@/lib/utils";

const HuiguiScene = dynamic(
  () => import("@/components/three/huigui-scene").then((m) => m.HuiguiScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] md:h-[520px] rounded-3xl bg-emerald-900/10 border border-white/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="text-xs text-white/30">Loading 3D model…</span>
        </div>
      </div>
    ),
  }
);

export function HuiguiBuildingSection() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const language = useI18nStore((s) => s.language);
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef);

  const hotspot = huiguiHotspots.find((h) => h.id === activeHotspot);
  const IconComponent = hotspot
    ? (LucideIcons[hotspot.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : null;

  return (
    <SectionWrapper
      id="huigui"
      sectionNumber="02"
      eyebrow={language === "en" ? "Flagship Building" : "Tòa nhà Biểu tượng"}
      title={language === "en" ? "Huigui — Living Symbiosis" : "Huigui — Cộng sinh Sống"}
      subtitle={
        language === "en"
          ? "Suzhou's architectural proof that enterprise and ecology are not rivals — they are partners"
          : "Bằng chứng kiến trúc tại Tô Châu: doanh nghiệp và sinh thái không đối địch — mà là đối tác"
      }
      align="left"
    >
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4" ref={sceneRef}>
          <InteractionHint
            en="Tap any green tag below the building — or click a glowing dot on the 3D model — to see details."
            vi="Nhấn thẻ xanh bên dưới tòa nhà — hoặc chấm sáng trên mô hình 3D — để xem chi tiết."
          />
          <SceneErrorBoundary language={language}>
            <HuiguiScene
              activeHotspot={activeHotspot}
              onSelectHotspot={setActiveHotspot}
              isVisible={inView}
            />
          </SceneErrorBoundary>

          {/* Hotspot picker — reliable fallback + syncs with 3D */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Huigui hotspots">
            {huiguiHotspots.map((h) => {
              const Icon = LucideIcons[h.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
              const isActive = activeHotspot === h.id;
              return (
                <button
                  key={h.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveHotspot(isActive ? null : h.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 shadow-[0_0_16px_rgba(16,185,129,0.15)]"
                      : "bg-white/[0.04] text-white/50 border border-white/8 hover:border-emerald-500/25 hover:text-white/70"
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                  {language === "en" ? h.name : h.nameVi}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[280px] lg:min-h-[520px]">
          <AnimatePresence mode="wait">
            {hotspot ? (
              <motion.div
                key={hotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass-panel p-6 rounded-2xl h-full sticky top-24"
                role="tabpanel"
                aria-label={language === "en" ? hotspot.name : hotspot.nameVi}
              >
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
                  aria-label="Close panel"
                >
                  <X className="h-5 w-5" />
                </button>
                {IconComponent && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-emerald-400/70 mb-2">
                  <MapPin className="h-3 w-3" />
                  Suzhou, China
                </div>
                <h3 className="font-display text-xl text-white mb-2">
                  {language === "en" ? hotspot.name : hotspot.nameVi}
                </h3>
                <p className="text-sm text-emerald-400 mb-4 font-medium">
                  {language === "en" ? hotspot.metric : hotspot.metricVi}
                </p>
                <p className="text-sm text-white/65 leading-relaxed">
                  {language === "en" ? hotspot.description : hotspot.descriptionVi}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-6 rounded-2xl h-full min-h-[280px] flex flex-col items-center justify-center text-center sticky top-24"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-emerald-400/60" />
                </div>
                <p className="text-body-friendly text-sm max-w-[220px]">
                  {language === "en"
                    ? "Pick a feature below to get started — we'll show the story here."
                    : "Chọn một tính năng bên dưới để bắt đầu — nội dung sẽ hiện ở đây."}
                </p>
                <p className="text-xs text-emerald-500/50 mt-3">
                  {language === "en" ? "5 hotspots available" : "5 điểm khám phá"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {huiguiMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="text-center">
              <CardContent className="p-5 md:p-6">
                <p className="text-2xl md:text-3xl font-display text-gradient-emerald mb-1">{m.value}</p>
                <p className="text-sm text-white/80 font-medium">
                  {language === "en" ? m.label : m.labelVi}
                </p>
                <p className="text-xs text-white/35 mt-1">{m.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}