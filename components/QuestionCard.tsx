"use client";

import { useState } from "react";
import { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  questionNumber: number; // 1-based
  onAnswer: (score: number) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  onAnswer,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(score: number) {
    if (selected !== null) return; // 防止重複點選
    setSelected(score);
    // 短暫延遲後跳下一題，讓使用者看到選中效果
    setTimeout(() => {
      onAnswer(score);
      setSelected(null);
    }, 400);
  }

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="animate-fadeSlideIn">
      {/* 題號 + 題目 */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-2">
          問題 {questionNumber}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] leading-snug">
          {question.text}
        </h2>
      </div>

      {/* 選項 */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const isSelected = selected === opt.score;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt.score)}
              disabled={selected !== null}
              className={`
                w-full text-left flex items-start gap-4 px-5 py-4 rounded-xl border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-[#1e293b] bg-[#1e293b] text-white shadow-lg scale-[1.01]"
                    : selected !== null
                    ? "border-slate-200 bg-slate-50 text-slate-400 cursor-default"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#1e293b] hover:bg-slate-50 hover:shadow-md cursor-pointer"
                }
              `}
            >
              <span
                className={`
                  flex-shrink-0 w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-white text-[#1e293b]"
                      : "bg-slate-100 text-slate-500"
                  }
                `}
              >
                {optionLabels[idx]}
              </span>
              <span className="text-base leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
