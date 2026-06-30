"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronUp, X, Map, Headphones, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUICK_TOUR_STEPS } from "@/lib/data/quick-tour";
import { useI18nStore } from "@/lib/stores/i18n";
import { useAmbientStore } from "@/lib/stores/ambient";
import { cn } from "@/lib/utils";

export function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const language = useI18nStore((s) => s.language);
  const togglePlay = useAmbientStore((s) => s.togglePlay);
  const setExpanded = useAmbientStore((s) => s.setExpanded);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const startMusic = () => {
    togglePlay();
    setExpanded(true);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            type="button"
            onClick={scrollTop}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel text-xs text-white/60 hover:text-emerald-400 border border-white/10 transition-colors"
            aria-label={language === "en" ? "Back to top" : "Về đầu trang"}
          >
            <ChevronUp className="h-3.5 w-3.5" />
            {language === "en" ? "Top" : "Lên đầu"}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="w-[min(100vw-2rem,300px)] user-hint-panel p-4 mb-1"
            role="dialog"
            aria-label={language === "en" ? "Site help" : "Trợ giúp trang web"}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">
                {language === "en" ? "Need a hand?" : "Cần trợ giúp?"}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-white/40 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-white/50 leading-relaxed mb-3">
              {language === "en"
                ? "Jump to any section or turn on chill music while you explore."
                : "Nhảy đến bất kỳ mục nào hoặc bật nhạc lofi thư giãn khi khám phá."}
            </p>

            <div className="space-y-1.5 mb-3">
              {QUICK_TOUR_STEPS.map((step) => (
                <a
                  key={step.id}
                  href={step.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs text-white/70 hover:text-emerald-300 hover:bg-white/[0.04] transition-colors"
                >
                  {language === "en" ? step.title : step.titleVi}
                </a>
              ))}
              <a
                href="#map"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/70 hover:text-emerald-300 hover:bg-white/[0.04] transition-colors"
              >
                <Map className="h-3.5 w-3.5" />
                {language === "en" ? "Global map" : "Bản đồ toàn cầu"}
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={startMusic}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left text-white/60 hover:text-emerald-300 hover:bg-white/[0.04] transition-colors w-full"
              >
                <Headphones className="h-3.5 w-3.5 shrink-0" />
                {language === "en" ? "Play chill lofi music" : "Bật nhạc lofi thư giãn"}
              </button>
              <p className="text-[10px] text-white/30 px-1 flex items-start gap-1.5">
                <Gauge className="h-3 w-3 shrink-0 mt-0.5" />
                {language === "en"
                  ? "Use the speed button in the nav to pause live data updates."
                  : "Nút tốc độ trên menu giúp tạm dừng cập nhật số liệu."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setOpen(!open)}
        className={cn(
          "rounded-full h-12 w-12 shadow-[0_8px_32px_rgba(0,0,0,0.45)] border",
          open ? "bg-emerald-500/20 border-emerald-500/40" : "bg-emerald-950/90 border-white/10 hover:border-emerald-500/30"
        )}
        aria-label={language === "en" ? "Open help menu" : "Mở menu trợ giúp"}
        aria-expanded={open}
      >
        <HelpCircle className={cn("h-5 w-5", open ? "text-emerald-400" : "text-white/70")} />
      </Button>
    </div>
  );
}