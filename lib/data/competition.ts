import type { ScoringCriterion } from "@/types";

export const COMPETITION_DEADLINE = new Date("2026-07-15T20:00:00+08:00");

export const scoringCriteria: ScoringCriterion[] = [
  {
    name: "Strategic Analysis & Insight",
    nameVi: "Phân tích & Nhận định Chiến lược",
    points: 25,
    description: "Depth of ESG strategy analysis, symbiosis philosophy integration, and strategic recommendations.",
    descriptionVi: "Chiều sâu phân tích chiến lược ESG, tích hợp triết lý cộng sinh và đề xuất chiến lược.",
  },
  {
    name: "Innovation & Originality",
    nameVi: "Đổi mới & Sáng tạo",
    points: 20,
    description: "Creative approaches, novel solutions, and forward-thinking ESG initiatives.",
    descriptionVi: "Phương pháp sáng tạo, giải pháp mới và sáng kiến ESG tư duy tương lai.",
  },
  {
    name: "Presentation Quality",
    nameVi: "Chất lượng Trình bày",
    points: 20,
    description: "Visual design, storytelling, clarity, and professional delivery of the case.",
    descriptionVi: "Thiết kế hình ảnh, kể chuyện, rõ ràng và trình bày chuyên nghiệp.",
  },
  {
    name: "Feasibility & Implementation",
    nameVi: "Khả thi & Triển khai",
    points: 25,
    description: "Practical implementation plans, measurable outcomes, and realistic timelines.",
    descriptionVi: "Kế hoạch triển khai thực tế, kết quả đo lường được và thời gian thực tế.",
  },
  {
    name: "Global Perspective",
    nameVi: "Góc nhìn Toàn cầu",
    points: 10,
    description: "East-West bridging theme, international relevance, and cross-cultural understanding.",
    descriptionVi: "Chủ đề kết nối Đông-Tây, liên quan quốc tế và hiểu biết đa văn hóa.",
  },
];

export const competitionRules = {
  format: "Double-blind evaluation",
  formatVi: "Đánh giá kín đôi",
  language: "Consistent language throughout submission",
  languageVi: "Ngôn ngữ nhất quán trong toàn bộ bài nộp",
  aiDisclosure: "AI usage must be disclosed on the final slide",
  aiDisclosureVi: "Sử dụng AI phải được công bố ở slide cuối",
  deliverables: ["PowerPoint Presentation", "15-minute Video"],
  deliverablesVi: ["Bài thuyết trình PowerPoint", "Video 15 phút"],
  contact: "ibss@example.com",
};