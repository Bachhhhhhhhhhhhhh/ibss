"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Link2,
  MapPin,
  Users,
  Leaf,
  X,
} from "lucide-react";
import { mapLocations } from "@/lib/data/map-locations";
import { symbiosisCorridors } from "@/lib/data/symbiosis-corridors";
import { initiatives } from "@/lib/data/initiatives";
import { corridorArc } from "@/lib/map/geo-utils";
import { useI18nStore } from "@/lib/stores/i18n";
import type { MapLocation, MapRegion, Pillar } from "@/types";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { cn, formatNumber } from "@/lib/utils";

const pillarColors: Record<string, string> = {
  environmental: "#10b981",
  social: "#3b82f6",
  governance: "#a855f7",
};

const regionColors: Record<MapRegion, string> = {
  east: "#f59e0b",
  west: "#60a5fa",
  bridge: "#f472b6",
  global: "#34d399",
};

const tierLabels: Record<string, { en: string; vi: string }> = {
  hub: { en: "Symbiosis Hub", vi: "Trung tâm Cộng sinh" },
  regional: { en: "Regional Node", vi: "Nút Vùng" },
  field: { en: "Field Site", vi: "Điểm Hiện trường" },
  partnership: { en: "Partnership", vi: "Đối tác" },
};

const corridorTypeColors: Record<string, string> = {
  humanitarian: "#fb7185",
  "hr-esg": "#60a5fa",
  ecological: "#34d399",
  education: "#fbbf24",
  governance: "#c084fc",
};

function markerSize(impact: number, tier: string) {
  const base = tier === "hub" ? 22 : tier === "regional" ? 18 : 14;
  return Math.round(base + (impact - 75) * 0.25);
}

function createMarkerIcon(loc: MapLocation, selected: boolean, dimmed: boolean) {
  const size = markerSize(loc.impactScore, loc.tier);
  const color = pillarColors[loc.pillar];
  const regionColor = regionColors[loc.region];
  const pulse =
    loc.tier === "hub"
      ? `<div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid ${color};opacity:0.5;animation:hubPulse 2s ease-out infinite;"></div>`
      : "";
  const ring = selected
    ? `box-shadow:0 0 0 3px ${color},0 0 24px ${color};`
    : `box-shadow:0 0 12px ${color}60;`;
  const opacity = dimmed ? 0.35 : 1;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;opacity:${opacity};transition:opacity 0.3s;">
        ${pulse}
        <div style="width:100%;height:100%;background:${color};border:3px solid ${regionColor};border-radius:50%;${ring}"></div>
        ${loc.tier === "hub" ? `<div style="position:absolute;top:-6px;right:-6px;width:10px;height:10px;background:#fbbf24;border:2px solid white;border-radius:50%;"></div>` : ""}
      </div>
      <style>@keyframes hubPulse{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}}</style>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyTo({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.5 });
  }, [lat, lng, zoom, map]);
  return null;
}

function FitBounds({ locations }: { locations: MapLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5 });
  }, [locations, map]);
  return null;
}

export type MapViewFilter = {
  pillar: Pillar;
  region: MapRegion | "all";
};

function filterLocations({ pillar, region }: MapViewFilter) {
  return mapLocations.filter((loc) => {
    const pillarMatch =
      pillar === "all" ||
      loc.pillar === pillar ||
      loc.pillars?.includes(pillar as Exclude<Pillar, "all">);
    const regionMatch = region === "all" || loc.region === region;
    return pillarMatch && regionMatch;
  });
}

function filterCorridors(visibleIds: Set<string>) {
  return symbiosisCorridors.filter(
    (c) => visibleIds.has(c.fromId) && visibleIds.has(c.toId)
  );
}

interface InitiativesMapProps {
  filter: MapViewFilter;
  selected: MapLocation | null;
  highlightedCorridorId: string | null;
  onSelect: (loc: MapLocation) => void;
  onCorridorHover?: (id: string | null) => void;
  className?: string;
}

export function InitiativesMap({
  filter,
  selected,
  highlightedCorridorId,
  onSelect,
  onCorridorHover,
  className,
}: InitiativesMapProps) {
  const [mounted, setMounted] = useState(false);
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const filtered = useMemo(() => filterLocations(filter), [filter]);
  const visibleIds = useMemo(() => new Set(filtered.map((l) => l.id)), [filtered]);
  const corridors = useMemo(() => filterCorridors(visibleIds), [visibleIds]);

  const connectedToSelected = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(
      symbiosisCorridors
        .filter((c) => c.fromId === selected.id || c.toId === selected.id)
        .map((c) => c.id)
    );
  }, [selected]);

  if (!mounted) {
    return <div className={cn("w-full h-full min-h-[420px] rounded-2xl bg-emerald-900/20 animate-pulse", className)} />;
  }

  return (
    <div className={cn("w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-white/10 z-0 relative", className)}>
      <MapContainer center={[35, 60]} zoom={3} className="w-full h-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {!selected && filtered.length > 1 && <FitBounds locations={filtered} />}
        {selected && <FlyTo lat={selected.lat} lng={selected.lng} zoom={selected.tier === "hub" ? 4 : 5} />}

        {corridors.map((corridor) => {
          const from = mapLocations.find((l) => l.id === corridor.fromId);
          const to = mapLocations.find((l) => l.id === corridor.toId);
          if (!from || !to) return null;

          const isActive =
            highlightedCorridorId === corridor.id ||
            connectedToSelected.has(corridor.id);
          const color = corridorTypeColors[corridor.type] ?? "#34d399";
          const weight = isActive ? 3.5 : 1.5;
          const opacity = isActive ? 0.9 : 0.35;

          return (
            <Polyline
              key={corridor.id}
              positions={corridorArc(from, to, corridor.type === "humanitarian" ? 0.22 : 0.15)}
              pathOptions={{
                color,
                weight,
                opacity,
                dashArray: isActive ? undefined : "6 8",
                lineCap: "round",
              }}
              eventHandlers={{
                mouseover: () => onCorridorHover?.(corridor.id),
                mouseout: () => onCorridorHover?.(null),
                click: () => {
                  const target = from.tier === "hub" ? to : from;
                  onSelect(target);
                },
              }}
            />
          );
        })}

        {filtered.map((loc) => {
          const dimmed =
            !!selected &&
            selected.id !== loc.id &&
            !loc.connections.includes(selected.id) &&
            !selected.connections.includes(loc.id);
          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createMarkerIcon(loc, selected?.id === loc.id, dimmed)}
              eventHandlers={{ click: () => onSelect(loc) }}
              zIndexOffset={loc.tier === "hub" ? 1000 : loc.impactScore}
            >
              <Popup>
                <div className="text-emerald-950 p-1 min-w-[160px]">
                  <strong className="block text-sm">{vi ? loc.nameVi : loc.name}</strong>
                  <span className="text-xs text-emerald-800/70">
                    {vi ? tierLabels[loc.tier].vi : tierLabels[loc.tier].en} · {loc.impactScore}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-3 left-3 z-[1000] flex flex-wrap gap-2 pointer-events-none">
        {Object.entries(corridorTypeColors).map(([type, color]) => (
          <span
            key={type}
            className="text-[9px] px-2 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/70 flex items-center gap-1.5"
          >
            <span className="w-2 h-0.5 rounded-full" style={{ background: color }} />
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LocationDetail({
  location,
  onClose,
  onSelectConnection,
}: {
  location: MapLocation;
  onClose: () => void;
  onSelectConnection?: (loc: MapLocation) => void;
}) {
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const linkedInitiatives = useMemo(
    () => initiatives.filter((i) => location.initiativeIds.includes(i.id)),
    [location.initiativeIds]
  );

  const connectedLocations = useMemo(
    () =>
      location.connections
        .map((id) => mapLocations.find((l) => l.id === id))
        .filter(Boolean) as MapLocation[],
    [location.connections]
  );

  const activeCorridors = useMemo(
    () =>
      symbiosisCorridors.filter(
        (c) => c.fromId === location.id || c.toId === location.id
      ),
    [location.id]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-2xl"
      role="dialog"
      aria-label={vi ? location.nameVi : location.name}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge
              variant={
                location.pillar === "environmental"
                  ? "default"
                  : location.pillar === "social"
                    ? "social"
                    : "governance"
              }
            >
              {location.pillar}
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              {vi ? tierLabels[location.tier].vi : tierLabels[location.tier].en}
            </Badge>
            <Badge
              variant="outline"
              style={{ borderColor: `${regionColors[location.region]}50`, color: regionColors[location.region] }}
            >
              {location.region === "east" ? (vi ? "Đông" : "East") : location.region === "west" ? (vi ? "Tây" : "West") : location.region === "bridge" ? (vi ? "Cầu nối" : "Bridge") : "Global"}
            </Badge>
            <span className="text-xs text-white/40">{location.year}</span>
          </div>
          <h3 className="font-serif text-xl text-white">{vi ? location.nameVi : location.name}</h3>
        </div>
        <div className="flex items-start gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-wider">
              {vi ? "Điểm Tác động" : "Impact Score"}
            </p>
            <p className="text-3xl font-serif text-amber-400 tabular-nums">{location.impactScore}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            aria-label={vi ? "Đóng" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-white/70 mb-5 leading-relaxed">
        {vi ? location.descriptionVi : location.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {location.metrics.map((m) => (
          <div key={m.label} className="luxury-stat rounded-xl p-3 text-center">
            <p className="text-lg font-semibold text-emerald-400">{m.value}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">
              {vi ? m.labelVi : m.label}
            </p>
          </div>
        ))}
      </div>

      {location.reach && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {location.reach.beneficiaries != null && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
              <Users className="h-4 w-4 text-blue-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white tabular-nums">
                  <AnimatedCounter value={location.reach.beneficiaries} />
                </p>
                <p className="text-[9px] text-white/40 uppercase">{vi ? "Người hưởng lợi" : "Beneficiaries"}</p>
              </div>
            </div>
          )}
          {location.reach.investmentRmb != null && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
              <Globe2 className="h-4 w-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">¥{formatNumber(location.reach.investmentRmb)}</p>
                <p className="text-[9px] text-white/40 uppercase">{vi ? "Đầu tư RMB" : "Investment RMB"}</p>
              </div>
            </div>
          )}
          {location.reach.carbonTco2e != null && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
              <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white tabular-nums">
                  <AnimatedCounter value={location.reach.carbonTco2e} suffix=" t" />
                </p>
                <p className="text-[9px] text-white/40 uppercase">CO₂e</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeCorridors.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Link2 className="h-3 w-3" />
            {vi ? "Hành lang Cộng sinh" : "Symbiosis Corridors"}
          </p>
          <div className="space-y-2">
            {activeCorridors.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="min-w-0">
                  <p className="text-xs text-white/80 truncate">{vi ? c.labelVi : c.label}</p>
                  <p className="text-[9px] text-white/40">{formatNumber(c.distanceKm)} km · {c.type}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${c.strength * 100}%`,
                        background: corridorTypeColors[c.type],
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/60 tabular-nums w-8 text-right">
                    {Math.round(c.strength * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {connectedLocations.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {vi ? "Kết nối Mạng" : "Network Connections"}
          </p>
          <div className="flex flex-wrap gap-2">
            {connectedLocations.map((conn) => (
              <button
                key={conn.id}
                onClick={() => onSelectConnection?.(conn)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:text-emerald-400 text-white/70 transition-colors flex items-center gap-1.5"
              >
                {vi ? conn.nameVi : conn.name}
                <ArrowRight className="h-3 w-3 opacity-50" />
              </button>
            ))}
          </div>
        </div>
      )}

      {linkedInitiatives.length > 0 && (
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
            {vi ? "Sáng kiến Liên kết" : "Linked Initiatives"}
          </p>
          <div className="flex flex-wrap gap-2">
            {linkedInitiatives.map((init) => (
              <a
                key={init.id}
                href={`#initiatives`}
                className="text-xs px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/15 transition-colors"
              >
                {vi ? init.titleVi : init.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function MapFilters({
  filter,
  onFilter,
}: {
  filter: MapViewFilter;
  onFilter: (f: MapViewFilter) => void;
}) {
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  const pillars: { value: Pillar; label: string; labelVi: string }[] = [
    { value: "all", label: "All Pillars", labelVi: "Tất cả Trụ cột" },
    { value: "environmental", label: "Environmental", labelVi: "Môi trường" },
    { value: "social", label: "Social", labelVi: "Xã hội" },
    { value: "governance", label: "Governance", labelVi: "Quản trị" },
  ];

  const regions: { value: MapRegion | "all"; label: string; labelVi: string }[] = [
    { value: "all", label: "All Regions", labelVi: "Tất cả Vùng" },
    { value: "east", label: "East", labelVi: "Đông" },
    { value: "west", label: "West", labelVi: "Tây" },
    { value: "bridge", label: "Bridge", labelVi: "Cầu nối" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Pillar filters">
        {pillars.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilter({ ...filter, pillar: f.value })}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs transition-all",
              filter.pillar === f.value
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
            )}
          >
            {vi ? f.labelVi : f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Region filters">
        {regions.map((r) => (
          <button
            key={r.value}
            onClick={() => onFilter({ ...filter, region: r.value })}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs transition-all",
              filter.region === r.value
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
            )}
          >
            {vi ? r.labelVi : r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LocationCard({
  location,
  selected,
  onSelect,
}: {
  location: MapLocation;
  selected: boolean;
  onSelect: () => void;
}) {
  const language = useI18nStore((s) => s.language);
  const vi = language === "vi";

  return (
    <motion.button
      layout
      onClick={onSelect}
      className={cn(
        "text-left w-full p-4 rounded-2xl border transition-all duration-300",
        selected
          ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.12)]"
          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: pillarColors[location.pillar] }}
          />
          <span className="text-[9px] uppercase tracking-wider text-white/40 truncate">
            {vi ? tierLabels[location.tier].vi : tierLabels[location.tier].en}
          </span>
        </div>
        <span className="text-sm font-serif text-amber-400 tabular-nums shrink-0">
          {location.impactScore}
        </span>
      </div>
      <p className="text-sm font-medium text-white/90 line-clamp-2 mb-1">
        {vi ? location.nameVi : location.name}
      </p>
      <p className="text-[10px] text-white/40 line-clamp-2">
        {vi ? location.descriptionVi : location.description}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span
          className="text-[9px] px-2 py-0.5 rounded-full"
          style={{
            background: `${regionColors[location.region]}20`,
            color: regionColors[location.region],
          }}
        >
          {location.region}
        </span>
        <span className="text-[9px] text-white/30">
          {location.connections.length} {vi ? "kết nối" : "links"}
        </span>
      </div>
    </motion.button>
  );
}