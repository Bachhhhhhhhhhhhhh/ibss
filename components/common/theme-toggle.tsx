"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const language = useI18nStore((s) => s.language);

  const isDark = (resolvedTheme ?? theme ?? "dark") === "dark";
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
          suppressHydrationWarning
          className={cn(
            "rounded-xl border border-white/8 hover:border-emerald-500/30 transition-colors duration-500",
            "light:border-emerald-900/15 light:hover:border-emerald-600/30"
          )}
        >
          <span suppressHydrationWarning>
            {isDark ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-emerald-600" />
            )}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}