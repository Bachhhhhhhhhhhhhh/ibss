export interface TourStep {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  href: string;
  icon: string;
}

export const QUICK_TOUR_STEPS: TourStep[] = [
  {
    id: "dashboard",
    title: "Live Dashboard",
    titleVi: "Bảng điều khiển",
    description: "See real-time ESG metrics updating as you explore.",
    descriptionVi: "Xem các chỉ số ESG cập nhật theo thời gian thực.",
    href: "#dashboard",
    icon: "LayoutDashboard",
  },
  {
    id: "huigui",
    title: "Huigui Building",
    titleVi: "Tòa nhà Huigui",
    description: "Tap a tag below the 3D model to learn each sustainability feature.",
    descriptionVi: "Nhấn thẻ bên dưới mô hình 3D để xem từng tính năng bền vững.",
    href: "#huigui",
    icon: "Building2",
  },
  {
    id: "strategy",
    title: "Strategy Lab",
    titleVi: "Phòng Lab Chiến lược",
    description: "Drag sliders to simulate your ESG strategy through 2030.",
    descriptionVi: "Kéo thanh trượt để mô phỏng chiến lược ESG đến 2030.",
    href: "#strategy",
    icon: "SlidersHorizontal",
  },
];

export const NAV_HINTS: Record<string, { en: string; vi: string }> = {
  dashboard: { en: "Live metrics", vi: "Số liệu trực tiếp" },
  huigui: { en: "3D flagship", vi: "Mô hình 3D" },
  models: { en: "8 complex models", vi: "8 mô hình phức tạp" },
  map: { en: "Global footprint", vi: "Bản đồ toàn cầu" },
  initiatives: { en: "19 ESG programs", vi: "19 sáng kiến" },
  strategy: { en: "What-if simulator", vi: "Mô phỏng kịch bản" },
  competition: { en: "IBSS 2026 hub", vi: "Trung tâm IBSS" },
  creator: { en: "About the team", vi: "Về tác giả" },
};