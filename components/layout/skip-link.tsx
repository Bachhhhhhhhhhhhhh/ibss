"use client";

import { useI18nStore } from "@/lib/stores/i18n";

export function SkipLink() {
  const language = useI18nStore((s) => s.language);

  return (
    <a href="#main-content" className="skip-link">
      {language === "en" ? "Skip to main content" : "Chuyển đến nội dung chính"}
    </a>
  );
}