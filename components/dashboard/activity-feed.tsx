"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle, Info, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLiveMetricsStore } from "@/lib/stores/live-metrics";
import { useI18nStore } from "@/lib/stores/i18n";
import { format } from "date-fns";
import type { LiveEvent } from "@/types";
import { cn } from "@/lib/utils";

const typeIcons = {
  info: Info,
  success: CheckCircle,
  milestone: Star,
};

const typeColors = {
  info: "text-blue-400 bg-blue-500/10",
  success: "text-emerald-400 bg-emerald-500/10",
  milestone: "text-amber-400 bg-amber-500/10",
};

function EventItem({ event, lang }: { event: LiveEvent; lang: "en" | "vi" }) {
  const Icon = typeIcons[event.type];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className={cn("p-1.5 rounded-lg shrink-0 h-fit", typeColors[event.type])}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-white/80 leading-relaxed">{lang === "en" ? event.message : event.messageVi}</p>
        <time className="text-xs text-white/30 mt-1 block" dateTime={event.timestamp.toISOString()}>
          {format(event.timestamp, "HH:mm:ss")}
        </time>
      </div>
    </motion.div>
  );
}

export function ActivityFeed() {
  const events = useLiveMetricsStore((s) => s.events);
  const language = useI18nStore((s) => s.language);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4 text-emerald-400" />
          {language === "en" ? "Live Activity Feed" : "Nhật ký Hoạt động"}
          <span className="ml-auto flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-thin" role="log" aria-live="polite" aria-label="Live activity feed">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <EventItem key={event.id} event={event} lang={language} />
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}