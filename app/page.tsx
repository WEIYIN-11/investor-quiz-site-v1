"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz, AgeRange } from "@/contexts/QuizContext";
import { AssetScale } from "@/data/questions";

const ageOptions: { value: AgeRange; label: string }[] = [
  { value: "under25", label: "25 歲以下" },
  { value: "25to35", label: "25 – 35 歲" },
  { value: "35to50", label: "35 – 50 歲" },
  { value: "over50", label: "50 歲以上" },
];

const assetOptions: { value: AssetScale; label: string; sub: string }[] = [
  { value: "low", label: "1 – 50 萬", sub: "起步累積階段" },
  { value: "mid", label: "50 – 100 萬", sub: "穩健成長階段" },
  { value: "high", label: "100 – 1000 萬", sub: "資產擴張階段" },
  { value: "ultra", label: "1000 萬以上", sub: "財富管理階段" },
];

export default function WelcomePage() {
  const router = useRouter();
  const { setUserProfile, startQuiz } = useQuiz();
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetScale | null>(null);

  function handleStart() {
    if (!selectedAge || !selectedAsset) return;
    setUserProfile(selectedAge, selectedAsset);
    startQuiz();
    router.push("/quiz");
  }

  const canStart = selectedAge !== null && selectedAsset !== null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="max-w-2xl w-full mx-auto">
          {/* Badge */}
          <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            免費 · 3 分鐘完成 · 即時分析
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e293b] leading-tight mb-4">
            你的錢，
            <span className="text-blue-500"> 適合怎麼投？</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            透過 10 道生活情境題，精準評測你的投資心理類型，
            <br className="hidden sm:block" />
            並給出最適合你的資產配置建議。
          </p>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-left space-y-8">
            {/* 年齡區間 */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                你的年齡區間
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ageOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedAge(opt.value)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all duration-150
                      ${
                        selectedAge === opt.value
                          ? "bg-[#1e293b] text-white border-[#1e293b] shadow-md"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 資產規模 */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                目前可投資資產規模
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedAsset(opt.value)}
                    className={`flex items-center gap-4 py-3.5 px-5 rounded-xl border-2 transition-all duration-150 text-left
                      ${
                        selectedAsset === opt.value
                          ? "bg-[#1e293b] text-white border-[#1e293b] shadow-md"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          selectedAsset === opt.value
                            ? "text-slate-300"
                            : "text-slate-400"
                        }`}
                      >
                        {opt.sub}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleStart}
              disabled={!canStart}
              className={`w-full py-4 rounded-xl text-base font-bold tracking-wide transition-all duration-200
                ${
                  canStart
                    ? "bg-[#1e293b] text-white hover:bg-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              開始測驗 →
            </button>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <span>✓ 不需要註冊</span>
            <span>✓ 資料不會儲存</span>
            <span>✓ 結果即時呈現</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-t border-slate-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-10">測驗流程</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "填寫基本資料",
                desc: "選擇你的年齡與資產規模，系統為你篩選最相關的題目。",
              },
              {
                step: "02",
                title: "回答 10 道情境題",
                desc: "從日常生活場景出發，自然流露你的財務直覺。",
              },
              {
                step: "03",
                title: "獲得個人化報告",
                desc: "即時分析你的投資心理類型，給出配置建議與行動指南。",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <span className="text-4xl font-black text-slate-100 mb-2">
                  {item.step}
                </span>
                <h3 className="font-bold text-[#1e293b] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
