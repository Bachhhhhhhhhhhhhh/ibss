"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { useI18nStore } from "@/lib/stores/i18n";
import type { MapLocation, Pillar } from "@/types";

const InitiativesMap = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.InitiativesMap),
  { ssr: false, loading: () => <div className="w-full h-[500px] rounded-2xl bg-emerald-900/20 animate-pulse" /> }
);

const LocationDetail = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.LocationDetail),
  { ssr: false }
);

const MapFilters = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.MapFilters),
  { ssr: false }
);

export function GlobalMapSection() {
  const [filter, setFilter] = useState<Pillar>("all");
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const language = useI18nStore((s) => s.language);

  return (
    <SectionWrapper
      id="map"
      sectionNumber="04"
      eyebrow={language === "en" ? "Global Reach" : "Tiếp cận Toàn cầu"}
      title={language === "en" ? "East Meets West" : "Đông Gặp Tây"}
      subtitle={language === "en" ? "From Suzhou's fireflies to Syria's children — symbiosis knows no borders" : "Từ đom đóm Tô Châu đến trẻ em Syria — cộng sinh không biên giới"}
      className="pattern-dots"
    >
      <MapFilters filter={filter} onFilter={setFilter} />
      <InitiativesMap filter={filter} selected={selected} onSelect={setSelected} />
      {selected && <LocationDetail location={selected} onClose={() => setSelected(null)} />}
    </SectionWrapper>
  );
}