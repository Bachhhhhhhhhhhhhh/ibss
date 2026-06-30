"use client";

import { Clock, FileText, Video, Shield, Languages, Bot } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { COMPETITION_DEADLINE, scoringCriteria, competitionRules } from "@/lib/data/competition";
import { useI18nStore } from "@/lib/stores/i18n";
import { format } from "date-fns";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a855f7", "#ef4444"];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl premium-card flex items-center justify-center">
        <span className="text-2xl md:text-4xl font-display text-gradient-emerald tabular-nums" aria-live="polite">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-white/40 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function CompetitionHubSection() {
  const countdown = useCountdown(COMPETITION_DEADLINE);
  const language = useI18nStore((s) => s.language);

  const chartData = scoringCriteria.map((c) => ({
    name: language === "en" ? c.name.split(" ")[0] : c.nameVi.split(" ")[0],
    fullName: language === "en" ? c.name : c.nameVi,
    points: c.points,
  }));

  return (
    <SectionWrapper
      id="competition"
      sectionNumber="07"
      eyebrow={language === "en" ? "IBSS 2026" : "IBSS 2026"}
      title={language === "en" ? "Competition Hub" : "Trung tâm Cuộc thi"}
      subtitle={language === "en" ? "Rules, scoring, deliverables — everything you need for a winning submission" : "Quy tắc, chấm điểm, sản phẩm — mọi thứ cần cho bài nộp chiến thắng"}
    >
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-amber-400" />
              {language === "en" ? "Submission Countdown" : "Đếm ngược Nộp bài"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/50 mb-6">
              {language === "en" ? "Deadline: " : "Hạn chót: "}
              <time dateTime={COMPETITION_DEADLINE.toISOString()}>
                {format(COMPETITION_DEADLINE, "PPpp")} (Beijing Time)
              </time>
            </p>
            {countdown.isPast ? (
              <p className="text-amber-400 text-lg font-medium">
                {language === "en" ? "Deadline has passed" : "Đã qua hạn chót"}
              </p>
            ) : (
              <div className="flex gap-4 justify-center" role="timer" aria-label="Countdown to submission deadline">
                <CountdownUnit value={countdown.days} label={language === "en" ? "Days" : "Ngày"} />
                <CountdownUnit value={countdown.hours} label={language === "en" ? "Hours" : "Giờ"} />
                <CountdownUnit value={countdown.minutes} label={language === "en" ? "Min" : "Phút"} />
                <CountdownUnit value={countdown.seconds} label={language === "en" ? "Sec" : "Giây"} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "en" ? "Key Deliverables" : "Sản phẩm Bắt buộc"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <FileText className="h-8 w-8 text-emerald-400" />
              <div>
                <p className="font-medium text-white">{language === "en" ? "PowerPoint Presentation" : "Bài thuyết trình PowerPoint"}</p>
                <p className="text-sm text-white/50">{language === "en" ? "Comprehensive ESG strategy proposal" : "Đề xuất chiến lược ESG toàn diện"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <Video className="h-8 w-8 text-amber-400" />
              <div>
                <p className="font-medium text-white">{language === "en" ? "15-Minute Video" : "Video 15 phút"}</p>
                <p className="text-sm text-white/50">{language === "en" ? "Team presentation recording" : "Bản ghi thuyết trình của đội"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "en" ? "Scoring Criteria (100 Points)" : "Tiêu chí Chấm điểm (100 điểm)"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]" role="img" aria-label="Scoring criteria chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" domain={[0, 30]} stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
                  <Tooltip
                    contentStyle={{ background: "rgba(5,46,22,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                    formatter={(value, _name, props) => [`${value} pts`, (props.payload as { fullName: string }).fullName]}
                  />
                  <Bar dataKey="points" radius={[0, 6, 6, 0]} isAnimationActive animationDuration={800}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {scoringCriteria.map((c) => (
                <div key={c.name} className="flex justify-between text-sm">
                  <span className="text-white/70">{language === "en" ? c.name : c.nameVi}</span>
                  <span className="text-emerald-400 font-medium">{c.points} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "en" ? "Competition Rules" : "Quy tắc Cuộc thi"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{language === "en" ? "Double-Blind Evaluation" : "Đánh giá Kín đôi"}</p>
                <p className="text-sm text-white/50">{language === "en" ? competitionRules.format : competitionRules.formatVi}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Languages className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{language === "en" ? "Language Consistency" : "Nhất quán Ngôn ngữ"}</p>
                <p className="text-sm text-white/50">{language === "en" ? competitionRules.language : competitionRules.languageVi}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{language === "en" ? "AI Disclosure Required" : "Yêu cầu Công bố AI"}</p>
                <p className="text-sm text-white/50">{language === "en" ? competitionRules.aiDisclosure : competitionRules.aiDisclosureVi}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-white/40">
                {language === "en" ? "Total Score: 100 points • Theme: Engma Group Symbiosis Philosophy & Global ESG Strategy" : "Tổng điểm: 100 • Chủ đề: Triết lý Cộng sinh & Chiến lược ESG Toàn cầu Engma Group"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}