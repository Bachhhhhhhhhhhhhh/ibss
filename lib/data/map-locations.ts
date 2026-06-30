import type { MapLocation } from "@/types";

export const mapLocations: MapLocation[] = [
  {
    id: "suzhou",
    name: "Suzhou — Huigui Building",
    nameVi: "Tô Châu — Tòa nhà Huigui",
    lat: 31.2989,
    lng: 120.5853,
    pillar: "environmental",
    description:
      "The Huigui Building is Engma Group's flagship symbiosis embodiment — featuring green operations, firefly restoration, rooftop agriculture, and rainwater systems. 15% energy reduction and 20% water savings achieved in 2025.",
    descriptionVi:
      "Tòa nhà Huigui là biểu tượng cộng sinh của Engma Group — vận hành xanh, phục hồi đom đóm, nông nghiệp trên mái. Giảm 15% năng lượng và 20% nước năm 2025.",
    impactScore: 94,
    metrics: [
      { label: "Energy Reduction", labelVi: "Giảm Năng lượng", value: "15%" },
      { label: "Fireflies Released", labelVi: "Đom đóm Thả", value: "2,500" },
      { label: "Water Saved", labelVi: "Nước Tiết kiệm", value: "20%" },
    ],
  },
  {
    id: "minqin",
    name: "Minqin, Gansu — Tree Planting",
    nameVi: "Mân Tần, Cam Túc — Trồng Cây",
    lat: 38.6243,
    lng: 103.0948,
    pillar: "environmental",
    description:
      "EngmaIntec's tree-planting initiative in Minqin County combats desertification in one of China's most fragile ecological zones. First phase investment of RMB 6,000 with ongoing annual contributions.",
    descriptionVi:
      "Sáng kiến trồng cây EngmaIntec tại huyện Mân Tần chống sa mạc hóa. Giai đoạn đầu 6.000 RMB với đóng góp hàng năm.",
    impactScore: 78,
    metrics: [
      { label: "First Phase", labelVi: "Giai đoạn Đầu", value: "RMB 6,000" },
      { label: "Region", labelVi: "Khu vực", value: "Desert Edge" },
      { label: "Status", labelVi: "Trạng thái", value: "Ongoing" },
    ],
  },
  {
    id: "syria",
    name: "Syria — Child Relief",
    nameVi: "Syria — Hỗ trợ Trẻ em",
    lat: 33.5138,
    lng: 36.2765,
    pillar: "social",
    description:
      "International humanitarian support for children affected by conflict, demonstrating Engma's global symbiosis reach and East-West bridging commitment.",
    descriptionVi:
      "Hỗ trợ nhân đạo quốc tế cho trẻ em bị ảnh hưởng bởi xung đột, thể hiện tiếp cận cộng sinh toàn cầu của Engma.",
    impactScore: 85,
    metrics: [
      { label: "Focus", labelVi: "Trọng tâm", value: "Children" },
      { label: "Type", labelVi: "Loại", value: "Humanitarian" },
      { label: "Reach", labelVi: "Phạm vi", value: "International" },
    ],
  },
  {
    id: "shrm-global",
    name: "SHRM — Global Labor Market",
    nameVi: "SHRM — Thị trường Lao động Toàn cầu",
    lat: 38.9072,
    lng: -77.0369,
    pillar: "social",
    description:
      "Partnership with SHRM advancing global labor market standards and embedding ESG principles into HR services for clients worldwide.",
    descriptionVi:
      "Đối tác SHRM thúc đẩy tiêu chuẩn thị trường lao động toàn cầu và tích hợp nguyên tắc ESG vào dịch vụ nhân sự.",
    impactScore: 82,
    metrics: [
      { label: "Partner", labelVi: "Đối tác", value: "SHRM" },
      { label: "Focus", labelVi: "Trọng tâm", value: "HR Excellence" },
      { label: "Scope", labelVi: "Phạm vi", value: "Global" },
    ],
  },
  {
    id: "qiandongnan",
    name: "Qiandongnan — Tech Education",
    nameVi: "Qiandongnan — Giáo dục Công nghệ",
    lat: 26.5834,
    lng: 107.9775,
    pillar: "social",
    description:
      "Technology education programs providing digital skills training to underserved rural communities in Qiandongnan.",
    descriptionVi:
      "Chương trình giáo dục công nghệ cung cấp đào tạo kỹ năng số cho cộng đồng nông thôn thiếu thốn tại Qiandongnan.",
    impactScore: 76,
    metrics: [
      { label: "Focus", labelVi: "Trọng tâm", value: "Education" },
      { label: "Skills", labelVi: "Kỹ năng", value: "Digital" },
      { label: "Community", labelVi: "Cộng đồng", value: "Rural" },
    ],
  },
];