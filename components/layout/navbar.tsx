"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, Gauge, Globe, ChevronRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LofiPlayerToggle } from "@/components/common/lofi-player";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { NAV_HINTS } from "@/lib/data/quick-tour";
import { useSimulationStore } from "@/lib/stores/simulation";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#dashboard", label: "Dashboard", labelVi: "Bảng điều khiển", id: "dashboard" },
  { href: "#huigui", label: "Huigui", labelVi: "Huigui", id: "huigui" },
  { href: "#models", label: "3D Lab", labelVi: "Lab 3D", id: "models" },
  { href: "#map", label: "Global", labelVi: "Toàn cầu", id: "map" },
  { href: "#initiatives", label: "Initiatives", labelVi: "Sáng kiến", id: "initiatives" },
  { href: "#strategy", label: "Strategy", labelVi: "Chiến lược", id: "strategy" },
  { href: "#competition", label: "Competition", labelVi: "Cuộc thi", id: "competition" },
  { href: "#creator", label: "Creator", labelVi: "Tác giả", id: "creator" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const speed = useSimulationStore((s) => s.speed);
  const cycleSpeed = useSimulationStore((s) => s.cycleSpeed);
  const language = useI18nStore((s) => s.language);
  const toggleLanguage = useI18nStore((s) => s.toggleLanguage);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const speedLabel =
    speed === "pause"
      ? language === "en"
        ? "Paused"
        : "Đã dừng"
      : speed === "1x"
        ? language === "en"
          ? "Normal"
          : "Bình thường"
        : speed === "5x"
          ? language === "en"
            ? "Fast"
            : "Nhanh"
          : speed;

  const speedTooltip =
    language === "en"
      ? "Control how fast live metrics update. Tap to cycle: Normal → Fast → Paused"
      : "Điều chỉnh tốc độ cập nhật số liệu. Nhấn để chuyển: Bình thường → Nhanh → Dừng";

  const musicTooltip =
    language === "en"
      ? "Play chill lofi music while you explore"
      : "Bật nhạc lofi thư giãn khi khám phá";

  const langTooltip = language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled ? "nav-ultra" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-[4.5rem] items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-3 group min-w-0" aria-label="Symbiosis Nexus 2026 Home">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
              <Leaf className="h-4 w-4 text-emerald-400 transition-transform group-hover:rotate-12" />
            </div>
            <div className="hidden sm:block min-w-0">
              <span className="font-display text-base text-white leading-none block truncate">Symbiosis Nexus</span>
              <span className="text-[10px] text-emerald-400/60 tracking-widest uppercase">
                {language === "en" ? "2026 · ESG Experience" : "2026 · Trải nghiệm ESG"}
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-0.5 ultra-glass rounded-2xl p-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const hint = NAV_HINTS[link.id];
              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      className={cn(
                        "relative px-3.5 py-2 text-sm rounded-xl transition-all duration-300",
                        isActive ? "text-emerald-400" : "text-white/55 hover:text-white/85"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{language === "en" ? link.label : link.labelVi}</span>
                    </a>
                  </TooltipTrigger>
                  {hint && (
                    <TooltipContent side="bottom" className="max-w-[180px] text-center">
                      {language === "en" ? hint.en : hint.vi}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mr-0.5"
              title={language === "en" ? "Metrics update in real time" : "Số liệu cập nhật theo thời gian thực"}
            >
              <span className="live-dot" />
              <span className="text-[10px] font-semibold tracking-wider text-emerald-400/80 uppercase">Live</span>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <LofiPlayerToggle />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-1.5">
                <Headphones className="h-3 w-3" />
                {musicTooltip}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleSpeed}
                  aria-label={`${language === "en" ? "Simulation speed" : "Tốc độ mô phỏng"}: ${speedLabel}`}
                  className="hidden sm:flex rounded-xl border border-white/8 hover:border-emerald-500/30 min-w-[4.5rem]"
                >
                  <Gauge className={cn("h-3.5 w-3.5", speed !== "pause" && "text-emerald-400")} />
                  <span className="text-xs font-mono">{speedLabel}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[220px]">
                {speedTooltip}
              </TooltipContent>
            </Tooltip>

            <ThemeToggle />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  aria-label={langTooltip}
                  className="rounded-xl border border-white/8 hover:border-emerald-500/30 uppercase font-mono text-xs"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{langTooltip}</TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? (language === "en" ? "Close menu" : "Đóng menu") : (language === "en" ? "Open menu" : "Mở menu")}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/5 glass-nav overflow-hidden"
          >
            <p className="px-4 pt-4 pb-2 text-[11px] text-white/40 uppercase tracking-wider">
              {language === "en" ? "Jump to section" : "Chuyển đến mục"}
            </p>
            <div className="px-4 pb-4 space-y-1">
              {NAV_LINKS.map((link, i) => {
                const hint = NAV_HINTS[link.id];
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div>
                      <span className="text-sm text-white/80 group-hover:text-emerald-400 block">
                        {language === "en" ? link.label : link.labelVi}
                      </span>
                      {hint && (
                        <span className="text-[11px] text-white/35 mt-0.5 block">
                          {language === "en" ? hint.en : hint.vi}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-30 group-hover:opacity-60 shrink-0" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}