"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Globe2, Map as MapIcon, Network } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mapLocations } from "@/lib/data/map-locations";
import { computeGlobalNetworkStats } from "@/lib/quant/global-network-model";
import { useI18nStore } from "@/lib/stores/i18n";
import type { MapLocation } from "@/types";
import type { MapViewFilter } from "@/components/map/initiatives-map";
import { AnimatedCounter } from "@/components/common/animated-counter";

const InitiativesMap = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.InitiativesMap),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[420px] rounded-2xl bg-emerald-900/20 animate-pulse" /> }
);

const LocationDetail = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.LocationDetail),
  { ssr: false }
);

const MapFilters = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.MapFilters),
  { ssr: false }
);

const LocationCard = dynamic(
  () => import("@/components/map/initiatives-map").then((m) => m.LocationCard),
  { ssr: false }
);

const GlobalNetworkPanel = dynamic(
  () => import("@/components/map/global-network-panel").then((m) => m.GlobalNetworkPanel),
  { ssr: false, loading: () => <div className="h-[400px] rounded-2xl bg-emerald-900/20 animate-pulse" /> }
);

const CorridorDetailPanel = dynamic(
  () => import("@/components/map/global-network-panel").then((m) => m.CorridorDetailPanel),
  { ssr: false }
);

export function GlobalMapSection() {
  const [filter, setFilter] = useState<MapViewFilter>({ pillar: "all", region: "all" });
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [highlightedCorridorId, setHighlightedCorridorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const stats = useMemo(() => computeGlobalNetworkStats(), []);

  const sortedLocations = useMemo(
    () => [...mapLocations].sort((a, b) => b.impactScore - a.impactScore),
    []
  );

  const handleCorridorSelect = (id: string) => {
    setHighlightedCorridorId(id);
    setActiveTab("map");
  };

  return (
    <SectionWrapper
      id="map"
      sectionNumber="04"
      eyebrow={vi ? "Tiếp cận Toàn cầu" : "Global Reach"}
      title={vi ? "Đông Gặp Tây" : "East Meets West"}
      subtitle={
        vi
          ? "7 nút mạng · 6 hành lang cộng sinh — từ đom đóm Tô Châu đến trẻ em Syria"
          : "7 network nodes · 6 symbiosis corridors — from Suzhou fireflies to Syria's children"
      }
      className="pattern-dots"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: vi ? "Nút mạng" : "Network Nodes", value: stats.totalLocations, color: "#34d399" },
          { label: vi ? "Hành lang" : "Corridors", value: stats.activeCorridors, color: "#60a5fa" },
          { label: vi ? "Chỉ số Cầu nối" : "Bridge Index", value: stats.bridgeIndex, color: "#fbbf24", decimals: 1 },
          { label: vi ? "Tầm với (km)" : "Total Reach (km)", value: stats.totalReachKm, color: "#c084fc" },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-stat luxury-border rounded-2xl p-4 text-center"
          >
            <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
            <p className="text-2xl font-serif tabular-nums" style={{ color: item.color }}>
              <AnimatedCounter value={item.value} decimals={item.decimals ?? 0} />
            </p>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="map" className="gap-2">
              <MapIcon className="h-3.5 w-3.5" />
              {vi ? "Bản đồ" : "Map"}
            </TabsTrigger>
            <TabsTrigger value="network" className="gap-2">
              <Network className="h-3.5 w-3.5" />
              {vi ? "Mạng lưới" : "Network"}
            </TabsTrigger>
            <TabsTrigger value="nodes" className="gap-2">
              <Globe2 className="h-3.5 w-3.5" />
              {vi ? "Điểm nút" : "Nodes"}
            </TabsTrigger>
          </TabsList>
          <MapFilters filter={filter} onFilter={setFilter} />
        </div>

        <TabsContent value="map" className="mt-0">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 space-y-4">
              <InitiativesMap
                filter={filter}
                selected={selected}
                highlightedCorridorId={highlightedCorridorId}
                onSelect={setSelected}
                onCorridorHover={setHighlightedCorridorId}
                className="h-[480px] lg:h-[520px]"
              />
              {highlightedCorridorId && !selected && (
                <CorridorDetailPanel corridorId={highlightedCorridorId} />
              )}
            </div>
            <div className="xl:col-span-4 space-y-4">
              {selected ? (
                <LocationDetail
                  location={selected}
                  onClose={() => setSelected(null)}
                  onSelectConnection={setSelected}
                />
              ) : (
                <GlobalNetworkPanel
                  highlightedCorridorId={highlightedCorridorId}
                  onCorridorSelect={handleCorridorSelect}
                />
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="network" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlobalNetworkPanel
              highlightedCorridorId={highlightedCorridorId}
              onCorridorSelect={handleCorridorSelect}
            />
            <div className="space-y-4">
              <InitiativesMap
                filter={filter}
                selected={selected}
                highlightedCorridorId={highlightedCorridorId}
                onSelect={setSelected}
                onCorridorHover={setHighlightedCorridorId}
                className="h-[360px]"
              />
              {highlightedCorridorId && (
                <CorridorDetailPanel corridorId={highlightedCorridorId} />
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nodes" className="mt-0">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start max-h-[600px] overflow-y-auto pr-1">
              {sortedLocations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  selected={selected?.id === loc.id}
                  onSelect={() => {
                    setSelected(loc);
                    setActiveTab("map");
                  }}
                />
              ))}
            </div>
            <div className="xl:col-span-7 space-y-4">
              <InitiativesMap
                filter={filter}
                selected={selected}
                highlightedCorridorId={highlightedCorridorId}
                onSelect={setSelected}
                onCorridorHover={setHighlightedCorridorId}
                className="h-[400px]"
              />
              {selected && (
                <LocationDetail
                  location={selected}
                  onClose={() => setSelected(null)}
                  onSelectConnection={setSelected}
                />
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}