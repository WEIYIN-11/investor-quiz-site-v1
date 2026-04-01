"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { AssetScale, AgeRange, Question, getQuestions } from "@/data/questions";

export type { AgeRange };

export type InvestorType = "conservative" | "balanced" | "growth" | "aggressive";

export interface QuizState {
  // 歡迎頁資料
  ageRange: AgeRange | null;
  assetScale: AssetScale | null;

  // 測驗進行
  questions: Question[];
  currentIndex: number;
  answers: number[]; // 每題得分

  // 結果
  result: InvestorType | null;
  totalScore: number;
}

interface QuizContextValue extends QuizState {
  setUserProfile: (age: AgeRange, asset: AssetScale) => void;
  startQuiz: () => void;
  answerQuestion: (score: number) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  ageRange: null,
  assetScale: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  result: null,
  totalScore: 0,
};

const QuizContext = createContext<QuizContextValue | null>(null);

function calcResult(totalScore: number, maxScore: number): InvestorType {
  const ratio = totalScore / maxScore;
  if (ratio <= 0.35) return "conservative";
  if (ratio <= 0.55) return "balanced";
  if (ratio <= 0.75) return "growth";
  return "aggressive";
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>(initialState);

  const setUserProfile = useCallback((age: AgeRange, asset: AssetScale) => {
    setState((prev) => ({ ...prev, ageRange: age, assetScale: asset }));
  }, []);

  const startQuiz = useCallback(() => {
    setState((prev) => {
      if (!prev.assetScale || !prev.ageRange) return prev;
      const questions = getQuestions(prev.assetScale, prev.ageRange);
      return {
        ...prev,
        questions,
        currentIndex: 0,
        answers: [],
        result: null,
        totalScore: 0,
      };
    });
  }, []);

  const answerQuestion = useCallback((score: number) => {
    setState((prev) => {
      const newAnswers = [...prev.answers, score];
      const nextIndex = prev.currentIndex + 1;
      const isLast = nextIndex >= prev.questions.length;

      if (isLast) {
        const total = newAnswers.reduce((a, b) => a + b, 0);
        const maxScore = prev.questions.length * 4; // 最高每題 4 分
        const result = calcResult(total, maxScore);
        return {
          ...prev,
          answers: newAnswers,
          currentIndex: nextIndex,
          totalScore: total,
          result,
        };
      }

      return {
        ...prev,
        answers: newAnswers,
        currentIndex: nextIndex,
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setUserProfile,
        startQuiz,
        answerQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}

// ── 結果設定 ────────────────────────────────────────────────────
export const resultConfig: Record<
  InvestorType,
  {
    label: string;
    tagline: string;
    description: string;
    /** CSS background value — 用於 header 卡片的深色漸層 */
    gradient: string;
    /** Hex 顏色 — 用於分數條、行動編號圓圈等小元件 */
    accentHex: string;
    /** Tailwind text class — 用於卡片標題文字 */
    textColor: string;
    allocation: { label: string; percent: number; color: string }[];
    tips: string[];
  }
> = {
  // ── 保守型：深海藍 × 白金銀 ──────────────────────────────────
  conservative: {
    label: "保守型投資人",
    tagline: "穩如磐石，安心第一",
    description:
      "你非常重視資金安全，不喜歡承擔不確定性。對你來說，能睡個好覺比追求高報酬更重要。建議以固定收益商品為主，小幅配置低波動資產。",
    gradient:
      "linear-gradient(135deg, #0d1f3c 0%, #162d52 55%, #0a1628 100%)",
    accentHex: "#5b8db8",
    textColor: "text-sky-400",
    allocation: [
      { label: "現金 / 定存", percent: 40, color: "#b8c9d8" }, // 白金銀
      { label: "債券基金",    percent: 40, color: "#4a7fa5" }, // 鋼鐵藍
      { label: "股票 ETF",   percent: 15, color: "#c9a84c" }, // 古典金
      { label: "其他",        percent: 5,  color: "#374151" }, // 碳灰
    ],
    tips: [
      "選擇政府公債或高評級企業債 ETF，優先穩定配息",
      "定存採階梯式操作（3/6/12 個月），保持流動彈性",
      "股票部位集中生活必需股（食品、公用事業），降低波動",
    ],
  },

  // ── 穩健型：深林綠 × 黃金 ──────────────────────────────────
  balanced: {
    label: "穩健型投資人",
    tagline: "攻守兼備，長期複利",
    description:
      "你在風險與報酬之間尋求平衡，能接受短期波動但不希望太劇烈。適合股債均衡的投資組合，搭配長期持有的紀律。",
    gradient:
      "linear-gradient(135deg, #092f1f 0%, #1a5c3c 55%, #061a10 100%)",
    accentHex: "#d4af37",
    textColor: "text-emerald-400",
    allocation: [
      { label: "股票 ETF",    percent: 45, color: "#d4af37" }, // 黃金
      { label: "債券基金",    percent: 35, color: "#1a6644" }, // 森林綠
      { label: "現金 / 定存", percent: 15, color: "#5aab7e" }, // 翡翠
      { label: "另類 / 商品", percent: 5,  color: "#475569" }, // 岩板
    ],
    tips: [
      "以全球股票指數 ETF（VT / VWRA）為核心長期持有",
      "搭配美國中期公債 ETF（IEF）對沖股市波動",
      "每年 12 月做一次再平衡，維持目標配置比例",
    ],
  },

  // ── 成長型：皇家深藍 × 香檳金 ──────────────────────────────
  growth: {
    label: "成長型投資人",
    tagline: "擁抱波動，追求成長",
    description:
      "你能接受市場起伏，長期看好股市成長潛力。風險承受度較高，適合以股票為主的投資組合，並可適度配置高成長資產。",
    gradient:
      "linear-gradient(135deg, #1a1060 0%, #2c1e90 55%, #0c0830 100%)",
    accentHex: "#d4af37",
    textColor: "text-violet-400",
    allocation: [
      { label: "股票 ETF / 個股",  percent: 65, color: "#d4af37" }, // 香檳金
      { label: "新興市場",          percent: 15, color: "#4c1d95" }, // 皇家紫
      { label: "債券 / 固定收益",  percent: 15, color: "#6d28d9" }, // 紫羅蘭
      { label: "現金",              percent: 5,  color: "#475569" }, // 岩板
    ],
    tips: [
      "以 S&P 500 / Nasdaq-100 ETF 為主力，搭配單一成長股衛星",
      "新興市場 ETF 增加地域分散，把握長期人口紅利",
      "保留 5-10% 現金，市場重挫時作為加碼彈藥",
    ],
  },

  // ── 積極型：帝王深紅 × 燃金 ──────────────────────────────
  aggressive: {
    label: "積極型投資人",
    tagline: "高風高報，全力衝刺",
    description:
      "你對市場波動的容忍度極高，追求最大資本增值。你相信短期痛苦換長期豐碩成果，適合高股票比例，甚至包含另類投資。",
    gradient:
      "linear-gradient(135deg, #3d0a0a 0%, #6b1414 40%, #1a1a2e 100%)",
    accentHex: "#c9a227",
    textColor: "text-amber-400",
    allocation: [
      { label: "成長股 / ETF",           percent: 60, color: "#c9a227" }, // 燃金
      { label: "新興市場 / 主題投資",    percent: 20, color: "#7f1d1d" }, // 帝王紅
      { label: "另類資產（REITs/商品）", percent: 15, color: "#92400e" }, // 深琥珀
      { label: "現金",                    percent: 5,  color: "#475569" }, // 岩板
    ],
    tips: [
      "聚焦高成長科技、生技、AI 主題 ETF 作為核心倉位",
      "可配置不超過 5% 於加密資產，增加非相關性分散",
      "嚴格執行停損紀律，避免情緒化覆蓋既定計畫",
    ],
  },
};
