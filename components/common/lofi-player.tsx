"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Disc3,
  Headphones,
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LOFI_ATTRIBUTION, LOFI_PLAYLIST } from "@/lib/data/lofi-playlist";
import { useAmbientStore } from "@/lib/stores/ambient";
import { useI18nStore } from "@/lib/stores/i18n";
import { cn } from "@/lib/utils";

const BAR_COUNT = 24;
const FADE_MS = 800;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WaveformBars({ levels, playing }: { levels: number[]; playing: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[3px] h-10 w-full px-1" aria-hidden>
      {levels.map((level, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-emerald-600/80 to-emerald-300"
          animate={{
            height: playing ? `${Math.max(4, level * 36)}px` : "4px",
            opacity: playing ? 0.5 + level * 0.5 : 0.25,
          }}
          transition={{ duration: 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function VinylDisc({ spinning }: { spinning: boolean }) {
  return (
    <div className="relative w-[72px] h-[72px] shrink-0">
      <div
        className={cn(
          "absolute inset-0 rounded-full lofi-vinyl-shadow",
          spinning && "lofi-vinyl-spin"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#0a0a0a_35%,#111_60%,#0d0d0d_100%)]" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[32%] rounded-full border border-white/[0.04]" />
        <div className="absolute inset-[46%] rounded-full border border-white/[0.03]" />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-emerald-500/30 via-amber-500/20 to-emerald-900/40 blur-[1px]" />
        <div className="absolute inset-[42%] rounded-full bg-[#021a0f] border border-emerald-500/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
        </div>
      </div>
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-8 h-1.5 bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-sm rotate-[25deg] origin-left shadow-md" />
    </div>
  );
}

export function LofiPlayerToggle() {
  const playing = useAmbientStore((s) => s.playing);
  const togglePlay = useAmbientStore((s) => s.togglePlay);
  const setExpanded = useAmbientStore((s) => s.setExpanded);
  const language = useI18nStore((s) => s.language);

  const handleClick = () => {
    togglePlay();
    setExpanded(true);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        "relative rounded-xl border transition-all duration-500",
        playing
          ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "border-white/8 hover:border-emerald-500/30"
      )}
      aria-label={language === "en" ? "Toggle lofi music" : "Bật/tắt nhạc lofi"}
    >
      {playing && (
        <span className="absolute inset-0 rounded-xl animate-ping bg-emerald-500/10 pointer-events-none" />
      )}
      <Headphones className={cn("h-4 w-4 relative z-10", playing ? "text-emerald-400" : "text-white/70")} />
    </Button>
  );
}

export function LofiPlayer() {
  const playing = useAmbientStore((s) => s.playing);
  const volume = useAmbientStore((s) => s.volume);
  const trackIndex = useAmbientStore((s) => s.trackIndex);
  const expanded = useAmbientStore((s) => s.expanded);
  const muted = useAmbientStore((s) => s.muted);
  const togglePlay = useAmbientStore((s) => s.togglePlay);
  const setVolume = useAmbientStore((s) => s.setVolume);
  const nextTrack = useAmbientStore((s) => s.nextTrack);
  const prevTrack = useAmbientStore((s) => s.prevTrack);
  const setTrackIndex = useAmbientStore((s) => s.setTrackIndex);
  const toggleExpanded = useAmbientStore((s) => s.toggleExpanded);
  const toggleMute = useAmbientStore((s) => s.toggleMute);
  const language = useI18nStore((s) => s.language);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);
  const fadeRef = useRef<number | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(BAR_COUNT).fill(0.15));
  const [ready, setReady] = useState(false);

  const track = LOFI_PLAYLIST[trackIndex];
  const effectiveVolume = muted ? 0 : volume;

  const initAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || sourceRef.current) return;

    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;

    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.82;

    source.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);

    sourceRef.current = source;
    gainRef.current = gain;
    analyserRef.current = analyser;
    gain.gain.value = effectiveVolume;
  }, [effectiveVolume]);

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) {
      onDone?.();
      return;
    }

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    const start = gain.gain.value;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / FADE_MS);
      const eased = t * t * (3 - 2 * t);
      gain.gain.value = start + (target - start) * eased;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        onDone?.();
      }
    };

    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const tick = () => {
      const analyser = analyserRef.current;
      if (analyser && playingRef.current) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const slice = Math.floor(data.length / BAR_COUNT);
        const next = Array.from({ length: BAR_COUNT }, (_, i) => {
          const chunk = data.slice(i * slice, (i + 1) * slice);
          const avg = chunk.reduce((a, b) => a + b, 0) / (chunk.length || 1);
          return Math.min(1, avg / 180);
        });
        setLevels(next);
      } else {
        setLevels((prev) => prev.map((v) => v * 0.85 + 0.02));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const gain = gainRef.current;
    if (gain) gain.gain.setTargetAtTime(effectiveVolume, ctxRef.current?.currentTime ?? 0, 0.08);
  }, [effectiveVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => nextTrack();

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    if (playing) {
      initAudioGraph();
      ctxRef.current?.resume();
      audio.play().catch(() => useAmbientStore.setState({ playing: false }));
    }
  }, [trackIndex, initAudioGraph, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      initAudioGraph();
      ctxRef.current?.resume();
      fadeTo(effectiveVolume, () => {
        audio.play().catch(() => useAmbientStore.setState({ playing: false }));
      });
    } else {
      fadeTo(0, () => {
        audio.pause();
      });
    }
  }, [playing, initAudioGraph, fadeTo, effectiveVolume]);

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onCanPlay={() => setReady(true)}
        className="hidden"
      />

      <AnimatePresence>
        {(playing || expanded) && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 hidden sm:block"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div
              className={cn(
                "lofi-player-panel overflow-hidden transition-all duration-500",
                expanded ? "w-[340px]" : "w-[260px] cursor-pointer"
              )}
              onClick={!expanded ? () => useAmbientStore.setState({ expanded: true }) : undefined}
              role="region"
              aria-label={language === "en" ? "Lofi music player" : "Trình phát nhạc lofi"}
            >
              <div className="absolute inset-0 lofi-player-glow pointer-events-none" />

              <div className="relative p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Disc3 className={cn("h-3.5 w-3.5", playing ? "text-emerald-400 lofi-icon-spin" : "text-white/40")} />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-400/80">
                      {language === "en" ? "Chill Lofi" : "Lofi Thư Giãn"}
                    </span>
                    {playing && <span className="live-dot scale-75" />}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg text-white/40 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded();
                    }}
                    aria-label={expanded ? "Collapse player" : "Expand player"}
                  >
                    {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                  </Button>
                </div>

                <div className="flex gap-4 items-center">
                  <VinylDisc spinning={playing && ready} />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-white truncate leading-tight">
                      {language === "en" ? track.title : track.titleVi}
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5 truncate">{track.artist}</p>
                    <p className="text-[10px] text-emerald-500/50 mt-1 font-mono">
                      {formatTime(currentTime)} / {duration ? formatTime(duration) : track.duration ?? "—"}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 mb-3">
                        <WaveformBars levels={levels} playing={playing} />
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl text-white/50 hover:text-emerald-400"
                          onClick={prevTrack}
                          aria-label="Previous track"
                        >
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-11 w-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.2)]"
                          onClick={togglePlay}
                          aria-label={playing ? "Pause" : "Play"}
                        >
                          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl text-white/50 hover:text-emerald-400"
                          onClick={nextTrack}
                          aria-label="Next track"
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0 text-white/40 hover:text-emerald-400"
                          onClick={toggleMute}
                          aria-label={muted ? "Unmute" : "Mute"}
                        >
                          {muted || volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                        </Button>
                        <Slider
                          value={[muted ? 0 : volume * 100]}
                          max={100}
                          step={1}
                          onValueChange={([v]) => setVolume(v / 100)}
                          className="flex-1"
                          aria-label="Volume"
                        />
                        <span className="text-[10px] font-mono text-white/30 w-8 text-right">
                          {Math.round((muted ? 0 : volume) * 100)}
                        </span>
                      </div>

                      <div className="border-t border-white/[0.06] pt-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <ListMusic className="h-3 w-3 text-white/30" />
                          <span className="text-[10px] uppercase tracking-wider text-white/30">
                            {language === "en" ? "Playlist" : "Danh sách"}
                          </span>
                        </div>
                        <ul className="space-y-0.5 max-h-[120px] overflow-y-auto pr-1">
                          {LOFI_PLAYLIST.map((t, i) => (
                            <li key={t.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setTrackIndex(i);
                                  if (!playing) useAmbientStore.setState({ playing: true });
                                }}
                                className={cn(
                                  "w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                                  i === trackIndex
                                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                                    : "text-white/45 hover:text-white/70 hover:bg-white/[0.04]"
                                )}
                              >
                                <span className="truncate block">
                                  {language === "en" ? t.title : t.titleVi}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[9px] text-white/20 mt-2 leading-relaxed">
                          {language === "en" ? LOFI_ATTRIBUTION.en : LOFI_ATTRIBUTION.vi}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!expanded && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                    <WaveformBars levels={levels.slice(0, 12)} playing={playing} />
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                    >
                      {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}