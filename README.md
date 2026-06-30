# Symbiosis Nexus 2026

**Live site:** [https://bachhhhhhhhhhhhhh.github.io/ibss/](https://bachhhhhhhhhhhhhh.github.io/ibss/)

> GitHub repo chỉ lưu code. Website chạy tại link trên (GitHub Pages), không phải trang repo.

A premium interactive digital ESG strategy experience for the **2026 IBSS Bridging East and West Business Case Competition**, themed around **Engma Group's Symbiosis Philosophy and Global ESG Strategy**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

- **Live Symbiosis Engine** — Real-time KPI counters, activity feed, animated charts, simulation speed controls
- **Interactive 3D Huigui Building** — Three.js model with clickable hotspots
- **Global Initiatives Map** — Leaflet map with East-West initiative pins
- **19 ESG Initiatives** — Searchable, filterable deep-dive cards with accurate case data
- **Strategy Lab** — Advanced ESG simulator with scenario saving, comparison, and multi-page PDF export
- **Competition Hub** — Live countdown to July 15, 2026 20:00 Beijing Time, scoring criteria
- **Dark / Light Mode** — Premium emerald aesthetic (dark default) with smooth theme transitions
- **Bilingual** — English / Vietnamese toggle in navbar
- **PDF Reports** — 4-page professional reports via `@react-pdf/renderer` with QR code and watermark
- **Built with Intention** — Creator section (Truong The Bach)

## Tech Stack

- Next.js 16 + TypeScript (App Router)
- Tailwind CSS v4 + shadcn/ui patterns + Radix UI
- Framer Motion, Recharts
- Three.js (@react-three/fiber + drei)
- Leaflet + react-leaflet
- Zustand (persist middleware for scenario saving)
- @react-pdf/renderer + qrcode
- next-themes (Dark/Light mode)
- date-fns, lenis

## Getting Started

### Prerequisites

- Node.js 20 LTS (recommended)
- npm 9+

### Install & Run

```bash
cd symbiosis-nexus-2026
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Strategy Lab — Scenario Management

1. Adjust sliders for Renewable Energy, Supplier Engagement, Community Budget, Green Talent, and Circular Office
2. Click **Save Current Scenario** to name and store configurations in localStorage
3. Use **Load Scenario** to restore sliders, charts, and recommendations instantly
4. **Compare Scenarios** — side-by-side table of up to 4 saved strategies
5. **Export Beautiful PDF Report** — 4-page emerald-themed report with:
   - Cover page with key metrics and QR code
   - Simulator inputs and results tables
   - Projected impact pathway
   - Strategic recommendations and disclaimer footer
   - Subtle watermark on every page

Saved scenarios persist across browser sessions via Zustand `persist` middleware.

## Deploy to Vercel

1. Push this repository to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no extra configuration needed

```bash
npm i -g vercel
vercel
```

No environment variables required. The app runs client-side with simulated live data and localStorage scenario storage.

## Project Structure

```
symbiosis-nexus-2026/
├── app/                    # Next.js App Router pages & layout
├── components/
│   ├── common/             # Shared UI, theme toggle, counters
│   ├── dashboard/          # Live dashboard widgets
│   ├── layout/             # Navbar, footer, scroll progress
│   ├── map/                # Leaflet map components
│   ├── providers/          # Theme, live engine, experience providers
│   ├── sections/           # Page sections (hero, dashboard, strategy lab, etc.)
│   ├── strategy/           # Scenario manager & compare views
│   ├── three/              # Three.js 3D scenes
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── data/               # Static ESG & competition data
│   ├── hooks/              # Custom React hooks
│   ├── pdf/                # @react-pdf/renderer report documents
│   ├── stores/             # Zustand state stores (i18n, strategy, metrics)
│   └── strategy/           # Projection calculations
└── types/                  # TypeScript definitions
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus initiative search |
| Navbar | Toggle simulation speed (Normal → Fast → Paused) |
| Navbar | Toggle EN / VI language |
| Navbar | Toggle Dark / Light theme |

## Data Sources

All metrics sourced from official Engma Group case materials and IBSS 2026 guidelines:

- Huigui Building: 15% energy reduction, 20% water saving, 200m³ rainwater tank
- SBTi validated May 2025: Scope 1+2 -20%, Scope 3 -30% by 2030, 100% renewable by 2030
- Firefly release: 2,000 adults + 500 larvae (July 2025)
- EngmaIntec Minqin planting: RMB 6,000 first phase
- All 19 official ESG initiatives from the Engma ESG Case Collection

Strategy Lab projections are original analytical extensions aligned with the symbiosis philosophy.

## Disclaimer

This is an interactive exploration tool inspired by the 2026 IBSS case materials. Not an official competition submission.

## License

Educational & competition use. © 2026 Symbiosis Nexus.
