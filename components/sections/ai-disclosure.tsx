"use client";

import { Bot } from "lucide-react";
import { useI18nStore } from "@/lib/stores/i18n";

export function AiDisclosureSection() {
  const language = useI18nStore((s) => s.language);

  return (
    <section id="ai-disclosure" className="py-12 border-t border-white/5" aria-labelledby="ai-disclosure-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4 text-amber-400">
          <Bot className="h-5 w-5" />
          <h2 id="ai-disclosure-title" className="font-serif text-lg">
            {language === "en" ? "AI Disclosure" : "Công bố AI"}
          </h2>
        </div>
        <p className="text-sm text-white/50 leading-relaxed">
          {language === "en"
            ? "This interactive digital experience was developed with AI-assisted tools for code generation, design ideation, and content structuring. All ESG data points are sourced from official Engma Group case materials and IBSS 2026 competition documents. Forward-looking projections in the Strategy Lab represent original analytical extensions aligned with the symbiosis philosophy. AI tools used: code assistant for Next.js development, design reference for UI patterns. No AI-generated data or fabricated company metrics were used."
            : "Trải nghiệm số tương tác này được phát triển với công cụ hỗ trợ AI cho tạo mã, ý tưởng thiết kế và cấu trúc nội dung. Tất cả dữ liệu ESG lấy từ tài liệu case chính thức Engma Group và tài liệu cuộc thi IBSS 2026. Dự báo trong Phòng Lab Chiến lược là phần mở rộng phân tích gốc phù hợp triết lý cộng sinh."}
        </p>
      </div>
    </section>
  );
}