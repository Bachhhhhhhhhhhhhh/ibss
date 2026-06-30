"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useI18nStore } from "@/lib/stores/i18n";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const PARAGRAPHS_EN = [
  "Symbiosis Nexus 2026 was conceived and built by Truong The Bach, a dual-degree student, researcher, and data-driven strategist based in Hanoi, Vietnam.",
  "Currently Head of Technology, Data Analysis & Business Analysis at ECOP Commerce & Services JSC, he leads analytics pipelines and data-informed product decisions. He is simultaneously pursuing a B.A. in International Relations at the Diplomatic Academy of Vietnam and a B.A. in International Business Economics at Foreign Trade University (GPA 3.80/4.00).",
  "His experience includes sustainable development policy research at Vietnam's Ministry of Planning and Investment, circular economy community leadership, and advanced technical work (AWS Certified Data Analytics – Specialty). A FPT Young Talents Scholarship recipient (K26) and winner of multiple national research awards including Best Paper at VEAM 2025, Bach bridges rigorous academic research, real-world business analysis, and technology to create systems where complex sustainability challenges become intuitive and actionable.",
  "This platform represents his effort to turn official competition materials into a living, real-time experience — demonstrating how data, policy, and thoughtful design can work in symbiosis.",
];

const PARAGRAPHS_VI = [
  "Symbiosis Nexus 2026 được sáng tạo và xây dựng bởi Trương Thế Bách — sinh viên song ngành, nhà nghiên cứu và chiến lược gia dữ liệu tại Hà Nội, Việt Nam.",
  "Hiện là Trưởng nhóm Công nghệ, Phân tích Dữ liệu & Phân tích Kinh doanh tại ECOP Commerce & Services JSC, anh dẫn dắt pipeline phân tích và quyết định sản phẩm dựa trên dữ liệu. Đồng thời theo học Cử nhân Quan hệ Quốc tế tại Học viện Ngoại giao và Cử nhân Kinh tế Thương mại Quốc tế tại Đại học Ngoại thương (GPA 3.80/4.00).",
  "Kinh nghiệm bao gồm nghiên cứu chính sách phát triển bền vững tại Bộ Kế hoạch và Đầu tư, lãnh đạo cộng đồng kinh tế tuần hoàn, và công việc kỹ thuật nâng cao (AWS Certified Data Analytics – Specialty). Học bổng FPT Young Talents (K26) và nhiều giải thưởng nghiên cứu quốc gia, Bach kết nối nghiên cứu học thuật, phân tích kinh doanh thực tiễn và công nghệ.",
  "Nền tảng này thể hiện nỗ lực biến tài liệu cuộc thi chính thức thành trải nghiệm sống động, thời gian thực — chứng minh dữ liệu, chính sách và thiết kế có thể cộng sinh.",
];

export function CreatorSection() {
  const language = useI18nStore((s) => s.language);
  const reduced = useReducedMotion();
  const paragraphs = language === "en" ? PARAGRAPHS_EN : PARAGRAPHS_VI;

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.8, delay, type: "spring" as const, stiffness: 80, damping: 20 },
        };

  return (
    <section
      id="creator"
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="creator-title"
    >
      <div className="absolute top-8 right-4 md:right-8 font-display text-[8rem] md:text-[12rem] leading-none text-white/[0.02] select-none pointer-events-none" aria-hidden="true">
        07
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Visual — 2 columns */}
          <motion.div {...fade(0)} className="lg:col-span-2">
            <motion.div
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:max-w-none"
              whileHover={reduced ? {} : { scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Gradient border glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/30 via-transparent to-amber-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#021a0f]">
                <Image
                  src="/creator-portrait.png"
                  alt={language === "en" ? "Truong The Bach — Creator of Symbiosis Nexus 2026" : "Trương Thế Bách — Người sáng tạo Symbiosis Nexus 2026"}
                  width={640}
                  height={800}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={false}
                />

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021a0f]/90 via-[#021a0f]/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/5 pointer-events-none mix-blend-overlay" />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-emerald-400/40"
                      style={{ left: `${12 + i * 11}%`, top: `${20 + (i % 4) * 18}%` }}
                      animate={reduced ? {} : { y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-white/40 tracking-widest uppercase">Hanoi, Vietnam</p>
                  <p className="font-display text-lg text-white/90 mt-1">Truong The Bach</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text — 3 columns */}
          <div className="lg:col-span-3">
            <motion.div {...fade(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-400/90 mb-6">
                <Sparkles className="h-3 w-3" />
                {language === "en" ? "The Creator" : "Người Sáng tạo"}
              </span>

              <h2 id="creator-title" className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.1] tracking-tight mb-4">
                {language === "en" ? "Built with" : "Xây dựng với"}
                <span className="block text-gradient-emerald mt-1">
                  {language === "en" ? "Intention" : "Ý đồ"}
                </span>
              </h2>

              <div className="w-16 h-px bg-gradient-to-r from-emerald-500 to-amber-500/60 mb-10" aria-hidden="true" />
            </motion.div>

            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  {...fade(0.2 + i * 0.1)}
                  className={cn(
                    "text-base md:text-[1.05rem] leading-[1.85] text-white/55 font-light",
                    i === 0 && "text-white/70 text-lg md:text-xl leading-relaxed font-normal"
                  )}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div {...fade(0.6)} className="mt-10 flex flex-wrap gap-3">
              {[
                language === "en" ? "Data & Policy" : "Dữ liệu & Chính sách",
                language === "en" ? "Sustainability Research" : "Nghiên cứu Bền vững",
                "AWS Certified",
                language === "en" ? "VEAM 2025 Best Paper" : "VEAM 2025 Best Paper",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs text-white/40 border border-white/8 bg-white/[0.03]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}