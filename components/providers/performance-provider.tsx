"use client";

import { useEffect } from "react";
import { usePerformanceStore } from "@/lib/stores/performance";

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const init = usePerformanceStore((s) => s.init);
  const initialized = usePerformanceStore((s) => s.initialized);

  useEffect(() => {
    if (!initialized) init();
  }, [init, initialized]);

  return <>{children}</>;
}