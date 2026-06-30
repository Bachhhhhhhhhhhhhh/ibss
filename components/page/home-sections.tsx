"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";
import { SectionDivider } from "@/components/common/section-divider";
import { LazySection } from "@/components/common/lazy-section";
import { SectionSkeleton } from "@/components/common/section-skeleton";

const DashboardSection = dynamic(
  () => import("@/components/sections/dashboard").then((m) => ({ default: m.DashboardSection })),
  { loading: () => <SectionSkeleton /> }
);
const HuiguiBuildingSection = dynamic(
  () => import("@/components/sections/huigui-building").then((m) => ({ default: m.HuiguiBuildingSection })),
  { loading: () => <SectionSkeleton /> }
);
const ModelLabSection = dynamic(
  () => import("@/components/sections/model-lab").then((m) => ({ default: m.ModelLabSection })),
  { loading: () => <SectionSkeleton /> }
);
const GlobalMapSection = dynamic(
  () => import("@/components/sections/global-map").then((m) => ({ default: m.GlobalMapSection })),
  { loading: () => <SectionSkeleton /> }
);
const InitiativesSection = dynamic(
  () => import("@/components/sections/initiatives").then((m) => ({ default: m.InitiativesSection })),
  { loading: () => <SectionSkeleton /> }
);
const StrategyLabSection = dynamic(
  () => import("@/components/sections/strategy-lab").then((m) => ({ default: m.StrategyLabSection })),
  { loading: () => <SectionSkeleton /> }
);
const CompetitionHubSection = dynamic(
  () => import("@/components/sections/competition-hub").then((m) => ({ default: m.CompetitionHubSection })),
  { loading: () => <SectionSkeleton /> }
);
const CreatorSection = dynamic(
  () => import("@/components/sections/creator").then((m) => ({ default: m.CreatorSection })),
  { loading: () => <SectionSkeleton /> }
);
const AiDisclosureSection = dynamic(
  () => import("@/components/sections/ai-disclosure").then((m) => ({ default: m.AiDisclosureSection })),
  { loading: () => <SectionSkeleton /> }
);

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <LazySection id="dashboard-lazy" priority rootMargin="800px 0px">
        <DashboardSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="600px 0px">
        <HuiguiBuildingSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="500px 0px">
        <ModelLabSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="500px 0px">
        <GlobalMapSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="400px 0px">
        <InitiativesSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="400px 0px">
        <StrategyLabSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="300px 0px">
        <CompetitionHubSection />
      </LazySection>
      <SectionDivider />
      <LazySection rootMargin="300px 0px">
        <CreatorSection />
      </LazySection>
      <LazySection rootMargin="200px 0px" minHeight="">
        <AiDisclosureSection />
      </LazySection>
    </>
  );
}