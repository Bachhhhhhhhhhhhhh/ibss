"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapLocations } from "@/lib/data/map-locations";
import { useI18nStore } from "@/lib/stores/i18n";
import type { MapLocation, Pillar } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pillarColors: Record<string, string> = {
  environmental: "#10b981",
  social: "#3b82f6",
  governance: "#a855f7",
};

function createIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:16px;height:16px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 0 12px ${color}80;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 5, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

interface InitiativesMapProps {
  filter: Pillar;
  selected: MapLocation | null;
  onSelect: (loc: MapLocation) => void;
}

export function InitiativesMap({ filter, selected, onSelect }: InitiativesMapProps) {
  const [mounted, setMounted] = useState(false);
  const language = useI18nStore((s) => s.language);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return <div className="w-full h-[500px] rounded-2xl bg-emerald-900/20 animate-pulse" />;

  const filtered = filter === "all" ? mapLocations : mapLocations.filter((l) => l.pillar === filter);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 z-0">
      <MapContainer center={[35, 105]} zoom={4} className="w-full h-full" scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}
        {filtered.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createIcon(pillarColors[loc.pillar])}
            eventHandlers={{ click: () => onSelect(loc) }}
          >
            <Popup>
              <div className="text-emerald-950 p-1">
                <strong>{language === "en" ? loc.name : loc.nameVi}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export function LocationDetail({ location, onClose }: { location: MapLocation; onClose: () => void }) {
  const language = useI18nStore((s) => s.language);

  return (
    <div className="glass-panel p-6 rounded-2xl mt-6" role="dialog" aria-label={language === "en" ? location.name : location.nameVi}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl text-white">{language === "en" ? location.name : location.nameVi}</h3>
          <Badge variant={location.pillar === "environmental" ? "default" : location.pillar === "social" ? "social" : "governance"} className="mt-2">
            {location.pillar}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/40">{language === "en" ? "Symbiosis Impact Score" : "Điểm Tác động Cộng sinh"}</p>
          <p className="text-3xl font-serif text-amber-400">{location.impactScore}</p>
        </div>
      </div>
      <p className="text-sm text-white/70 mb-4">{language === "en" ? location.description : location.descriptionVi}</p>
      <div className="grid grid-cols-3 gap-4">
        {location.metrics.map((m) => (
          <div key={m.label} className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-lg font-semibold text-emerald-400">{m.value}</p>
            <p className="text-xs text-white/50">{language === "en" ? m.label : m.labelVi}</p>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-4 text-sm text-white/50 hover:text-white transition-colors">
        {language === "en" ? "Close" : "Đóng"}
      </button>
    </div>
  );
}

export function MapFilters({ filter, onFilter }: { filter: Pillar; onFilter: (f: Pillar) => void }) {
  const language = useI18nStore((s) => s.language);
  const filters: { value: Pillar; label: string; labelVi: string }[] = [
    { value: "all", label: "All", labelVi: "Tất cả" },
    { value: "environmental", label: "Environmental", labelVi: "Môi trường" },
    { value: "social", label: "Social", labelVi: "Xã hội" },
    { value: "governance", label: "Governance", labelVi: "Quản trị" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Map filters">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilter(f.value)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm transition-all",
            filter === f.value ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
          )}
        >
          {language === "en" ? f.label : f.labelVi}
        </button>
      ))}
    </div>
  );
}