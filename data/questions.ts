export type AssetScale = "low" | "mid" | "high" | "ultra";
export type AgeRange   = "under25" | "25to35" | "35to50" | "over50";

export interface Option {
  text: string;
  score: number; // 1=保守 2=穩健 3=成長 4=積極
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 各資產規模的「低標基準金額」
// low=1萬 / mid=50萬 / high=100萬 / ultra=1000萬
// ─────────────────────────────────────────────────────────────────────────────
export const ASSET_BASE: Record<AssetScale, { amount: number; label: string }> = {
  low:   { amount: 10_000,     label: "1 萬"     },
  mid:   { amount: 500_000,    label: "50 萬"    },
  high:  { amount: 1_000_000,  label: "100 萬"   },
  ultra: { amount: 10_000_000, label: "1,000 萬" },
};

// ─── 數字 → 「X 萬」或千分位格式 ────────────────────────────────
function formatTW(n: number): string {
  if (n >= 10_000) {
    const wan = n / 10_000;
    return `${Number.isInteger(wan) ? wan.toLocaleString("zh-TW") : wan.toFixed(0)} 萬`;
  }
  return n.toLocaleString("zh-TW");
}

// ─── 佔位符替換 ────────────────────────────────────────────────
// {{amount}}       → 資產低標 × 100%   (1萬 / 50萬 / 100萬 / 1000萬)
// {{amount_half}}  → 資產低標 ×  50%
// {{amount_fifth}} → 資產低標 ×  20%
function injectAmounts(text: string, scale: AssetScale): string {
  const { amount, label } = ASSET_BASE[scale];
  const note = `（以您的 ${label} 資產低標計算）`;
  const fmt  = (n: number) => `${formatTW(n)} 元 ${note}`;

  return text
    .replace(/\{\{amount\}\}/g,       fmt(amount))
    .replace(/\{\{amount_half\}\}/g,  fmt(Math.round(amount * 0.5)))
    .replace(/\{\{amount_fifth\}\}/g, fmt(Math.round(amount * 0.2)));
}

// ─────────────────────────────────────────────────────────────────────────────
// 精華題庫：8 道生活情境題（全年齡 × 全資產通用）
// 差異只在 {{amount}} 動態金額數字
// ─────────────────────────────────────────────────────────────────────────────
interface RawQuestion {
  id: number;
  text: string;
  options: Option[];
}

const RAW: RawQuestion[] = [
  // Q1 ─ 意外之財（衡量風險偏好的初始直覺）
  {
    id: 1,
    text: "你突然獲得一筆 {{amount}} 的意外之財，你會怎麼安排？",
    options: [
      { text: "全存銀行定存，安心最重要",           score: 1 },
      { text: "一半存款、一半買低風險基金",         score: 2 },
      { text: "大部分投入指數 ETF，少部分備用",     score: 3 },
      { text: "全押高報酬商品，讓錢生錢",           score: 4 },
    ],
  },

  // Q2 ─ 帳面損失（衡量損失厭惡）
  {
    id: 2,
    text: "你的投資組合本月暴跌 20%，帳面損失約 {{amount_fifth}}，你的反應是？",
    options: [
      { text: "非常焦慮，立刻賣出停損",             score: 1 },
      { text: "有點不安，但先觀察再說",             score: 2 },
      { text: "冷靜看待，市場波動很正常",           score: 3 },
      { text: "反而興奮，這是加碼的好機會！",       score: 4 },
    ],
  },

  // Q3 ─ 朋友推薦投資（衡量 FOMO 與盡職調查習慣）
  {
    id: 3,
    text: "朋友力薦一個進場門檻為 {{amount_half}} 的投資項目，預期年報酬 20%，你會？",
    options: [
      { text: "金額不小、風險不明，直接婉拒",       score: 1 },
      { text: "先索取完整計畫書和財務資料再決定",   score: 2 },
      { text: "用閒置資金小額試水，觀察後再加碼",   score: 3 },
      { text: "報酬誘人，馬上決定全力投入",         score: 4 },
    ],
  },

  // Q4 ─ 超市特價行為（衡量消費衝動 vs 理性節制）
  {
    id: 4,
    text: "超市今天牛肉特價五折，平常不太買，這時你會？",
    options: [
      { text: "不需要就不買，免得浪費",             score: 1 },
      { text: "買一點放冰箱，能省就省",             score: 2 },
      { text: "多買一些，反正早晚要吃",             score: 3 },
      { text: "大量掃貨！特價機會難得",             score: 4 },
    ],
  },

  // Q5 ─ 回報模式選擇（最直接的風險偏好測試）
  {
    id: 5,
    text: "如果讓你選一種長期投資回報模式，你傾向？",
    options: [
      { text: "每年穩定 3%，絕對不虧損",            score: 1 },
      { text: "平均 6%，偶爾小幅波動",              score: 2 },
      { text: "平均 12%，但某年可能跌 20%",         score: 3 },
      { text: "可能賺 50% 也可能賠 30%，願意賭",    score: 4 },
    ],
  },

  // Q6 ─ 危機加碼（衡量風險承受與機會認知）
  {
    id: 6,
    text: "市場剛重挫 30%，你手邊有 {{amount}} 的閒置資金，你會？",
    options: [
      { text: "繼續觀望，等更明確的回升訊號",       score: 1 },
      { text: "分三批慢慢買入，降低進場均成本",     score: 2 },
      { text: "大幅加碼，危機就是最好的入場點",     score: 3 },
      { text: "All in！最低點就是現在",             score: 4 },
    ],
  },

  // Q7 ─ 社群熱股（衡量從眾心理與獨立判斷力）
  {
    id: 7,
    text: "同事說他靠一支股票今年獲利了 {{amount_half}}，力推你也跟進，你會？",
    options: [
      { text: "謝謝好意，不懂的東西絕對不碰",       score: 1 },
      { text: "好奇了解邏輯，但不輕易跟進",         score: 2 },
      { text: "查一下基本面，有機會小倉參與",       score: 3 },
      { text: "立刻買入，錯過太可惜！",             score: 4 },
    ],
  },

  // Q8 ─ 頭期款安排（衡量目標導向 vs 短期獲利心態）
  {
    id: 8,
    text: "你計劃 3 年內買房，手頭剛好存到 {{amount}} 的頭期款，你會如何安排這筆錢？",
    options: [
      { text: "全放定存，確保 3 年後本金完整",      score: 1 },
      { text: "買保守型債券基金，小幅增值",         score: 2 },
      { text: "一半股票 ETF、一半固定收益",         score: 3 },
      { text: "全押股票，3 年夠長了",               score: 4 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 主要輸出函式
// 接收 assetScale → 注入動態金額 → 回傳 8 道 Question
// ─────────────────────────────────────────────────────────────────────────────
export function getQuestions(assetScale: AssetScale): Question[] {
  return RAW.map((q) => ({
    id:      q.id,
    text:    injectAmounts(q.text, assetScale),
    options: q.options,
  }));
}
