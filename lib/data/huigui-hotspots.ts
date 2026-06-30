import type { HuiguiHotspot } from "@/types";

export const huiguiHotspots: HuiguiHotspot[] = [
  {
    id: "rooftop-rice",
    name: "Rooftop Rice Terraces",
    nameVi: "Ruộng Lúa Trên Mái",
    position: [0, 4.3, 0],
    description:
      "Multi-level rooftop rice terraces integrate urban agriculture with building design, reducing heat island effect and providing fresh produce while symbolizing harmony between human activity and nature.",
    descriptionVi:
      "Ruộng lúa bậc thang trên mái tích hợp nông nghiệp đô thị với thiết kế tòa nhà, giảm hiệu ứng đảo nhiệt và cung cấp nông sản tươi.",
    metric: "Urban agriculture integration",
    metricVi: "Tích hợp nông nghiệp đô thị",
    icon: "Wheat",
  },
  {
    id: "rainwater",
    name: "Rainwater Detention System",
    nameVi: "Hệ thống Giữ Nước Mưa",
    position: [-1.5, 0.9, 1.2],
    description:
      "A 200m³ rainwater detention tank captures and stores rainfall for irrigation and non-potable uses, saving approximately 1,000 tonnes of municipal water annually.",
    descriptionVi:
      "Bể giữ nước mưa 200m³ thu và lưu trữ nước mưa cho tưới tiêu, tiết kiệm khoảng 1.000 tấn nước thành phố mỗi năm.",
    metric: "200m³ • ~1,000 tonnes/year saved",
    metricVi: "200m³ • ~1.000 tấn/năm tiết kiệm",
    icon: "Droplets",
  },
  {
    id: "wild-island",
    name: "Ecological Wild Island",
    nameVi: "Đảo Hoang Dã Sinh thái",
    position: [1.5, 0.5, -1.4],
    description:
      "A preserved ecological wild island with wetland stream creates habitat for native species including fireflies. Four years of restoration enabled the release of 2,000 adults and 500 larvae in July 2025.",
    descriptionVi:
      "Đảo hoang dã sinh thái với suối đầm lầy tạo môi trường sống cho loài bản địa bao gồm đom đóm. Bốn năm phục hồi cho phép thả 2.000 con trưởng thành và 500 ấu trùng tháng 7/2025.",
    metric: "2,500 fireflies • 4-year restoration",
    metricVi: "2.500 đom đóm • 4 năm phục hồi",
    icon: "Flower2",
  },
  {
    id: "earthen-walls",
    name: "Earthen Walls & Low-Carbon Materials",
    nameVi: "Tường Đất & Vật liệu Carbon Thấp",
    position: [-2.8, 1.8, -0.3],
    description:
      "Natural earthen wall construction and low-carbon building materials reduce embodied carbon while creating a warm, biophilic interior environment connected to the symbiosis philosophy.",
    descriptionVi:
      "Xây dựng tường đất tự nhiên và vật liệu carbon thấp giảm carbon nhúng đồng thời tạo môi trường nội thất gắn kết thiên nhiên.",
    metric: "Low embodied carbon design",
    metricVi: "Thiết kế carbon nhúng thấp",
    icon: "Mountain",
  },
  {
    id: "vrv-led",
    name: "VRV + LED Intelligent Systems",
    nameVi: "Hệ thống VRV + LED Thông minh",
    position: [1.2, 2.2, 1.55],
    description:
      "Variable Refrigerant Volume (VRV) air conditioning and intelligent LED lighting systems contributed to the 15% energy reduction achieved in 2025 compared to 2024 baseline.",
    descriptionVi:
      "Điều hòa VRV và chiếu sáng LED thông minh góp phần giảm 15% năng lượng đạt được năm 2025 so với cơ sở 2024.",
    metric: "15% energy reduction in 2025",
    metricVi: "Giảm 15% năng lượng năm 2025",
    icon: "Zap",
  },
];

export const huiguiMetrics = [
  { label: "Energy Reduction", labelVi: "Giảm Năng lượng", value: "15%", sub: "vs 2024 baseline" },
  { label: "Water Saving", labelVi: "Tiết kiệm Nước", value: "20%", sub: "2025 achievement" },
  { label: "CO₂ from Behaviors", labelVi: "CO₂ từ Hành vi", value: ">200t", sub: "employee offset" },
  { label: "Rainwater Tank", labelVi: "Bể Nước Mưa", value: "200m³", sub: "~1,000t/year" },
];