"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { X, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUICK_TOUR_STEPS } from "@/lib/data/quick-tour";
import { useI18nStore } from "@/lib/stores/i18n";

const STORAGE_KEY = "symbiosis-guide-dismissed";

export function QuickStartGuide() {
  const language = useI18nStore((s) => s.language);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed top-[5.5rem] left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40"
          aria-label={language === "en" ? "Quick start guide" : "Hướng dẫn bắt đầu"}
        >
          <div className="user-hint-panel p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {language === "en" ? "New here? Start in 3 steps" : "Lần đầu vào? Bắt đầu trong 3 bước"}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {language === "en"
                      ? "No account needed — just scroll or tap below"
                      : "Không cần đăng nhập — cuộn hoặc nhấn bên dưới"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                aria-label={language === "en" ? "Dismiss guide" : "Đóng hướng dẫn"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ol className="space-y-2.5">
              {QUICK_TOUR_STEPS.map((step, i) => {
                const Icon = LucideIcons[step.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                return (
                  <li key={step.id}>
                    <a
                      href={step.href}
                      onClick={dismiss}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/25 hover:bg-emerald-500/[0.05] transition-all group"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="h-3.5 w-3.5 text-emerald-400/70 shrink-0" />}
                          <p className="text-sm font-medium text-white/90 group-hover:text-emerald-300 transition-colors">
                            {language === "en" ? step.title : step.titleVi}
                          </p>
                        </div>
                        <p className="text-xs text-white/45 mt-1 leading-relaxed">
                          {language === "en" ? step.description : step.descriptionVi}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-emerald-400 shrink-0 mt-1 transition-colors" />
                    </a>
                  </li>
                );
              })}
            </ol>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.06]">
              <Button size="sm" variant="secondary" className="flex-1" asChild>
                <a href="#dashboard" onClick={dismiss}>
                  {language === "en" ? "Let's go" : "Bắt đầu ngay"}
                </a>
              </Button>
              <Button size="sm" variant="ghost" onClick={dismiss} className="text-white/50">
                {language === "en" ? "Skip" : "Bỏ qua"}
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}