import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOFI_PLAYLIST } from "@/lib/data/lofi-playlist";

interface AmbientStore {
  playing: boolean;
  volume: number;
  trackIndex: number;
  expanded: boolean;
  muted: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  setTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleMute: () => void;
}

export const useAmbientStore = create<AmbientStore>()(
  persist(
    (set, get) => ({
      playing: false,
      volume: 0.45,
      trackIndex: 0,
      expanded: false,
      muted: false,

      togglePlay: () => set((s) => ({ playing: !s.playing, expanded: s.playing ? s.expanded : true })),
      play: () => set({ playing: true, expanded: true }),
      pause: () => set({ playing: false }),

      setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)), muted: false }),

      setTrackIndex: (index) =>
        set({ trackIndex: ((index % LOFI_PLAYLIST.length) + LOFI_PLAYLIST.length) % LOFI_PLAYLIST.length }),

      nextTrack: () => {
        const { trackIndex } = get();
        set({ trackIndex: (trackIndex + 1) % LOFI_PLAYLIST.length });
      },

      prevTrack: () => {
        const { trackIndex } = get();
        set({ trackIndex: (trackIndex - 1 + LOFI_PLAYLIST.length) % LOFI_PLAYLIST.length });
      },

      toggleExpanded: () => set((s) => ({ expanded: !s.expanded })),
      setExpanded: (expanded) => set({ expanded }),

      toggleMute: () => set((s) => ({ muted: !s.muted })),
    }),
    {
      name: "symbiosis-lofi",
      partialize: (s) => ({
        volume: s.volume,
        trackIndex: s.trackIndex,
        muted: s.muted,
      }),
    }
  )
);