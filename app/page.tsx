import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { HomeSections } from "@/components/page/home-sections";
import { SiteAssistant } from "@/components/common/site-assistant";
import { SkipLink } from "@/components/layout/skip-link";

export default function Home() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HomeSections />
      </main>
      <Footer />
      <SiteAssistant />
    </>
  );
}