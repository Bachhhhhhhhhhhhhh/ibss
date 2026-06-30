export interface LofiTrack {
  id: string;
  title: string;
  titleVi: string;
  artist: string;
  src: string;
  mood: "zen" | "ambient" | "chill";
  duration?: string;
}

export const LOFI_PLAYLIST: LofiTrack[] = [
  {
    id: "temple-dawn",
    title: "Morning Coffee",
    titleVi: "Cà phê buổi sáng",
    artist: "HoliznaCC0",
    src: "/audio/temple-dawn-lofi.mp3",
    mood: "zen",
    duration: "3:11",
  },
  {
    id: "misty-mountain",
    title: "Foggy Headed",
    titleVi: "Sương mù trên đỉnh",
    artist: "HoliznaCC0",
    src: "/audio/misty-mountain-lofi.mp3",
    mood: "ambient",
    duration: "4:06",
  },
  {
    id: "moonlit-moss",
    title: "Something In the Air",
    titleVi: "Ánh trăng trên rêu",
    artist: "HoliznaCC0",
    src: "/audio/moonlit-moss-lofi.mp3",
    mood: "chill",
    duration: "2:11",
  },
  {
    id: "lantern-rain",
    title: "Clouds",
    titleVi: "Đèn lồng trong mưa",
    artist: "HoliznaCC0",
    src: "/audio/lantern-rain-lofi.mp3",
    mood: "zen",
    duration: "3:49",
  },
];

export const LOFI_ATTRIBUTION = {
  en: "Music: HoliznaCC0 · CC0 Public Domain via Free Music Archive",
  vi: "Nhạc: HoliznaCC0 · CC0 Public Domain qua Free Music Archive",
};