import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import type { StrategySliders } from "@/types";
import { SLIDER_LABELS } from "@/lib/strategy/calculations";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: 700 },
  ],
});

const emerald = "#052e16";
const emeraldLight = "#10b981";
const amber = "#f59e0b";
const slate = "#1e293b";
const muted = "#64748b";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: slate,
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: "42%",
    left: "8%",
    right: "8%",
    textAlign: "center",
    fontSize: 28,
    color: "#10b981",
    opacity: 0.06,
    transform: "rotate(-24deg)",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: muted,
    maxWidth: "72%",
    lineHeight: 1.4,
  },
  pageNum: {
    fontSize: 8,
    color: muted,
  },
  coverHeader: {
    marginTop: 40,
    marginBottom: 32,
  },
  coverBadge: {
    fontSize: 9,
    color: emeraldLight,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: emerald,
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 14,
    color: muted,
    marginBottom: 24,
  },
  coverMetrics: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  metricBox: {
    flex: 1,
    backgroundColor: emerald,
    borderRadius: 12,
    padding: 16,
  },
  metricLabel: {
    fontSize: 8,
    color: "#a7f3d0",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 700,
    color: "#ffffff",
  },
  qrSection: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#ecfdf5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#a7f3d0",
  },
  qrImage: {
    width: 80,
    height: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: emerald,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: muted,
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: emerald,
    color: "#ffffff",
    fontSize: 9,
    fontWeight: 700,
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 9,
    backgroundColor: "#ffffff",
  },
  tableCellAlt: {
    flex: 1,
    padding: 10,
    fontSize: 9,
    backgroundColor: "#f1f5f9",
  },
  recItem: {
    flexDirection: "row",
    marginBottom: 8,
    paddingLeft: 4,
  },
  recBullet: {
    width: 14,
    fontSize: 10,
    color: emeraldLight,
  },
  recText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: slate,
  },
  insightBox: {
    backgroundColor: "#fffbeb",
    borderLeftWidth: 3,
    borderLeftColor: amber,
    padding: 14,
    marginBottom: 12,
    borderRadius: 4,
  },
  insightTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#92400e",
    marginBottom: 4,
  },
  insightText: {
    fontSize: 9,
    color: "#78350f",
    lineHeight: 1.5,
  },
  chartBar: {
    height: 8,
    backgroundColor: emeraldLight,
    borderRadius: 4,
    marginBottom: 4,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  chartYear: {
    width: 36,
    fontSize: 8,
    color: muted,
  },
});

export interface StrategyReportData {
  sliders: StrategySliders;
  projectedScore: number;
  netZeroYear: number;
  recommendations: string[];
  projectionData: { year: number; emissions: number; target: number }[];
  generatedAt: string;
  language: "en" | "vi";
  qrDataUrl: string;
  siteUrl: string;
  scenarioName?: string;
}

function Watermark() {
  return (
    <Text style={styles.watermark} fixed>
      Symbiosis Nexus 2026 — Interactive Exploration Tool
    </Text>
  );
}

function PageFooter({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        This is an interactive exploration tool inspired by the 2026 IBSS case materials. Not an official submission.
      </Text>
      <Text style={styles.pageNum}>
        {pageNumber} / {totalPages}
      </Text>
    </View>
  );
}

function CoverPage({ data }: { data: StrategyReportData }) {
  const dateStr = new Date(data.generatedAt).toLocaleDateString(
    data.language === "en" ? "en-US" : "vi-VN",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <View style={styles.coverHeader}>
        <Text style={styles.coverBadge}>IBSS 2026 · Engma Group ESG</Text>
        <Text style={styles.coverTitle}>Symbiosis Nexus 2026</Text>
        <Text style={styles.coverSubtitle}>
          {data.language === "en"
            ? "Global ESG Strategy — Interactive Strategy Snapshot"
            : "Chiến lược ESG Toàn cầu — Bản tóm tắt Chiến lược Tương tác"}
        </Text>
        <Text style={{ fontSize: 10, color: muted }}>{dateStr}</Text>
        {data.scenarioName && (
          <Text style={{ fontSize: 11, color: emeraldLight, marginTop: 8 }}>
            {data.language === "en" ? "Scenario" : "Kịch bản"}: {data.scenarioName}
          </Text>
        )}
      </View>

      <View style={styles.coverMetrics}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>
            {data.language === "en" ? "Symbiosis Score 2030" : "Điểm Cộng sinh 2030"}
          </Text>
          <Text style={styles.metricValue}>{data.projectedScore}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>
            {data.language === "en" ? "Net-Zero Target" : "Mục tiêu Net-Zero"}
          </Text>
          <Text style={styles.metricValue}>{data.netZeroYear}</Text>
        </View>
      </View>

      <View style={styles.qrSection}>
        <Image src={data.qrDataUrl} style={styles.qrImage} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: emerald, marginBottom: 4 }}>
            {data.language === "en" ? "Scan to explore the live experience" : "Quét để khám phá trải nghiệm trực tiếp"}
          </Text>
          <Text style={{ fontSize: 8, color: muted, lineHeight: 1.4 }}>{data.siteUrl}</Text>
        </View>
      </View>

      <PageFooter pageNumber={1} totalPages={4} />
    </Page>
  );
}

function InputsPage({ data }: { data: StrategyReportData }) {
  const sliderKeys = Object.keys(data.sliders) as (keyof StrategySliders)[];

  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <Text style={styles.sectionTitle}>
        {data.language === "en" ? "Simulator Inputs & Results" : "Đầu vào & Kết quả Mô phỏng"}
      </Text>
      <Text style={styles.sectionSubtitle}>
        {data.language === "en"
          ? "Current Strategy Lab slider configuration and projected outcomes"
          : "Cấu hình thanh trượt Phòng Lab Chiến lược và kết quả dự kiến"}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>
            {data.language === "en" ? "Input Parameter" : "Tham số Đầu vào"}
          </Text>
          <Text style={[styles.tableHeader, { flex: 0.35 }]}>%</Text>
        </View>
        {sliderKeys.map((key, i) => (
          <View key={key} style={i === sliderKeys.length - 1 ? styles.tableRowLast : styles.tableRow}>
            <Text style={i % 2 === 0 ? styles.tableCell : styles.tableCellAlt}>
              {SLIDER_LABELS[key][data.language]}
            </Text>
            <Text style={[i % 2 === 0 ? styles.tableCell : styles.tableCellAlt, { flex: 0.35 }]}>
              {data.sliders[key]}%
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>
            {data.language === "en" ? "Projected Metric" : "Chỉ số Dự kiến"}
          </Text>
          <Text style={[styles.tableHeader, { flex: 0.35 }]}>
            {data.language === "en" ? "Value" : "Giá trị"}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {data.language === "en" ? "Symbiosis Score (2030)" : "Điểm Cộng sinh (2030)"}
          </Text>
          <Text style={[styles.tableCell, { flex: 0.35 }]}>{data.projectedScore}</Text>
        </View>
        <View style={styles.tableRowLast}>
          <Text style={styles.tableCellAlt}>
            {data.language === "en" ? "Net-Zero Achievement Year" : "Năm Đạt Net-Zero"}
          </Text>
          <Text style={[styles.tableCellAlt, { flex: 0.35 }]}>{data.netZeroYear}</Text>
        </View>
      </View>

      <PageFooter pageNumber={2} totalPages={4} />
    </Page>
  );
}

function ImpactPage({ data }: { data: StrategyReportData }) {
  const milestones = data.projectionData.filter((_, i) => i % 5 === 0 || i === data.projectionData.length - 1);

  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <Text style={styles.sectionTitle}>
        {data.language === "en" ? "Projected Impact" : "Tác động Dự kiến"}
      </Text>
      <Text style={styles.sectionSubtitle}>
        {data.language === "en"
          ? "Net-Zero pathway emissions trajectory (indexed to 2025 baseline = 100)"
          : "Lộ trình phát thải Net-Zero (cơ sở 2025 = 100)"}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Year</Text>
          <Text style={styles.tableHeader}>
            {data.language === "en" ? "Projected Emissions" : "Phát thải Dự kiến"}
          </Text>
          <Text style={styles.tableHeader}>
            {data.language === "en" ? "SBTi Pathway" : "Lộ trình SBTi"}
          </Text>
        </View>
        {milestones.map((row, i) => (
          <View key={row.year} style={i === milestones.length - 1 ? styles.tableRowLast : styles.tableRow}>
            <Text style={i % 2 === 0 ? styles.tableCell : styles.tableCellAlt}>{row.year}</Text>
            <Text style={i % 2 === 0 ? styles.tableCell : styles.tableCellAlt}>{row.emissions}</Text>
            <Text style={i % 2 === 0 ? styles.tableCell : styles.tableCellAlt}>
              {Math.round(row.target * 10) / 10}
            </Text>
          </View>
        ))}
      </View>

      <Text style={{ fontSize: 10, fontWeight: 700, color: emerald, marginTop: 8, marginBottom: 10 }}>
        {data.language === "en" ? "Emissions Reduction Visual" : "Biểu đồ Giảm Phát thải"}
      </Text>
      {milestones.slice(0, 8).map((row) => (
        <View key={`bar-${row.year}`} style={styles.chartRow}>
          <Text style={styles.chartYear}>{row.year}</Text>
          <View style={{ flex: 1 }}>
            <View style={[styles.chartBar, { width: `${Math.max(4, row.emissions)}%` }]} />
          </View>
          <Text style={{ fontSize: 8, color: muted, width: 28 }}>{row.emissions}</Text>
        </View>
      ))}

      <PageFooter pageNumber={3} totalPages={4} />
    </Page>
  );
}

function RecommendationsPage({ data }: { data: StrategyReportData }) {
  return (
    <Page size="A4" style={styles.page}>
      <Watermark />
      <Text style={styles.sectionTitle}>
        {data.language === "en" ? "Strategic Recommendations" : "Đề xuất Chiến lược"}
      </Text>
      <Text style={styles.sectionSubtitle}>
        {data.language === "en"
          ? "Dynamic recommendations based on current simulator inputs"
          : "Đề xuất động dựa trên đầu vào mô phỏng hiện tại"}
      </Text>

      {data.recommendations.map((rec, i) => (
        <View key={i} style={styles.recItem}>
          <Text style={styles.recBullet}>→</Text>
          <Text style={styles.recText}>{rec}</Text>
        </View>
      ))}

      <View style={{ marginTop: 24 }}>
        <View style={styles.insightBox}>
          <Text style={styles.insightTitle}>
            {data.language === "en" ? "Symbiosis Insight" : "Nhận định Cộng sinh"}
          </Text>
          <Text style={styles.insightText}>
            {data.language === "en"
              ? "Engma Group's SBTi-validated targets (May 2025) anchor this projection: Scope 1+2 -20%, Scope 3 -30% by 2030, 100% renewable electricity, and net-zero by 2050. Higher simulator investments accelerate the symbiotic pathway toward Huigui-scale replication globally."
              : "Mục tiêu SBTi của Engma Group (5/2025) làm nền tảng: Phạm vi 1+2 -20%, Phạm vi 3 -30% đến 2030, 100% điện tái tạo, net-zero 2050. Đầu tư cao hơn trong mô phỏng đẩy nhanh lộ trình cộng sinh toàn cầu theo mô hình Huigui."}
          </Text>
        </View>

        <View style={[styles.insightBox, { backgroundColor: "#ecfdf5", borderLeftColor: emeraldLight }]}>
          <Text style={[styles.insightTitle, { color: emerald }]}>
            {data.language === "en" ? "Case Reference" : "Tham chiếu Case"}
          </Text>
          <Text style={[styles.insightText, { color: "#065f46" }]}>
            {data.language === "en"
              ? "Huigui Building: 15% energy reduction, 20% water savings, 2,000 fireflies released July 2025. EngmaIntec Minqin planting: RMB 6,000 first phase."
              : "Tòa nhà Huigui: giảm 15% năng lượng, 20% nước, 2.000 đom đóm tháng 7/2025. Trồng cây Mân Tần EngmaIntec: 6.000 RMB giai đoạn đầu."}
          </Text>
        </View>
      </View>

      <View style={styles.qrSection}>
        <Image src={data.qrDataUrl} style={styles.qrImage} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: emerald }}>
            {data.language === "en" ? "Continue exploring online" : "Tiếp tục khám phá trực tuyến"}
          </Text>
          <Text style={{ fontSize: 8, color: muted, marginTop: 4 }}>
            {data.language === "en"
              ? "Scan the QR code to return to the live Symbiosis Nexus experience."
              : "Quét mã QR để quay lại trải nghiệm Symbiosis Nexus trực tiếp."}
          </Text>
        </View>
      </View>

      <PageFooter pageNumber={4} totalPages={4} />
    </Page>
  );
}

export function StrategyReportDocument({ data }: { data: StrategyReportData }) {
  return (
    <Document
      title="Symbiosis Nexus 2026 — Strategy Snapshot"
      author="Symbiosis Nexus 2026"
      subject="ESG Strategy Report"
    >
      <CoverPage data={data} />
      <InputsPage data={data} />
      <ImpactPage data={data} />
      <RecommendationsPage data={data} />
    </Document>
  );
}