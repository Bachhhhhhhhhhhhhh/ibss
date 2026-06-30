"use client";

import { Preloader } from "@/components/common/preloader";
import { CustomCursor } from "@/components/common/custom-cursor";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { LofiPlayer } from "@/components/common/lofi-player";
import { QuickStartGuide } from "@/components/common/quick-start-guide";

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <LofiPlayer />
      <QuickStartGuide />
      {children}
    </SmoothScroll>
  );
}