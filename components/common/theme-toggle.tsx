"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const language = useI18nStore((s) => s.language);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl border border-white/8 min-w-[2.5rem]"
        aria-hidden
      >
        <Sun className="h-3.5 w-3.5 opacity-0" />
      </Button>
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark";
  const label =
    language === "en"
      ? isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
      : isDark
        ? "Chuyển sang chế độ sáng"
        : "Chuyển sang chế độ tối";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={label}
          className={cn(
            "rounded-xl border border-white/8 hover:border-emerald-500/30 transition-colors duration-500",
            "light:border-emerald-900/15 light:hover:border-emerald-600/30"
          )}
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-emerald-600" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}