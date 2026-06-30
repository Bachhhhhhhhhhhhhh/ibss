"use client";

import { Leaf, ArrowUpRight } from "lucide-react";
import { useI18nStore } from "@/lib/stores/i18n";

const FOOTER_LINKS = [
  { label: "Dashboard", labelVi: "Bảng điều khiển", href: "#dashboard" },
  { label: "Huigui", labelVi: "Huigui", href: "#huigui" },
  { label: "3D Lab", labelVi: "Lab 3D", href: "#models" },
  { label: "Initiatives", labelVi: "Sáng kiến", href: "#initiatives" },
  { label: "Strategy Lab", labelVi: "Phòng Lab Chiến lược", href: "#strategy" },
  { label: "Competition", labelVi: "Cuộc thi", href: "#competition" },
  { label: "The Creator", labelVi: "Tác giả", href: "#creator" },
];

export function Footer() {
  const language = useI18nStore((s) => s.language);

  return (
    <footer className="relative border-t border-white/5 py-20 overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[12rem] text-white/[0.015] leading-none select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
        SYMBIOSIS
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-display text-2xl text-white block">Symbiosis Nexus</span>
                <span className="text-xs text-emerald-400/60 tracking-widest uppercase">2026</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-md">
              {language === "en"
                ? "An award-caliber interactive ESG strategy experience inspired by Engma Group's Symbiosis Philosophy and the official 2026 IBSS case materials."
                : "Trải nghiệm chiến lược ESG tương tác đẳng cấp, lấy cảm hứng từ Triết lý Cộng sinh Engma Group và tài liệu case IBSS 2026."}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-5 uppercase tracking-[0.15em]">
              {language === "en" ? "Navigate" : "Điều hướng"}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                    {language === "en" ? link.label : link.labelVi}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white/60 mb-5 uppercase tracking-[0.15em]">
              {language === "en" ? "Sources & Contact" : "Nguồn & Liên hệ"}
            </h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li>IBSS Bridging East & West 2026</li>
              <li>Engma Group ESG Collection</li>
              <li>SBTi Validated · May 2025</li>
            </ul>
            <p className="text-sm text-emerald-400/70 mt-4">ibss@engma-group.com</p>
          </div>
        </div>

        <div className="glow-line mb-8" aria-hidden="true" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <p>© 2026 Symbiosis Nexus. {language === "en" ? "All rights reserved." : "Bảo lưu mọi quyền."}</p>
          <p className="text-center md:text-right max-w-sm">
            {language === "en"
              ? "Complements official PPT + 15-min video submission"
              : "Bổ sung cho nộp PPT + Video 15 phút chính thức"}
          </p>
        </div>
      </div>
    </footer>
  );
}