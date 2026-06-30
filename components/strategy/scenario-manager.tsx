"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Save,
  FolderOpen,
  Pencil,
  Trash2,
  GitCompare,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStrategyStore } from "@/lib/stores/strategy";
import { useI18nStore } from "@/lib/stores/i18n";
import { ScenarioCompare } from "@/components/strategy/scenario-compare";
import { cn } from "@/lib/utils";

export function ScenarioManager() {
  const language = useI18nStore((s) => s.language);
  const savedScenarios = useStrategyStore((s) => s.savedScenarios);
  const loadedScenarioId = useStrategyStore((s) => s.loadedScenarioId);
  const saveScenario = useStrategyStore((s) => s.saveScenario);
  const loadScenario = useStrategyStore((s) => s.loadScenario);
  const renameScenario = useStrategyStore((s) => s.renameScenario);
  const deleteScenario = useStrategyStore((s) => s.deleteScenario);
  const clearLoadedScenario = useStrategyStore((s) => s.clearLoadedScenario);

  const [saveOpen, setSaveOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [justLoaded, setJustLoaded] = useState<string | null>(null);

  const loadedScenario = savedScenarios.find((s) => s.id === loadedScenarioId);

  const handleSave = () => {
    const id = saveScenario(scenarioName);
    if (id) {
      setScenarioName("");
      setSaveOpen(false);
      setJustLoaded(id);
      setTimeout(() => setJustLoaded(null), 3000);
    }
  };

  const handleLoad = (id: string) => {
    loadScenario(id);
    setJustLoaded(id);
    setLoadOpen(false);
    setTimeout(() => setJustLoaded(null), 3000);
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      renameScenario(id, editName);
      setEditingId(null);
      setEditName("");
    }
  };

  const t = {
    save: language === "en" ? "Save Current Scenario" : "Lưu Kịch bản Hiện tại",
    load: language === "en" ? "Load Scenario" : "Tải Kịch bản",
    compare: language === "en" ? "Compare Scenarios" : "So sánh Kịch bản",
    saveTitle: language === "en" ? "Name Your Scenario" : "Đặt tên Kịch bản",
    saveDesc:
      language === "en"
        ? "Give this strategy configuration a memorable name for later comparison."
        : "Đặt tên cho cấu hình chiến lược này để so sánh sau.",
    loadTitle: language === "en" ? "Saved Scenarios" : "Kịch bản Đã lưu",
    loadDesc:
      language === "en"
        ? `${savedScenarios.length} scenario${savedScenarios.length !== 1 ? "s" : ""} stored locally`
        : `${savedScenarios.length} kịch bản lưu cục bộ`,
    placeholder: language === "en" ? "e.g. Aggressive Net-Zero 2045" : "vd. Net-Zero Mạnh 2045",
    loaded: language === "en" ? "Scenario loaded" : "Đã tải kịch bản",
    active: language === "en" ? "Active scenario" : "Kịch bản đang dùng",
    empty:
      language === "en"
        ? "No saved scenarios yet. Adjust sliders and save your first strategy."
        : "Chưa có kịch bản. Điều chỉnh thanh trượt và lưu chiến lược đầu tiên.",
    rename: language === "en" ? "Rename" : "Đổi tên",
    delete: language === "en" ? "Delete" : "Xóa",
    loadBtn: language === "en" ? "Load" : "Tải",
    score: language === "en" ? "Score" : "Điểm",
    nz: language === "en" ? "Net-Zero" : "Net-Zero",
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {(loadedScenario || justLoaded) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10"
          >
            <div className="flex items-center gap-2 text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                {t.loaded}: <strong className="text-emerald-200">{loadedScenario?.name}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={clearLoadedScenario}
              className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              aria-label={language === "en" ? "Dismiss" : "Đóng"}
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Save className="h-4 w-4" />
              {t.save}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>{t.saveTitle}</DialogTitle>
            <DialogDescription>{t.saveDesc}</DialogDescription>
            <Input
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              placeholder={t.placeholder}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="mt-4"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setSaveOpen(false)}>
                {language === "en" ? "Cancel" : "Hủy"}
              </Button>
              <Button onClick={handleSave} disabled={!scenarioName.trim()}>
                <Save className="h-4 w-4" />
                {language === "en" ? "Save" : "Lưu"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={loadOpen} onOpenChange={setLoadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl" disabled={savedScenarios.length === 0}>
              <FolderOpen className="h-4 w-4" />
              {t.load}
              {savedScenarios.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-mono">
                  {savedScenarios.length}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{t.loadTitle}</DialogTitle>
            <DialogDescription>{t.loadDesc}</DialogDescription>
            <div className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto">
              {savedScenarios.length === 0 ? (
                <p className="text-sm text-white/50 py-8 text-center">{t.empty}</p>
              ) : (
                savedScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border transition-colors",
                      loadedScenarioId === scenario.id
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      {editingId === scenario.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleRename(scenario.id)}
                            className="h-9"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => handleRename(scenario.id)}>
                            {language === "en" ? "OK" : "OK"}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-white truncate">{scenario.name}</p>
                          <p className="text-xs text-white/40 mt-0.5">
                            {format(new Date(scenario.createdAt), "PPp")} · {t.score} {scenario.projectedScore} · {t.nz} {scenario.netZeroYear}
                          </p>
                        </>
                      )}
                    </div>
                    {editingId !== scenario.id && (
                      <div className="flex gap-1 shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => handleLoad(scenario.id)}>
                          {t.loadBtn}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(scenario.id);
                            setEditName(scenario.name);
                          }}
                          aria-label={t.rename}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteScenario(scenario.id)}
                          aria-label={t.delete}
                          className="hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        {savedScenarios.length >= 2 && (
          <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl">
                <GitCompare className="h-4 w-4" />
                {t.compare}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogTitle>{t.compare}</DialogTitle>
              <DialogDescription>
                {language === "en"
                  ? "Side-by-side comparison of key metrics across saved scenarios"
                  : "So sánh các chỉ số chính giữa các kịch bản đã lưu"}
              </DialogDescription>
              <ScenarioCompare scenarios={savedScenarios} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}