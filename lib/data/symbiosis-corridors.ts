export interface SymbiosisCorridor {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  labelVi: string;
  type: "humanitarian" | "hr-esg" | "ecological" | "education" | "governance";
  strength: number;
  distanceKm: number;
}

export const symbiosisCorridors: SymbiosisCorridor[] = [
  {
    id: "suzhou-shrm",
    fromId: "suzhou-hub",
    toId: "shrm-alexandria",
    label: "HR × ESG Global Bridge",
    labelVi: "Cầu nối HR × ESG Toàn cầu",
    type: "hr-esg",
    strength: 0.88,
    distanceKm: 11_840,
  },
  {
    id: "suzhou-syria",
    fromId: "suzhou-hub",
    toId: "syria-damascus",
    label: "East-West Humanitarian Corridor",
    labelVi: "Hành lang Nhân đạo Đông-Tây",
    type: "humanitarian",
    strength: 0.76,
    distanceKm: 7_420,
  },
  {
    id: "suzhou-minqin",
    fromId: "suzhou-hub",
    toId: "minqin-gansu",
    label: "Desert Ecological Belt",
    labelVi: "Dải Sinh thái Sa mạc",
    type: "ecological",
    strength: 0.82,
    distanceKm: 1_980,
  },
  {
    id: "suzhou-qiandongnan",
    fromId: "suzhou-hub",
    toId: "qiandongnan-guizhou",
    label: "Rural Tech Education Spine",
    labelVi: "Trục Giáo dục Công nghệ Nông thôn",
    type: "education",
    strength: 0.79,
    distanceKm: 1_560,
  },
  {
    id: "suzhou-sbti",
    fromId: "suzhou-hub",
    toId: "sbti-geneva",
    label: "Science-Based Targets Link",
    labelVi: "Liên kết Mục tiêu Khoa học",
    type: "governance",
    strength: 0.91,
    distanceKm: 8_920,
  },
  {
    id: "qiandongnan-syria",
    fromId: "qiandongnan-guizhou",
    toId: "syria-damascus",
    label: "Southern Silk Education Route",
    labelVi: "Tuyến Giáo dục Con đường Tơ lụa",
    type: "education",
    strength: 0.58,
    distanceKm: 6_100,
  },
];