"use client";

import { useEffect, useRef } from "react";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useSimulationStore } from "@/lib/stores/simulation";
import { easeOutCubic, lerp } from "@/lib/utils";
import type { LiveMetrics } from "@/types";

function interpolateMetrics(from: LiveMetrics, to: LiveMetrics, t: number): LiveMetrics {
  const eased = easeOutCubic(t);
  return {
    symbiosisScore: lerp(from.symbiosisScore, to.symbiosisScore, eased),
    symbiosisDelta: to.symbiosisDelta,
    co2AvoidedTonnes: lerp(from.co2AvoidedTonnes, to.co2AvoidedTonnes, eased),
    treesPlantedMonth: Math.round(lerp(from.treesPlantedMonth, to.treesPlantedMonth, eased)),
    waterSavedTodayLitres: Math.round(lerp(from.waterSavedTodayLitres, to.waterSavedTodayLitres, eased)),
    renewablePercent: lerp(from.renewablePercent, to.renewablePercent, eased),
    supplierSbtiAdoption: Math.round(lerp(from.supplierSbtiAdoption, to.supplierSbtiAdoption, eased)),
    firefliesActive: Math.round(lerp(from.firefliesActive, to.firefliesActive, eased)),
    energyReductionPercent: to.energyReductionPercent,
    scope1Progress: lerp(from.scope1Progress, to.scope1Progress, eased),
    scope2Progress: lerp(from.scope2Progress, to.scope2Progress, eased),
    scope3Progress: lerp(from.scope3Progress, to.scope3Progress, eased),
    employeeCo2OffsetKg: Math.round(lerp(from.employeeCo2OffsetKg, to.employeeCo2OffsetKg, eased)),
  };
}

export function useLiveEngine() {
  const tickMetrics = useLiveMetricsStore((s) => s.tickMetrics);
  const addEvent = useLiveMetricsStore((s) => s.addEvent);
  const updateChart = useLiveMetricsStore((s) => s.updateChart);
  const metrics = useLiveMetricsStore((s) => s.metrics);
  const setDisplayMetrics = useLiveMetricsStore((s) => s.setDisplayMetrics);
  const getMultiplier = useSimulationStore((s) => s.getMultiplier);
  const speed = useSimulationStore((s) => s.speed);

  const animRef = useRef<number>(0);
  const fromRef = useRef<LiveMetrics>(metrics);
  const startRef = useRef(0);

  // Animate only when metrics change — stops RAF when done (fixes constant re-renders)
  useEffect(() => {
    fromRef.current = useLiveMetricsStore.getState().displayMetrics;
    startRef.current = performance.now();
    cancelAnimationFrame(animRef.current);

    const duration = 1200;

    const step = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      const interpolated = interpolateMetrics(fromRef.current, metrics, t);
      setDisplayMetrics(interpolated);

      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [metrics, setDisplayMetrics]);

  useEffect(() => {
    if (speed === "pause") return;

    const multiplier = getMultiplier();
    const metricInterval = Math.max(4000, (6000 + Math.random() * 4000) / multiplier);
    const eventInterval = Math.max(12000, (15000 + Math.random() * 5000) / multiplier);
    const chartInterval = Math.max(10000, 12000 / multiplier);

    const metricTimer = setInterval(tickMetrics, metricInterval);
    const eventTimer = setInterval(addEvent, eventInterval);
    const chartTimer = setInterval(updateChart, chartInterval);

    return () => {
      clearInterval(metricTimer);
      clearInterval(eventTimer);
      clearInterval(chartTimer);
    };
  }, [speed, tickMetrics, addEvent, updateChart, getMultiplier]);
}