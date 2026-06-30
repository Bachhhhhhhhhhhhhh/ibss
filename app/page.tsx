import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SectionDivider } from "@/components/common/section-divider";
import { HeroSection } from "@/components/sections/hero";
import { DashboardSection } from "@/components/sections/dashboard";
import { HuiguiBuildingSection } from "@/components/sections/huigui-building";
import { ModelLabSection } from "@/components/sections/model-lab";
import { GlobalMapSection } from "@/components/sections/global-map";
import { InitiativesSection } from "@/components/sections/initiatives";
import { StrategyLabSection } from "@/components/sections/strategy-lab";
import { CompetitionHubSection } from "@/components/sections/competition-hub";
import { AiDisclosureSection } from "@/components/sections/ai-disclosure";
import { CreatorSection } from "@/components/sections/creator";
import { SiteAssistant } from "@/components/common/site-assistant";
import { SkipLink } from "@/components/layout/skip-link";

export default function Home() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <SectionDivider />
        <DashboardSection />
        <SectionDivider />
        <HuiguiBuildingSection />
        <SectionDivider />
        <ModelLabSection />
        <SectionDivider />
        <GlobalMapSection />
        <SectionDivider />
        <InitiativesSection />
        <SectionDivider />
        <StrategyLabSection />
        <SectionDivider />
        <CompetitionHubSection />
        <SectionDivider />
        <CreatorSection />
        <AiDisclosureSection />
      </main>
      <Footer />
      <SiteAssistant />
    </>
  );
}