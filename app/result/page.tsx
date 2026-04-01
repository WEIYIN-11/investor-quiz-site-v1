"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz, resultConfig, InvestorType } from "@/contexts/QuizContext";
import AllocationChart from "@/components/AllocationChart";

const typeIconMap: Record<InvestorType, string> = {
  conservative: "🛡️",
  balanced: "⚖️",
  growth: "🌱",
  aggressive: "🚀",
};

const ageLabel: Record<string, string> = {
  under25: "25 歲以下",
  "25to35": "25–35 歲",
  "35to50": "35–50 歲",
  over50: "50 歲以上",
};

const assetLabel: Record<string, string> = {
  low: "1–50 萬",
  mid: "50–100 萬",
  high: "100–1000 萬",
  ultra: "1000 萬以上",
};

export default function ResultPage() {
  const router = useRouter();
  const { result, totalScore, questions, ageRange, assetScale, resetQuiz } =
    useQuiz();

  useEffect(() => {
    if (!result) router.replace("/");
  }, [result, router]);

  if (!result) return null;

  const config = resultConfig[result];
  const maxScore = questions.length * 4;
  const scorePercent = Math.round((totalScore / maxScore) * 100);

  function handleRetake() {
    resetQuiz();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#0f1623] px-4 py-24">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── 結果頭部：深色漸層 + 金線裝飾 ── */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: config.gradient }}
        >
          {/* 頂部金線 */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${config.accentHex}, transparent)`,
            }}
          />
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">{typeIconMap[result]}</div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
              style={{ color: config.accentHex }}
            >
              投資心理類型評測結果
            </p>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight"
              style={{ textShadow: `0 0 32px ${config.accentHex}55` }}
            >
              {config.label}
            </h1>
            <p className="text-base text-white/70 font-medium">{config.tagline}</p>

            {/* 個人標籤 */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {ageRange && (
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium border"
                  style={{
                    borderColor: `${config.accentHex}60`,
                    color: config.accentHex,
                    background: `${config.accentHex}18`,
                  }}
                >
                  {ageLabel[ageRange]}
                </span>
              )}
              {assetScale && (
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium border"
                  style={{
                    borderColor: `${config.accentHex}60`,
                    color: config.accentHex,
                    background: `${config.accentHex}18`,
                  }}
                >
                  資產 {assetLabel[assetScale]}
                </span>
              )}
            </div>
          </div>
          {/* 底部金線 */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${config.accentHex}80, transparent)`,
            }}
          />
        </div>

        {/* ── 分數計量 ── */}
        <div className="bg-[#161f2e] rounded-2xl border border-white/5 shadow-xl p-6">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-slate-400">風險偏好指數</span>
            <span className="font-bold text-white">
              {totalScore}
              <span className="text-slate-500 font-normal"> / {maxScore} 分</span>
            </span>
          </div>
          {/* 軌道 */}
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${scorePercent}%`,
                background: `linear-gradient(90deg, ${config.accentHex}99, ${config.accentHex})`,
                boxShadow: `0 0 8px ${config.accentHex}80`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-2">
            <span>保守</span>
            <span>穩健</span>
            <span>成長</span>
            <span>積極</span>
          </div>
        </div>

        {/* ── 個性描述 ── */}
        <div className="bg-[#161f2e] rounded-2xl border border-white/5 shadow-xl p-6">
          <h2 className={`text-sm font-bold mb-3 uppercase tracking-widest ${config.textColor}`}>
            關於你的投資個性
          </h2>
          <p className="text-slate-300 leading-relaxed text-[15px]">{config.description}</p>
        </div>

        {/* ── 資產配置圖 ── */}
        <div className="bg-[#161f2e] rounded-2xl border border-white/5 shadow-xl p-6">
          <h2 className={`text-sm font-bold mb-6 uppercase tracking-widest ${config.textColor}`}>
            建議資產配置
          </h2>
          <AllocationChart segments={config.allocation} dark />
        </div>

        {/* ── 行動指南 ── */}
        <div className="bg-[#161f2e] rounded-2xl border border-white/5 shadow-xl p-6">
          <h2 className={`text-sm font-bold mb-5 uppercase tracking-widest ${config.textColor}`}>
            行動指南
          </h2>
          <ul className="space-y-4">
            {config.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{ background: config.accentHex }}
                >
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 免責聲明 ── */}
        <p className="text-center text-slate-600 text-xs leading-relaxed px-4">
          本測驗結果僅供參考，不構成任何投資建議。實際投資決策請諮詢合格財務顧問。
        </p>

        {/* ── 重新測驗 ── */}
        <div className="flex justify-center pb-8">
          <button
            onClick={handleRetake}
            className="font-bold py-3.5 px-12 rounded-xl text-black transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${config.accentHex}, ${config.accentHex}cc)`,
              boxShadow: `0 4px 20px ${config.accentHex}55`,
            }}
          >
            重新測驗
          </button>
        </div>
      </div>
    </main>
  );
}
