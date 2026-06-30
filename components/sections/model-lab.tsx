"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Maximize2, RotateCw } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { MODEL_LAB_ENTRIES } from "@/lib/data/model-lab";
import { ModelGalleryCard } from "@/components/sections/model-gallery-card";
import { ModelDetailPanel } from "@/components/sections/model-detail-panel";
import { IntelHub } from "@/components/analytics/intel-hub";
import { useI18nStore } from "@/lib/stores/i18n";
import { useInView } from "@/lib/hooks/use-in-view";

const ModelLabScene = dynamic(
  () => import("@/components/three/model-lab-scene").then((m) => m.ModelLabScene),
  {
    ssr: false,
    loading: () => (
      <div className="model-viewport-frame h-[420px] md:h-[520px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="text-xs text-white/40">Loading 3D engine…</span>
        </div>
      </div>
    ),
  }
);

export function ModelLabSection() {
  const [activeModel, setActiveModel] = useState(MODEL_LAB_ENTRIES[0].id);
  const [panelOpen, setPanelOpen] = useState(true);
  const language = useI18nStore((s) => s.language);
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef);

  const entry = MODEL_LAB_ENTRIES.find((m) => m.id === activeModel) ?? MODEL_LAB_ENTRIES[0];

  const handleSelect = (id: string) => {
    setActiveModel(id);
    setPanelOpen(true);
  };

  return (
    <SectionWrapper
      id="models"
      sectionNumber="03"
      eyebrow={language === "en" ? "Interactive 3D Lab" : "Phòng Lab 3D Tương tác"}
      title={language === "en" ? "Digital Twin & Analytics Lab" : "Lab Bản sao Số & Phân tích"}
      subtitle={
        language === "en"
          ? "Friendly 3D twins, quantitative analytics, ML predictions, and live ESG news — explore and interact."
          : "Mô hình 3D thân thiện, phân tích định lượng, dự đoán ML và tin ESG trực tiếp — khám phá và tương tác."
      }
      align="left"
    >
      {/* Model picker strip */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-xs text-white/45 flex items-center gap-2">
            <MousePointer2 className="h-3.5 w-3.5 text-emerald-400/70" />
            {language === "en" ? "Select a model to explore" : "Chọn mô hình để khám phá"}
          </p>
          <span className="text-[10px] font-mono text-white/30">
            {MODEL_LAB_ENTRIES.length} {language === "en" ? "models" : "mô hình"}
          </span>
        </div>
        <div
          className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin -mx-1 px-1"
          role="tablist"
          aria-label={language === "en" ? "3D model gallery" : "Thư viện mô hình 3D"}
        >
          {MODEL_LAB_ENTRIES.map((model, i) => (
            <div key={model.id} className="snap-start">
              <ModelGalleryCard
                model={model}
                active={activeModel === model.id}
                language={language}
                index={i}
                onSelect={() => handleSelect(model.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main stage */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4" ref={sceneRef}>
          <div className="relative">
            <ModelLabScene
              key={activeModel}
              modelId={activeModel}
              modelName={language === "en" ? entry.name : entry.nameVi}
              accentColor={entry.accent}
              isVisible={inView}
            />

            {/* Viewport controls legend */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none z-10">
              {[
                { icon: RotateCw, en: "Drag to rotate", vi: "Kéo để xoay" },
                { icon: Maximize2, en: "Scroll to zoom", vi: "Cuộn để zoom" },
              ].map((tip) => (
                <span
                  key={tip.en}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-white/50"
                >
                  <tip.icon className="h-3 w-3" />
                  {language === "en" ? tip.en : tip.vi}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            {panelOpen ? (
              <ModelDetailPanel key={entry.id} model={entry} language={language} />
            ) : (
              <motion.button
                key="closed"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setPanelOpen(true)}
                className="w-full model-detail-panel p-8 text-center hover:border-emerald-500/30 transition-colors"
              >
                <p className="text-sm text-white/50">
                  {language === "en" ? "Tap to show model details" : "Nhấn để xem chi tiết mô hình"}
                </p>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <IntelHub />
    </SectionWrapper>
  );
}