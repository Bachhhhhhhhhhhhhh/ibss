"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = () => null;

export const ModelComponents: Record<string, ComponentType<object>> = {
  "huigui-twin": dynamic(
    () => import("@/components/three/models/huigui-megastructure").then((m) => ({ default: m.HuiguiMegastructure })),
    { ssr: false, loading }
  ),
  "esg-globe": dynamic(
    () => import("@/components/three/models/esg-globe").then((m) => ({ default: m.EsgGlobe })),
    { ssr: false, loading }
  ),
  "carbon-lattice": dynamic(
    () => import("@/components/three/models/carbon-lattice").then((m) => ({ default: m.CarbonLattice })),
    { ssr: false, loading }
  ),
  mycorrhizal: dynamic(
    () => import("@/components/three/models/mycorrhizal-network").then((m) => ({ default: m.MycorrhizalNetwork })),
    { ssr: false, loading }
  ),
  "smart-grid": dynamic(
    () => import("@/components/three/models/smart-grid-city").then((m) => ({ default: m.SmartGridCity })),
    { ssr: false, loading }
  ),
  "hydro-loop": dynamic(
    () => import("@/components/three/models/hydro-loop").then((m) => ({ default: m.HydroLoop })),
    { ssr: false, loading }
  ),
  "rice-fractal": dynamic(
    () => import("@/components/three/models/rice-fractal").then((m) => ({ default: m.RiceFractal })),
    { ssr: false, loading }
  ),
  "biodiversity-helix": dynamic(
    () => import("@/components/three/models/biodiversity-helix").then((m) => ({ default: m.BiodiversityHelix })),
    { ssr: false, loading }
  ),
  "quant-engine": dynamic(
    () => import("@/components/three/models/quant-landscape").then((m) => ({ default: m.QuantLandscape })),
    { ssr: false, loading }
  ),
  "prediction-oracle": dynamic(
    () => import("@/components/three/models/prediction-wave").then((m) => ({ default: m.PredictionWave })),
    { ssr: false, loading }
  ),
  "intel-nexus": dynamic(
    () => import("@/components/three/models/intel-nexus").then((m) => ({ default: m.IntelNexus })),
    { ssr: false, loading }
  ),
};