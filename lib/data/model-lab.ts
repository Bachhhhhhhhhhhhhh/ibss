export interface ModelSpec {
  label: string;
  labelVi: string;
  value: string;
}

export interface ModelFeature {
  title: string;
  titleVi: string;
  icon: string;
}

export interface ModelLabEntry {
  id: string;
  name: string;
  nameVi: string;
  tagline: string;
  taglineVi: string;
  description: string;
  descriptionVi: string;
  complexity: string;
  complexityVi: string;
  nodes: string;
  icon: string;
  category: string;
  categoryVi: string;
  esgPillar: string;
  esgPillarVi: string;
  accent: string;
  gradient: string;
  specs: ModelSpec[];
  features: ModelFeature[];
  highlights: { en: string; vi: string }[];
}

export const MODEL_LAB_ENTRIES: ModelLabEntry[] = [
  {
    id: "huigui-twin",
    name: "Huigui Digital Twin",
    nameVi: "Song sinh Số Huigui",
    tagline: "Flagship sustainable architecture",
    taglineVi: "Kiến trúc bền vững biểu tượng",
    description:
      "A parametric megastructure replicating Engma's Huigui Building — rice terraces, earthen wings, wetland ecology, VRV clusters, and solar canopy rendered as an explorable digital twin.",
    descriptionVi:
      "Siêu cấu trúc tham số tái hiện Tòa Huigui của Engma — ruộng bậc thang, cánh tường đất, đầm lầy sinh thái, cụm VRV và mái pin trong bản sao số có thể khám phá.",
    complexity: "Ultra · 2,400+ polygons",
    complexityVi: "Siêu phức tạp · 2.400+ đa giác",
    nodes: "148 instanced",
    icon: "Building2",
    category: "Architecture",
    categoryVi: "Kiến trúc",
    esgPillar: "Environmental · Flagship asset",
    esgPillarVi: "Môi trường · Tài sản biểu tượng",
    accent: "#10b981",
    gradient: "from-emerald-600/40 via-emerald-900/20 to-[#021a0f]",
    specs: [
      { label: "Polygons", labelVi: "Đa giác", value: "2,400+" },
      { label: "Facades", labelVi: "Mặt tiền", value: "120 windows" },
      { label: "Hotspots", labelVi: "Điểm sáng", value: "5 ESG zones" },
      { label: "Terraces", labelVi: "Ruộng bậc thang", value: "6 tiers" },
    ],
    features: [
      { title: "Rice terraces", titleVi: "Ruộng bậc thang", icon: "Layers" },
      { title: "Wetland ecology", titleVi: "Sinh thái đầm lầy", icon: "Droplets" },
      { title: "Solar canopy", titleVi: "Mái pin mặt trời", icon: "Sun" },
      { title: "VRV systems", titleVi: "Hệ thống VRV", icon: "Wind" },
    ],
    highlights: [
      { en: "15% energy reduction benchmark", vi: "Chuẩn giảm 15% năng lượng" },
      { en: "200m³ rainwater detention", vi: "Bể giữ nước mưa 200m³" },
      { en: "2,500 fireflies restored", vi: "2.500 đom đóm phục hồi" },
    ],
  },
  {
    id: "esg-globe",
    name: "Planetary ESG Nexus",
    nameVi: "Mạng ESG Hành tinh",
    tagline: "Global supply-chain intelligence",
    taglineVi: "Thông minh chuỗi cung ứng toàn cầu",
    description:
      "Wireframe geosphere mapping 64 supply-chain nodes across continents, with five orbital telemetry rings and animated data arcs showing ESG flows between regions.",
    descriptionVi:
      "Geosphere khung dây với 64 nút chuỗi cung ứng xuyên lục địa, năm vòng quỹ đạo và cung dữ liệu hoạt hình thể hiện dòng ESG giữa các vùng.",
    complexity: "Ultra · 5 orbital layers",
    complexityVi: "Siêu phức tạp · 5 lớp quỹ đạo",
    nodes: "64 nodes",
    icon: "Globe2",
    category: "Global Systems",
    categoryVi: "Hệ thống Toàn cầu",
    esgPillar: "Governance · Supply chain",
    esgPillarVi: "Quản trị · Chuỗi cung ứng",
    accent: "#38bdf8",
    gradient: "from-sky-500/35 via-blue-900/25 to-[#021a0f]",
    specs: [
      { label: "Nodes", labelVi: "Nút", value: "64" },
      { label: "Data arcs", labelVi: "Cung dữ liệu", value: "24" },
      { label: "Orbits", labelVi: "Quỹ đạo", value: "5 rings" },
      { label: "Regions", labelVi: "Vùng", value: "6 continents" },
    ],
    features: [
      { title: "Supply nodes", titleVi: "Nút cung ứng", icon: "Network" },
      { title: "Orbital rings", titleVi: "Vòng quỹ đạo", icon: "Orbit" },
      { title: "Data arcs", titleVi: "Cung dữ liệu", icon: "GitBranch" },
      { title: "Live telemetry", titleVi: "Telemetry trực tiếp", icon: "Radio" },
    ],
    highlights: [
      { en: "SBTi supplier tracking", vi: "Theo dõi nhà cung cấp SBTi" },
      { en: "Cross-border ESG flows", vi: "Dòng ESG xuyên biên giới" },
      { en: "Bridging East & West", vi: "Kết nối Đông — Tây" },
    ],
  },
  {
    id: "carbon-lattice",
    name: "Carbon Capture Lattice",
    nameVi: "Lưới Thu giữ Carbon",
    tagline: "Molecular carbon removal",
    taglineVi: "Thu giữ carbon cấp phân tử",
    description:
      "Diamond-unit crystal lattice with nested buckysphere shells, 216 atomic adsorption sites, and pulsing field visualization of carbon capture technology.",
    descriptionVi:
      "Lưới tinh thể kim cương với vỏ buckysphere lồng nhau, 216 điểm hấp phụ nguyên tử và trực quan hóa công nghệ thu giữ carbon.",
    complexity: "Extreme · 216 atoms",
    complexityVi: "Cực phức tạp · 216 nguyên tử",
    nodes: "216 sites",
    icon: "Hexagon",
    category: "Carbon Tech",
    categoryVi: "Công nghệ Carbon",
    esgPillar: "Environmental · Decarbonization",
    esgPillarVi: "Môi trường · Khử carbon",
    accent: "#fbbf24",
    gradient: "from-amber-500/30 via-emerald-800/20 to-[#021a0f]",
    specs: [
      { label: "Atoms", labelVi: "Nguyên tử", value: "216" },
      { label: "Bonds", labelVi: "Liên kết", value: "Diamond lattice" },
      { label: "Shells", labelVi: "Lớp vỏ", value: "3 nested" },
      { label: "Field", labelVi: "Trường", value: "Pulsing adsorption" },
    ],
    features: [
      { title: "Crystal lattice", titleVi: "Lưới tinh thể", icon: "Hexagon" },
      { title: "Buckysphere", titleVi: "Cầu bucky", icon: "Circle" },
      { title: "Atomic sites", titleVi: "Điểm nguyên tử", icon: "Atom" },
      { title: "Capture field", titleVi: "Trường hấp phụ", icon: "Sparkles" },
    ],
    highlights: [
      { en: "Scope 1 & 2 reduction", vi: "Giảm Phạm vi 1 & 2" },
      { en: "Net-Zero pathway support", vi: "Hỗ trợ lộ trình Net-Zero" },
      { en: "Low embodied carbon materials", vi: "Vật liệu carbon nhúng thấp" },
    ],
  },
  {
    id: "mycorrhizal",
    name: "Mycorrhizal Symbiosis Web",
    nameVi: "Mạng Cộng sinh Nấm Rễ",
    tagline: "Forest-root intelligence network",
    taglineVi: "Mạng thông minh rễ — nấm",
    description:
      "72 procedurally generated fractal trees connected by an underground hyphal network — visualizing nature's symbiosis model that inspires Engma's philosophy.",
    descriptionVi:
      "72 cây fractal sinh tham số liên kết bởi mạng sợi nấm dưới đất — hình ảnh hóa mô hình cộng sinh thiên nhiên truyền cảm hứng cho triết lý Engma.",
    complexity: "Ultra · 72 trees",
    complexityVi: "Siêu phức tạp · 72 cây",
    nodes: "180 edges",
    icon: "TreePine",
    category: "Biodiversity",
    categoryVi: "Đa dạng Sinh học",
    esgPillar: "Environmental · Ecology",
    esgPillarVi: "Môi trường · Sinh thái",
    accent: "#a78bfa",
    gradient: "from-violet-500/30 via-emerald-900/20 to-[#021a0f]",
    specs: [
      { label: "Trees", labelVi: "Cây", value: "72 fractal" },
      { label: "Hyphae", labelVi: "Sợi nấm", value: "180+ edges" },
      { label: "Depth", labelVi: "Độ sâu", value: "4 branch levels" },
      { label: "Hub", labelVi: "Trung tâm", value: "Symbiosis core" },
    ],
    features: [
      { title: "Fractal trees", titleVi: "Cây fractal", icon: "TreePine" },
      { title: "Root network", titleVi: "Mạng rễ", icon: "GitMerge" },
      { title: "Hyphal links", titleVi: "Liên kết nấm", icon: "Workflow" },
      { title: "Symbiosis hub", titleVi: "Trung tâm cộng sinh", icon: "Heart" },
    ],
    highlights: [
      { en: "Wild island restoration", vi: "Phục hồi đảo hoang dã" },
      { en: "Native species habitat", vi: "Môi trường loài bản địa" },
      { en: "Symbiosis philosophy", vi: "Triết lý Cộng sinh" },
    ],
  },
  {
    id: "smart-grid",
    name: "Neo-Suzhou Smart Grid",
    nameVi: "Lưới điện Thông minh Tô Châu",
    tagline: "District energy orchestration",
    taglineVi: "Điều phối năng lượng khu vực",
    description:
      "48-tower miniature cityscape with district energy mesh, rooftop renewables on every third building, and 96 animated power-flow particles along grid lines.",
    descriptionVi:
      "Đô thị thu nhỏ 48 tòa với lưới năng lượng khu vực, tái tạo trên mái mỗi tòa thứ ba, và 96 hạt dòng điện chạy dọc đường lưới.",
    complexity: "Ultra · 48 buildings",
    complexityVi: "Siêu phức tạp · 48 tòa nhà",
    nodes: "96 lines",
    icon: "Zap",
    category: "Smart City",
    categoryVi: "Đô thị Thông minh",
    esgPillar: "Environmental · Energy",
    esgPillarVi: "Môi trường · Năng lượng",
    accent: "#f59e0b",
    gradient: "from-amber-500/35 via-slate-800/30 to-[#021a0f]",
    specs: [
      { label: "Buildings", labelVi: "Tòa nhà", value: "48" },
      { label: "Grid lines", labelVi: "Đường lưới", value: "96" },
      { label: "Renewables", labelVi: "Tái tạo", value: "33% rooftops" },
      { label: "Particles", labelVi: "Hạt", value: "Energy flow" },
    ],
    features: [
      { title: "City mesh", titleVi: "Lưới đô thị", icon: "Building" },
      { title: "Rooftop solar", titleVi: "Pin mái", icon: "Sun" },
      { title: "Power flow", titleVi: "Dòng điện", icon: "Zap" },
      { title: "VRV clusters", titleVi: "Cụm VRV", icon: "Cpu" },
    ],
    highlights: [
      { en: "15% energy reduction in 2025", vi: "Giảm 15% năng lượng 2025" },
      { en: "Intelligent LED + VRV", vi: "LED + VRV thông minh" },
      { en: "District optimization", vi: "Tối ưu khu vực" },
    ],
  },
  {
    id: "hydro-loop",
    name: "Hydrological Closed Loop",
    nameVi: "Vòng Tuần hoàn Thủy văn",
    tagline: "Circular water infrastructure",
    taglineVi: "Hạ tầng nước tuần hoàn",
    description:
      "Six interconnected tanks, helical pipe network, animated pump station, wetland basin, and 300-phase particle simulation of Engma's closed-loop water system.",
    descriptionVi:
      "Sáu bể liên thông, mạng ống xoắn, trạm bơm hoạt hình, lưu vực đầm lầy và mô phỏng 300 pha hạt của hệ thống nước khép kín Engma.",
    complexity: "Extreme · 14 subsystems",
    complexityVi: "Cực phức tạp · 14 hệ con",
    nodes: "300 particles",
    icon: "Droplets",
    category: "Water Systems",
    categoryVi: "Hệ thống Nước",
    esgPillar: "Environmental · Water",
    esgPillarVi: "Môi trường · Nước",
    accent: "#0ea5e9",
    gradient: "from-cyan-500/35 via-teal-900/25 to-[#021a0f]",
    specs: [
      { label: "Tanks", labelVi: "Bể", value: "6 linked" },
      { label: "Particles", labelVi: "Hạt", value: "300 phase" },
      { label: "Pipes", labelVi: "Ống", value: "Helical mesh" },
      { label: "Saved", labelVi: "Tiết kiệm", value: "~1,000 t/yr" },
    ],
    features: [
      { title: "Rainwater tanks", titleVi: "Bể mưa", icon: "Cylinder" },
      { title: "Pump station", titleVi: "Trạm bơm", icon: "Cog" },
      { title: "Wetland basin", titleVi: "Lưu vực đầm", icon: "Waves" },
      { title: "Flow particles", titleVi: "Dòng hạt", icon: "Droplets" },
    ],
    highlights: [
      { en: "200m³ detention capacity", vi: "Dung tích giữ 200m³" },
      { en: "20% water saving in 2025", vi: "Tiết kiệm 20% nước 2025" },
      { en: "Non-potable reuse loop", vi: "Vòng tái sử dụng phi uống" },
    ],
  },
  {
    id: "rice-fractal",
    name: "Rice Terrace Fractal",
    nameVi: "Fractal Ruộng Bậc thang",
    tagline: "Urban agriculture topology",
    taglineVi: "Topology nông nghiệp đô thị",
    description:
      "12-tier terraced landscape wrapping a central pagoda, with irrigation channels, specular water planes, and fractal geometry inspired by Huigui's rooftop rice fields.",
    descriptionVi:
      "Cảnh quan 12 tầng ruộng bậc thang quanh tháp trung tâm, kênh tưới, mặt nước phản chiếu và hình học fractal lấy cảm hứng từ ruộng lúa mái Huigui.",
    complexity: "Ultra · 12 tiers",
    complexityVi: "Siêu phức tạp · 12 tầng",
    nodes: "84 segments",
    icon: "Layers",
    category: "Agriculture",
    categoryVi: "Nông nghiệp",
    esgPillar: "Social · Food security",
    esgPillarVi: "Xã hội · An ninh lương thực",
    accent: "#22c55e",
    gradient: "from-green-500/35 via-lime-900/20 to-[#021a0f]",
    specs: [
      { label: "Tiers", labelVi: "Tầng", value: "12" },
      { label: "Segments", labelVi: "Phân đoạn", value: "84" },
      { label: "Channels", labelVi: "Kênh", value: "Irrigation mesh" },
      { label: "Pagoda", labelVi: "Tháp", value: "Central hub" },
    ],
    features: [
      { title: "Terraced tiers", titleVi: "Ruộng bậc thang", icon: "Layers" },
      { title: "Water planes", titleVi: "Mặt nước", icon: "Waves" },
      { title: "Irrigation", titleVi: "Tưới tiêu", icon: "Droplets" },
      { title: "Pagoda core", titleVi: "Tháp trung tâm", icon: "Landmark" },
    ],
    highlights: [
      { en: "Rooftop urban agriculture", vi: "Nông nghiệp đô thị trên mái" },
      { en: "Heat island reduction", vi: "Giảm hiệu ứng đảo nhiệt" },
      { en: "Community food programs", vi: "Chương trình thực phẩm cộng đồng" },
    ],
  },
  {
    id: "biodiversity-helix",
    name: "Biodiversity Helix",
    nameVi: "Xoắn ốc Đa dạng Sinh học",
    tagline: "Species DNA scaffold",
    taglineVi: "Khung DNA đa loài",
    description:
      "Double-helix DNA structure carrying 40 species orbs, firefly particle swarms, and epigenetic glow ribbons — celebrating Huigui's ecological restoration success.",
    descriptionVi:
      "Cấu trúc DNA xoắn kép mang 40 quả cầu loài, đàn đom đóm hạt và dải phát sáng biểu sinh — tôn vinh thành công phục hồi sinh thái Huigui.",
    complexity: "Extreme · 40 species",
    complexityVi: "Cực phức tạp · 40 loài",
    nodes: "40 orbs",
    icon: "Dna",
    category: "Biodiversity",
    categoryVi: "Đa dạng Sinh học",
    esgPillar: "Environmental · Species",
    esgPillarVi: "Môi trường · Loài",
    accent: "#f472b6",
    gradient: "from-pink-500/30 via-purple-900/25 to-[#021a0f]",
    specs: [
      { label: "Species", labelVi: "Loài", value: "40 orbs" },
      { label: "Fireflies", labelVi: "Đom đóm", value: "50 swarm" },
      { label: "Helix", labelVi: "Xoắn ốc", value: "Double strand" },
      { label: "Ribbons", labelVi: "Dải sáng", value: "8 epigenetic" },
    ],
    features: [
      { title: "DNA helix", titleVi: "Xoắn DNA", icon: "Dna" },
      { title: "Species orbs", titleVi: "Quả cầu loài", icon: "Circle" },
      { title: "Firefly swarm", titleVi: "Đàn đom đóm", icon: "Sparkles" },
      { title: "Glow ribbons", titleVi: "Dải phát sáng", icon: "Ribbon" },
    ],
    highlights: [
      { en: "2,500 fireflies released Jul 2025", vi: "2.500 đom đóm thả 7/2025" },
      { en: "4-year wetland restoration", vi: "4 năm phục hồi đầm lầy" },
      { en: "Native habitat recovery", vi: "Phục hồi môi trường bản địa" },
    ],
  },
  {
    id: "quant-engine",
    name: "Quantitative Analytics Engine",
    nameVi: "Công cụ Phân tích Định lượng",
    tagline: "Live ESG metrics & statistical modeling",
    taglineVi: "Chỉ số ESG trực tiếp & mô hình thống kê",
    description:
      "A friendly 3D bar-chart landscape visualizing eight live quantitative ESG metrics — carbon intensity, supplier coverage, biodiversity health, and model accuracy updated in real time.",
    descriptionVi:
      "Cảnh quan biểu đồ cột 3D thân thiện trực quan hóa 8 chỉ số ESG định lượng trực tiếp — cường độ carbon, bao phủ nhà cung cấp, sức khỏe đa dạng sinh học cập nhật theo thời gian thực.",
    complexity: "Analytics · 8 live metrics",
    complexityVi: "Phân tích · 8 chỉ số trực tiếp",
    nodes: "8 KPIs",
    icon: "BarChart3",
    category: "Quant Analysis",
    categoryVi: "Phân tích Định lượng",
    esgPillar: "All pillars · Data science",
    esgPillarVi: "Tất cả trụ cột · Khoa học dữ liệu",
    accent: "#34d399",
    gradient: "from-emerald-400/35 via-teal-900/20 to-[#021a0f]",
    specs: [
      { label: "Metrics", labelVi: "Chỉ số", value: "8 live" },
      { label: "Refresh", labelVi: "Cập nhật", value: "Real-time" },
      { label: "Accuracy", labelVi: "Độ chính xác", value: "93.7%" },
      { label: "Sources", labelVi: "Nguồn", value: "Engma case" },
    ],
    features: [
      { title: "Live KPIs", titleVi: "KPI trực tiếp", icon: "Activity" },
      { title: "Statistical models", titleVi: "Mô hình thống kê", icon: "Calculator" },
      { title: "Trend analysis", titleVi: "Phân tích xu hướng", icon: "TrendingUp" },
      { title: "ESG scoring", titleVi: "Chấm điểm ESG", icon: "Gauge" },
    ],
    highlights: [
      { en: "ESG Alpha Score 87.4+", vi: "Điểm ESG Alpha 87.4+" },
      { en: "Carbon intensity tracking", vi: "Theo dõi cường độ carbon" },
      { en: "Supplier ESG coverage 47%", vi: "Bao phủ ESG NCC 47%" },
    ],
  },
  {
    id: "prediction-oracle",
    name: "ESG Prediction Oracle",
    nameVi: "Oracle Dự đoán ESG",
    tagline: "Forecast pathways with confidence bands",
    taglineVi: "Lộ trình dự báo với dải tin cậy",
    description:
      "A smooth 3D wave visualizing historical ESG trajectories and golden forecast curves for Symbiosis Score, emissions index, and renewable energy share through 2026.",
    descriptionVi:
      "Sóng 3D mượt mà trực quan hóa quỹ đạo ESG lịch sử và đường dự báo vàng cho Điểm Cộng sinh, chỉ số phát thải và tỷ lệ tái tạo đến 2026.",
    complexity: "ML Forecast · 3 series",
    complexityVi: "Dự báo ML · 3 chuỗi",
    nodes: "18 periods",
    icon: "LineChart",
    category: "Predictions",
    categoryVi: "Dự đoán",
    esgPillar: "Strategic foresight",
    esgPillarVi: "Tầm nhìn chiến lược",
    accent: "#f59e0b",
    gradient: "from-amber-500/35 via-orange-900/20 to-[#021a0f]",
    specs: [
      { label: "Series", labelVi: "Chuỗi", value: "3 forecasts" },
      { label: "Horizon", labelVi: "Tầm nhìn", value: "2026 H1" },
      { label: "Confidence", labelVi: "Tin cậy", value: "± band" },
      { label: "Model", labelVi: "Mô hình", value: "Symbiosis ML" },
    ],
    features: [
      { title: "Forecast curves", titleVi: "Đường dự báo", icon: "TrendingUp" },
      { title: "Confidence bands", titleVi: "Dải tin cậy", icon: "Layers" },
      { title: "Net-Zero path", titleVi: "Lộ trình Net-Zero", icon: "Target" },
      { title: "Scenario sync", titleVi: "Đồng bộ kịch bản", icon: "GitCompare" },
    ],
    highlights: [
      { en: "Symbiosis Score → 95+ by 2026", vi: "Điểm Cộng sinh → 95+ đến 2026" },
      { en: "Emissions index declining", vi: "Chỉ số phát thải giảm" },
      { en: "Renewable % accelerating", vi: "% tái tạo tăng tốc" },
    ],
  },
  {
    id: "intel-nexus",
    name: "Real-Time Intel Nexus",
    nameVi: "Trung tâm Tin tức Thời gian thực",
    tagline: "Live ESG news & intelligence feed",
    taglineVi: "Luồng tin ESG & tình báo trực tiếp",
    description:
      "A central intelligence hub with orbiting news cards and data pulses — streaming live updates from Huigui operations, SBTi milestones, supplier commitments, and competition intel.",
    descriptionVi:
      "Trung tâm tình báo với thẻ tin quỹ đạo và xung dữ liệu — truyền cập nhật trực tiếp từ vận hành Huigui, cột mốc SBTi, cam kết nhà cung cấp và tin cuộc thi.",
    complexity: "Intel · Live feed",
    complexityVi: "Tình báo · Luồng trực tiếp",
    nodes: "20+ items",
    icon: "Newspaper",
    category: "Live Intel",
    categoryVi: "Tin tức Trực tiếp",
    esgPillar: "All pillars · Intelligence",
    esgPillarVi: "Tất cả trụ cột · Tình báo",
    accent: "#7dd3fc",
    gradient: "from-sky-400/35 via-blue-900/20 to-[#021a0f]",
    specs: [
      { label: "Feed", labelVi: "Luồng", value: "Live" },
      { label: "Sources", labelVi: "Nguồn", value: "10+" },
      { label: "Categories", labelVi: "Danh mục", value: "E · S · G" },
      { label: "Latency", labelVi: "Độ trễ", value: "< 3s" },
    ],
    features: [
      { title: "News stream", titleVi: "Luồng tin", icon: "Newspaper" },
      { title: "Sentiment tags", titleVi: "Nhãn cảm xúc", icon: "Smile" },
      { title: "Source tracking", titleVi: "Theo dõi nguồn", icon: "Rss" },
      { title: "Auto-refresh", titleVi: "Tự làm mới", icon: "RefreshCw" },
    ],
    highlights: [
      { en: "Huigui & SBTi breaking updates", vi: "Tin nóng Huigui & SBTi" },
      { en: "Supplier commitment alerts", vi: "Cảnh báo cam kết NCC" },
      { en: "IBSS competition countdown", vi: "Đếm ngược IBSS" },
    ],
  },
];