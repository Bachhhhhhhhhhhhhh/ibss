import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, EB_Garamond } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LiveEngineProvider } from "@/components/providers/live-engine-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AmbientBackground } from "@/components/common/ambient-background";
import { ExperienceProvider } from "@/components/providers/experience-provider";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Symbiosis Nexus 2026 | Engma Group ESG Strategy Experience",
  description:
    "An award-caliber interactive digital ESG strategy experience for the 2026 IBSS Bridging East and West Business Case Competition.",
  keywords: ["ESG", "Symbiosis", "Engma Group", "IBSS 2026", "Huigui Building", "Sustainability"],
  authors: [{ name: "Symbiosis Nexus Team" }],
  openGraph: {
    title: "Symbiosis Nexus 2026",
    description: "Crafting Engma Group's Global ESG Future",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#021a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${ebGaramond.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased grain-overlay theme-transition">
        <ThemeProvider>
          <AmbientBackground />
          <div className="relative z-[1]">
            <TooltipProvider delayDuration={200}>
              <ExperienceProvider>
                <LiveEngineProvider>{children}</LiveEngineProvider>
              </ExperienceProvider>
            </TooltipProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}