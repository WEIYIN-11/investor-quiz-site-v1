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

        {/* ── 社群連結（移至分數條正下方）── */}
        <div className="bg-[#161f2e] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
          <div
            className="h-0.5 w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${config.accentHex}60, transparent)` }}
          />
          <div className="p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
              加入社群 · 一起成長
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* LINE */}
              <div className="bg-[#0d1520] rounded-xl p-6 border border-white/5 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #00c300, #00a000)", boxShadow: "0 4px 16px rgba(0,195,0,0.4)" }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-base leading-snug mb-1">
                    對投資或研究 AI 有興趣歡迎加入
                  </p>
                  <p className="text-slate-500 text-sm">LINE 社群 · 即時討論</p>
                </div>
                <a
                  href="https://line.me/ti/g2/gWOaxOsBzjrY1xFfL-W_91G2Xtv49x4XiZ0wUg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl text-white text-base font-bold text-center transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #00c300, #00a000)",
                    boxShadow: "0 6px 24px rgba(0,195,0,0.45)",
                  }}
                >
                  點我加入 LINE 群組
                </a>
              </div>

              {/* Instagram */}
              <div className="bg-[#0d1520] rounded-xl p-6 border border-white/5 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", boxShadow: "0 4px 16px rgba(220,39,67,0.4)" }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-base leading-snug mb-1">
                    追蹤我的個人 IG
                  </p>
                  <p className="text-slate-500 text-sm">@cxxlkid.eth · 投資 · AI · 生活</p>
                </div>
                <a
                  href="https://www.instagram.com/cxxlkid.eth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl text-white text-base font-bold text-center transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    boxShadow: "0 6px 24px rgba(220,39,67,0.45)",
                  }}
                >
                  追蹤 Instagram
                </a>
              </div>

            </div>
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
