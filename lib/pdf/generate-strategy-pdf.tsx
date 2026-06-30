"use client";


import type { StrategySliders } from "@/types";
import {
  buildProjectionData,
  buildRecommendations,
  netZeroYear,
  projectedScore2030,
} from "@/lib/strategy/calculations";
import type { StrategyReportData } from "@/lib/pdf/strategy-report-document";

export async function generateStrategyPdf(options: {
  sliders: StrategySliders;
  language: "en" | "vi";
  scenarioName?: string;
}) {
  const { sliders, language, scenarioName } = options;
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://symbiosis-nexus-2026.vercel.app";

  const [{ default: QRCode }, { pdf }, { StrategyReportDocument }] = await Promise.all([
    import("qrcode"),
    import("@react-pdf/renderer"),
    import("@/lib/pdf/strategy-report-document"),
  ]);

  const qrDataUrl = await QRCode.toDataURL(siteUrl, {
    width: 200,
    margin: 1,
    color: { dark: "#052e16", light: "#ffffff" },
  });

  const reportData: StrategyReportData = {
    sliders,
    projectedScore: projectedScore2030(sliders),
    netZeroYear: netZeroYear(sliders),
    recommendations: buildRecommendations(sliders, language),
    projectionData: buildProjectionData(sliders),
    generatedAt: new Date().toISOString(),
    language,
    qrDataUrl,
    siteUrl,
    scenarioName,
  };

  const blob = await pdf(<StrategyReportDocument data={reportData} />).toBlob();

  const dateStamp = new Date().toISOString().slice(0, 10);
  const filename = `Symbiosis_Strategy_Snapshot_${dateStamp}.pdf`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}