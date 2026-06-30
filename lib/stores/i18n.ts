import { create } from "zustand";
import type { Language } from "@/types";

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  toggleLanguage: () => set({ language: get().language === "en" ? "vi" : "en" }),
}));