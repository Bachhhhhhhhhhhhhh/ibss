"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Globe2, Building2, Leaf, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/common/marquee";
import { TextReveal } from "@/components/common/text-reveal";
import { Magnetic } from "@/components/common/magnetic";
import { useI18nStore } from "@/lib/stores/i18n";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useInView } from "@/lib/hooks/use-in-view";

const HeroParticles = dynamic(() => import("@/components/three/hero-particles").then((m) => m.HeroParticles), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-transparent to-background" />,
});

const MARQUEE_EN = [
  "SBTi Validated May 2025",
  "Huigui 15% Energy Reduction",
  "2,500 Fireflies Released",
  "Net-Zero by 2050",
  "19 ESG Initiatives",
  "Bridging East & West",
  "Symbiosis Philosophy",
  "CSR 3.0 Framework",
];

const MARQUEE_VI = [
  "SBTi Xác thực 5/2025",
  "Huigui Giảm 15% Năng lượng",
  "2.500 Đom đóm Thả",
  "Net-Zero 2050",
  "19 Sáng kiến ESG",
  "Kết nối Đông Tây",
  "Triết lý Cộng sinh",
  "Khung CSR 3.0",
];

const STATS_EN = [
  { value: "19", label: "ESG Initiatives", icon: Leaf },
  { value: "15%", label: "Energy Reduced", icon: Zap },
  { value: "2,500", label: "Fireflies Restored", icon: Sparkles },
  { value: "2050", label: "Net-Zero Target", icon: Globe2 },
];

const STATS_VI = [
  { value: "19", label: "Sáng kiến ESG", icon: Leaf },
  { value: "15%", label: "Giảm Năng lượng", icon: Zap },
  { value: "2.500", label: "Đom đóm Phục hồi", icon: Sparkles },
  { value: "2050", label: "Mục tiêu Net-Zero", icon: Globe2 },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef);
  const language = useI18nStore((s) => s.language);
  const reduced = useReducedMotion();
  const stats = language === "en" ? STATS_EN : STATS_VI;
  const marquee = language === "en" ? MARQUEE_EN : MARQUEE_VI;

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, type: "spring" as const, stiffness: 80 } };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" aria-label="Hero">
      <HeroParticles isVisible={heroInView} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(16,185,129,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 pattern-leaves opacity-30 pointer-events-none" />
      <div className="absolute inset-0 mesh-grid opacity-40 pointer-events-none" />

      <div className="absolute top-24 left-8 w-px h-32 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent hidden lg:block" aria-hidden="true" />
      <div className="absolute top-24 right-8 w-px h-32 bg-gradient-to-b from-amber-500/40 via-amber-500/15 to-transparent hidden lg:block" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center w-full pt-28 pb-12">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full ultra-glass luxury-border border-amber-500/20 mb-10"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400/90">
              {language === "en" ? "IBSS Bridging East and West 2026" : "IBSS Kết nối Đông Tây 2026"}
            </span>
            <span className="live-dot ml-1" aria-label="Live" />
          </motion.div>

          <motion.p {...fadeUp(0.1)} className="text-sm font-medium tracking-[0.3em] uppercase text-emerald-400/80 mb-6">
            Engma Group · Global ESG Strategy
          </motion.p>

          <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.92] tracking-tight mb-6 flex flex-col items-center title-luxury">
            <TextReveal text="Symbiosis" className="text-shimmer block" delay={0.3} as="span" />
            <TextReveal text="Nexus" className="text-foreground/95 block mt-1" delay={0.55} as="span" />
            <motion.span
              className="text-gradient-gold text-[0.5em] block mt-4 font-serif italic"
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
            >
              2026
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.35)}
            className="text-lg md:text-xl lg:text-2xl text-body-friendly max-w-3xl mx-auto mb-6 leading-relaxed font-light"
          >
            {language === "en"
              ? "A cinematic ESG command center — explore, simulate, and export strategy in real time."
              : "Trung tâm điều hành ESG điện ảnh — khám phá, mô phỏng và xuất chiến lược theo thời gian thực."}
          </motion.p>

          <motion.p {...fadeUp(0.4)} className="text-sm text-theme-subtle max-w-xl mx-auto mb-12">
            {language === "en"
              ? "No login required · Bilingual · Dark & Light · Strategy PDF export"
              : "Không cần đăng nhập · Song ngữ · Sáng/Tối · Xuất PDF chiến lược"}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Magnetic>
              <Button size="lg" className="btn-luxury" asChild>
                <a href="#dashboard">
                  <Globe2 className="h-4 w-4" />
                  {language === "en" ? "Enter Live Dashboard" : "Vào Bảng điều khiển"}
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button variant="secondary" size="lg" className="ultra-glass" asChild>
                <a href="#strategy">
                  <Building2 className="h-4 w-4" />
                  {language === "en" ? "Open Strategy Lab" : "Mở Phòng Lab Chiến lược"}
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            {...fadeUp(0.65)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="luxury-stat luxury-border rounded-2xl px-5 py-6 text-center"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <Icon className="h-4 w-4 text-emerald-400/60 mx-auto mb-3" aria-hidden />
                  <p className="font-display text-2xl md:text-3xl text-gradient-emerald mb-1.5">{stat.value}</p>
                  <p className="text-[10px] text-theme-subtle uppercase tracking-[0.15em] font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div {...fadeUp(0.8)} className="relative z-10">
        <Marquee items={marquee} />
      </motion.div>

      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <a
          href="#dashboard"
          className="inline-flex flex-col items-center gap-2 text-theme-subtle hover:text-emerald-400 transition-colors duration-500 group"
          aria-label={language === "en" ? "Scroll to dashboard" : "Cuộn xuống bảng điều khiển"}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] mb-1 font-medium">
            {language === "en" ? "Explore" : "Khám phá"}
          </span>
          <div className="w-8 h-12 rounded-full border border-emerald-500/25 flex items-start justify-center p-2 group-hover:border-emerald-400/50 transition-colors">
            <motion.div animate={reduced ? {} : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ArrowDown className="h-3.5 w-3.5 text-emerald-400/70" />
            </motion.div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}