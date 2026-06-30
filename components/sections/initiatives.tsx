"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { GlowCard } from "@/components/common/glow-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { initiatives } from "@/lib/data/initiatives";
import { useI18nStore } from "@/lib/stores/i18n";
import type { Pillar } from "@/types";
import { cn } from "@/lib/utils";

export function InitiativesSection() {
  const [search, setSearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState<Pillar>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const language = useI18nStore((s) => s.language);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    return initiatives.filter((init) => {
      const matchPillar = pillarFilter === "all" || init.pillar === pillarFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        init.title.toLowerCase().includes(q) ||
        init.titleVi.toLowerCase().includes(q) ||
        init.shortDescription.toLowerCase().includes(q);
      return matchPillar && matchSearch;
    });
  }, [search, pillarFilter]);

  const selectedInit = initiatives.find((i) => i.id === selected);
  const SelectedIcon = selectedInit
    ? (LucideIcons[selectedInit.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : null;

  const pillarBadge = (p: string) => {
    if (p === "environmental") return "default";
    if (p === "social") return "social";
    return "governance";
  };

  return (
    <SectionWrapper
      id="initiatives"
      sectionNumber="05"
      eyebrow={language === "en" ? "Case Collection" : "Bộ Case"}
      title={language === "en" ? "19 ESG Initiatives" : "19 Sáng kiến ESG"}
      subtitle={language === "en" ? "Every pillar. Every proof point. Faithfully drawn from Engma's official sustainability archive" : "Mọi trụ cột. Mọi bằng chứng. Trích từ kho lưu trữ bền vững chính thức của Engma"}
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            ref={searchRef}
            placeholder={language === "en" ? "Search initiatives... (press /)" : "Tìm sáng kiến... (nhấn /)"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search initiatives"
          />
        </div>
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Pillar filter">
          {(["all", "environmental", "social", "governance"] as Pillar[]).map((p) => (
            <button
              key={p}
              onClick={() => setPillarFilter(p)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs transition-all capitalize",
                pillarFilter === p ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              {p === "all" ? (language === "en" ? "All" : "Tất cả") : p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((init, i) => {
          const Icon = LucideIcons[init.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
          return (
            <motion.div
              key={init.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
            >
              <GlowCard className="h-full cursor-pointer" glowColor="rgba(16,185,129,0.1)">
                <div className="p-6 flex flex-col h-full" onClick={() => setSelected(init.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setSelected(init.id)}>
                  <div className="flex items-start justify-between mb-4">
                    {Icon && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <Badge variant={pillarBadge(init.pillar) as "default" | "social" | "governance"}>{init.pillar}</Badge>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{language === "en" ? init.title : init.titleVi}</h3>
                  <p className="text-sm text-emerald-400 mb-3 font-medium">{language === "en" ? init.keyMetric : init.keyMetricVi}</p>
                  <p className="text-sm text-white/50 flex-1">{language === "en" ? init.shortDescription : init.shortDescriptionVi}</p>
                  <Button variant="ghost" size="sm" className="mt-4 self-start">
                    {language === "en" ? "View Details" : "Xem chi tiết"} →
                  </Button>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          {selectedInit && (
            <>
              <div className="flex items-center gap-3 mb-2">
                {SelectedIcon && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <SelectedIcon className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <DialogTitle>{language === "en" ? selectedInit.title : selectedInit.titleVi}</DialogTitle>
                  <DialogDescription className="mt-1">
                    {selectedInit.year} • {language === "en" ? selectedInit.impactType : selectedInit.impactTypeVi}
                  </DialogDescription>
                </div>
              </div>
              <p className="text-emerald-400 font-medium text-lg mb-4">
                {language === "en" ? selectedInit.keyMetric : selectedInit.keyMetricVi}
              </p>
              <p className="text-white/70 leading-relaxed">
                {language === "en" ? selectedInit.fullDescription : selectedInit.fullDescriptionVi}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
}