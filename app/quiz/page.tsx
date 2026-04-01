"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/contexts/QuizContext";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";

export default function QuizPage() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    result,
    assetScale,
    answerQuestion,
  } = useQuiz();

  // 如果還沒設定資料就直接訪問，導回首頁
  useEffect(() => {
    if (!assetScale) {
      router.replace("/");
    }
  }, [assetScale, router]);

  // 測驗結束後跳轉結果頁
  useEffect(() => {
    if (result) {
      router.push("/result");
    }
  }, [result, router]);

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">計算結果中…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center px-4 py-24">
      <div className="w-full max-w-xl">
        {/* 進度條 */}
        <div className="mb-8">
          <ProgressBar current={currentIndex} total={questions.length} />
        </div>

        {/* 題目卡片 */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <QuestionCard
            key={currentIndex} // key 變更觸發 re-mount，重置選中狀態
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            onAnswer={answerQuestion}
          />
        </div>

        {/* 底部提示 */}
        <p className="text-center text-slate-400 text-xs mt-6">
          點選選項後將自動進入下一題
        </p>
      </div>
    </main>
  );
}
