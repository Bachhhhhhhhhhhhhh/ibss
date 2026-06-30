type ProgressFn = (pct: number, label?: string) => void;

const CRITICAL_CHUNKS = [
  { label: "3D Engine", load: () => import("@/components/three/hero-particles") },
  { label: "Live Metrics", load: () => import("@/lib/stores/live-metrics") },
  { label: "Dashboard", load: () => import("@/components/sections/dashboard") },
  { label: "Quant Engine", load: () => import("@/lib/quant/engine") },
  { label: "Experience", load: () => import("@/components/common/ambient-background") },
] as const;

export async function preloadCriticalAssets(onProgress: ProgressFn): Promise<void> {
  const total = CRITICAL_CHUNKS.length;
  let done = 0;

  onProgress(2, "Initializing");

  await Promise.all(
    CRITICAL_CHUNKS.map(async (chunk) => {
      try {
        await chunk.load();
      } catch {
        /* non-fatal — offline or chunk unavailable */
      }
      done++;
      onProgress(Math.round(8 + (done / total) * 88), chunk.label);
    })
  );

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  onProgress(100, "Ready");
}