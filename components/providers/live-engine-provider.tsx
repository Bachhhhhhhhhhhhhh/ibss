"use client";

import { useLiveEngine } from "@/lib/hooks/use-live-engine";

export function LiveEngineProvider({ children }: { children: React.ReactNode }) {
  useLiveEngine();
  return <>{children}</>;
}