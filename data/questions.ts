export type AssetScale = "low" | "mid" | "high" | "ultra";
export type AgeRange = "under25" | "25to35" | "35to50" | "over50";

export interface Option {
  text: string;
  score: number; // 1=保守 2=穩健 3=成長 4=積極
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface TaggedQuestion extends Question {
  assetTags: AssetScale[]; // 適合哪些資產規模
  ageTags: AgeRange[];     // 適合哪些年齡層（空陣列 = 全年齡通用）
}

// ─────────────────────────────────────────────────────────────────────────────
// 題庫：35 題，每題同時標記 assetTags + ageTags
// ─────────────────────────────────────────────────────────────────────────────
const ALL: TaggedQuestion[] = [

  // ══════════════════════════════════════════════════════
  // SECTION A｜通用情境（所有資產 × 所有年齡）8 題
  // ══════════════════════════════════════════════════════
  {
    id: 1,
    text: "朋友突然傳訊說有支「一定漲」的股票，你的第一反應是？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "謝謝，這種消息聽聽就好", score: 1 },
      { text: "先查公司基本面再決定", score: 2 },
      { text: "小倉位試水，有機會就進場", score: 3 },
      { text: "馬上買，機會不等人！", score: 4 },
    ],
  },
  {
    id: 2,
    text: "超市今天牛肉特價五折，你平常不太吃，你會？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "不需要就不買，省得浪費", score: 1 },
      { text: "買一點，能省就省", score: 2 },
      { text: "多買一些，反正早晚要吃", score: 3 },
      { text: "大量掃貨！特價機會難得", score: 4 },
    ],
  },
  {
    id: 3,
    text: "你的投資組合這個月跌了 15%，你的心情是？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "非常焦慮，想立刻全部賣掉", score: 1 },
      { text: "有點擔心，先觀察不動作", score: 2 },
      { text: "冷靜，市場波動很正常", score: 3 },
      { text: "興奮！這是加碼的好機會", score: 4 },
    ],
  },
  {
    id: 4,
    text: "刮刮樂中了 10 萬元，你打算怎麼用這筆意外之財？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "全存定存，安心最重要", score: 1 },
      { text: "一半存款、一半買基金", score: 2 },
      { text: "大部分投入股市，少部分備用", score: 3 },
      { text: "全押高報酬商品，讓錢生錢", score: 4 },
    ],
  },
  {
    id: 5,
    text: "如果可以自由選擇一種投資回報方式，你傾向？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "每年穩定 3%，絕對不虧損", score: 1 },
      { text: "平均 6%，偶爾小幅波動", score: 2 },
      { text: "平均 12%，但某年可能跌 20%", score: 3 },
      { text: "可能賺 50% 也可能賠 30%，願意賭", score: 4 },
    ],
  },
  {
    id: 6,
    text: "同事說靠加密幣今年翻了三倍，你的反應是？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "替他高興，但我不碰這種東西", score: 1 },
      { text: "好奇了解，但不會跟進", score: 2 },
      { text: "研究看看，或許可以小試", score: 3 },
      { text: "立刻問他怎麼買，我也要進場！", score: 4 },
    ],
  },
  {
    id: 7,
    text: "一個初創公司朋友邀你入股，說即將 IPO，你會？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "婉拒，新創倒閉率太高", score: 1 },
      { text: "先看財務報表與商業計畫", score: 2 },
      { text: "用小筆閒置資金參與", score: 3 },
      { text: "這是難得機會，大量投入！", score: 4 },
    ],
  },
  {
    id: 8,
    text: "你即將收到一筆年終獎金，你的第一反應是？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "全存起來以備不時之需", score: 1 },
      { text: "規劃一部分投資，一部分存款", score: 2 },
      { text: "大部分投入市場，趁機加碼", score: 3 },
      { text: "找一個高報酬機會全部押進去", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION B｜低資產 × 年輕（第一桶金 / 消費習慣）6 題
  //   assetTags: low  |  ageTags: under25, 25to35
  // ══════════════════════════════════════════════════════
  {
    id: 9,
    text: "你剛出社會，每月薪水 3.5 萬，你會怎麼分配？",
    assetTags: ["low"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "先付生活費，剩下全存定存", score: 1 },
      { text: "先存固定金額，其餘正常花用", score: 2 },
      { text: "先扣投資款，剩下才安排支出", score: 3 },
      { text: "先把閒錢全丟股市，感受市場", score: 4 },
    ],
  },
  {
    id: 10,
    text: "你存了第一筆 10 萬元，準備開始投資，你會？",
    assetTags: ["low"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "全放定存，先保住本金", score: 1 },
      { text: "買一點低風險基金試試", score: 2 },
      { text: "買 ETF，長期持有慢慢累積", score: 3 },
      { text: "選幾支潛力股，嘗試快速翻倍", score: 4 },
    ],
  },
  {
    id: 11,
    text: "朋友揪你一起去出國旅遊，費用約 4 萬，但這是你當月的積蓄，你會？",
    assetTags: ["low"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "婉拒，不能動用積蓄", score: 1 },
      { text: "找便宜機票，省一點去", score: 2 },
      { text: "去！年輕就要趁現在，下個月多存", score: 3 },
      { text: "刷卡分期，先爽再說", score: 4 },
    ],
  },
  {
    id: 12,
    text: "你考慮買一台新手機，看到 0 利率分期 24 期，你會？",
    assetTags: ["low", "mid"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "不喜歡負債，存夠了再買", score: 1 },
      { text: "分期可以，但選中階機型就好", score: 2 },
      { text: "利用 0 利率，把現金留著投資", score: 3 },
      { text: "直接入手最高規格，反正不用馬上付", score: 4 },
    ],
  },
  {
    id: 13,
    text: "你正在考慮辭職創業，有個想法但還不成熟，你手頭有 20 萬存款，你會？",
    assetTags: ["low", "mid"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "先不要，創業風險太高，留著保命", score: 1 },
      { text: "先做副業測試可行性再說", score: 2 },
      { text: "辭職，用存款撐 6 個月全力衝刺", score: 3 },
      { text: "馬上辭職，機會是等不來的！", score: 4 },
    ],
  },
  {
    id: 14,
    text: "「FIRE（財務自由、提早退休）」的概念你怎麼看？",
    assetTags: ["low", "mid"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "空想，踏實工作才是正道", score: 1 },
      { text: "理想很好，但需要非常保守的計畫", score: 2 },
      { text: "值得努力，我願意為此壓縮消費投資", score: 3 },
      { text: "我的目標！願意承擔高風險加速達成", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION C｜低/中資產 × 中年（家庭責任 / 保障規劃）5 題
  //   assetTags: low, mid  |  ageTags: 35to50
  // ══════════════════════════════════════════════════════
  {
    id: 15,
    text: "子女要上安親班加才藝課，每月多出 1.5 萬，你打算？",
    assetTags: ["low", "mid"],
    ageTags: ["35to50"],
    options: [
      { text: "壓縮其他支出，這錢一定要出", score: 1 },
      { text: "選擇其中一項，量力而為", score: 2 },
      { text: "用投資收益支付，不動主要薪資", score: 3 },
      { text: "繼續借貸投資，以後收益會更多", score: 4 },
    ],
  },
  {
    id: 16,
    text: "保險業務員建議你加買一份儲蓄險，年繳 12 萬，20 年後解約，你會？",
    assetTags: ["low", "mid"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "保障優先，立刻簽約", score: 1 },
      { text: "先比較其他方案再決定", score: 2 },
      { text: "同樣的錢定期投入ETF，報酬更高", score: 3 },
      { text: "完全不買儲蓄險，資金自己控管", score: 4 },
    ],
  },
  {
    id: 17,
    text: "你家的房子貸款還剩 300 萬，手頭剛好多出 50 萬，你會？",
    assetTags: ["low", "mid"],
    ageTags: ["35to50"],
    options: [
      { text: "優先還房貸，減少負債最安心", score: 1 },
      { text: "一半還貸、一半保守投資", score: 2 },
      { text: "全部投入股市，報酬率比房貸利率高", score: 3 },
      { text: "借更多錢加碼投資，槓桿放大報酬", score: 4 },
    ],
  },
  {
    id: 18,
    text: "你在評估是否幫小孩設立教育基金，需每月撥出 5000 元，你的想法？",
    assetTags: ["low", "mid", "high"],
    ageTags: ["35to50"],
    options: [
      { text: "放定存專戶，確保到時候本金在", score: 1 },
      { text: "買低波動的平衡型基金", score: 2 },
      { text: "投入股票型 ETF，10 年成長潛力大", score: 3 },
      { text: "選成長型基金，追求最大化教育金", score: 4 },
    ],
  },
  {
    id: 19,
    text: "你身體最近狀況不太好，考慮加強醫療保障，手頭有 30 萬，你會？",
    assetTags: ["low", "mid"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "先把保險完整補起來，其他再說", score: 1 },
      { text: "保險與儲蓄各一半安排", score: 2 },
      { text: "投資為主，保險只買基本", score: 3 },
      { text: "全投資，用收益支付任何醫療費用", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION D｜低/中資產 × 銀髮（退休後現金流）3 題
  //   assetTags: low, mid  |  ageTags: over50
  // ══════════════════════════════════════════════════════
  {
    id: 20,
    text: "你即將退休，每月退休金約 2.5 萬，你打算怎麼安排剩餘存款？",
    assetTags: ["low", "mid"],
    ageTags: ["over50"],
    options: [
      { text: "全放定存，保住本金最重要", score: 1 },
      { text: "配置一半債券基金補充收入", score: 2 },
      { text: "留三成股票，其餘防守性資產", score: 3 },
      { text: "繼續積極投資，退休金不夠就靠報酬補", score: 4 },
    ],
  },
  {
    id: 21,
    text: "理財顧問建議你把退休金的 40% 配置在股票，你覺得？",
    assetTags: ["low", "mid", "high"],
    ageTags: ["over50"],
    options: [
      { text: "太多了，退休後不該這麼激進", score: 1 },
      { text: "可以接受 20-25%，不超過這個比例", score: 2 },
      { text: "40% 合理，還有很長的壽命期", score: 3 },
      { text: "40% 太少，應該要更多才能跑贏通膨", score: 4 },
    ],
  },
  {
    id: 22,
    text: "你的孩子希望你把部分存款借他創業，金額是你存款的三成，你會？",
    assetTags: ["low", "mid", "high", "ultra"],
    ageTags: ["over50"],
    options: [
      { text: "婉拒，這是我的退休保命錢", score: 1 },
      { text: "借一小部分，其餘要留著自用", score: 2 },
      { text: "評估計畫後決定，支持他但也保護自己", score: 3 },
      { text: "爽快答應，家人成功比什麼都重要", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION E｜中資產 × 年輕/中年（資產配置入門）4 題
  //   assetTags: mid, high  |  ageTags: under25, 25to35, 35to50
  // ══════════════════════════════════════════════════════
  {
    id: 23,
    text: "你有 80 萬存款，朋友說現在進場股市是好時機，你會？",
    assetTags: ["mid"],
    ageTags: ["under25", "25to35", "35to50"],
    options: [
      { text: "先不動，等更確定的訊號", score: 1 },
      { text: "分三個月慢慢買入，降低時機風險", score: 2 },
      { text: "一次性買入一半，另一半備用", score: 3 },
      { text: "全部一次進場，不要猶豫！", score: 4 },
    ],
  },
  {
    id: 24,
    text: "你在考慮租屋還是買房，目前手頭有 80 萬可以當頭期款，你的選擇？",
    assetTags: ["mid"],
    ageTags: ["under25", "25to35"],
    options: [
      { text: "繼續租，買房壓力太大", score: 1 },
      { text: "先買小一點的，穩穩起步", score: 2 },
      { text: "努力貸款買好一點的，資產早點坐大", score: 3 },
      { text: "借到最大額度買，房子最保值！", score: 4 },
    ],
  },
  {
    id: 25,
    text: "你打算配置部分資金在海外市場，你的首選是？",
    assetTags: ["mid", "high"],
    ageTags: ["under25", "25to35", "35to50"],
    options: [
      { text: "美國公債 ETF，安全第一", score: 1 },
      { text: "全球股票型指數基金（如 VT）", score: 2 },
      { text: "新興市場 ETF，成長潛力大", score: 3 },
      { text: "單一市場槓桿 ETF，報酬最大化", score: 4 },
    ],
  },
  {
    id: 26,
    text: "朋友提議合夥開一間咖啡廳，需要出資 30 萬，你會？",
    assetTags: ["mid", "high"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "拒絕，餐飲業倒閉率太高", score: 1 },
      { text: "先看完整商業計畫書再評估", score: 2 },
      { text: "用閒錢試試，失敗也不影響生活", score: 3 },
      { text: "爽快答應，有朋友一起更有信心", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION F｜高資產 × 中年/全年齡（多元配置 / 稅務）5 題
  //   assetTags: high, ultra  |  ageTags: 全部 or 35to50+
  // ══════════════════════════════════════════════════════
  {
    id: 27,
    text: "你考慮把 20% 的資金配置在私募股權基金，鎖定期 3 年，年化預期 15%，你會？",
    assetTags: ["high", "ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "鎖定期太長，流動性不夠，不考慮", score: 1 },
      { text: "只用 5-10% 的資金試水", score: 2 },
      { text: "20% 合理，願意接受流動性換報酬", score: 3 },
      { text: "非常吸引人，願意配置超過一半", score: 4 },
    ],
  },
  {
    id: 28,
    text: "房地產開發商邀你認購一個建案，需 300 萬起，年報酬預估 10%，你會？",
    assetTags: ["high", "ultra"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "金額太大，風險難以控管", score: 1 },
      { text: "先請律師與財務顧問做盡職調查", score: 2 },
      { text: "評估後有興趣，可以考慮配置", score: 3 },
      { text: "看起來不錯，早決定早佔先機", score: 4 },
    ],
  },
  {
    id: 29,
    text: "稅務顧問建議你設立控股公司合法節稅，年可省下約 80 萬稅金，你的態度？",
    assetTags: ["high", "ultra"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "這類安排讓我不安，維持現狀", score: 1 },
      { text: "評估法律風險後再決定", score: 2 },
      { text: "合法節稅很合理，願意規劃", score: 3 },
      { text: "非常有興趣，同時想最大化節稅效果", score: 4 },
    ],
  },
  {
    id: 30,
    text: "你的公司提供股票選擇權 (ESOP)，估計 3 年後市值約 500 萬，你會？",
    assetTags: ["high", "ultra"],
    ageTags: ["25to35", "35to50"],
    options: [
      { text: "到期立刻全部變現，落袋為安", score: 1 },
      { text: "賣出一半，留一半繼續參與成長", score: 2 },
      { text: "先持有，評估公司未來走勢再說", score: 3 },
      { text: "繼續持有全部，相信公司會繼續漲", score: 4 },
    ],
  },
  {
    id: 31,
    text: "子女想去英美留學，預估總費用 400 萬，你打算如何籌備這筆錢？",
    assetTags: ["high", "ultra"],
    ageTags: ["35to50"],
    options: [
      { text: "先存再說，不夠就縮減計畫", score: 1 },
      { text: "現在開始每月定期投資低風險基金", score: 2 },
      { text: "配置成長型股票組合，10 年後夠用", score: 3 },
      { text: "積極投資，爭取提前達標", score: 4 },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECTION G｜超高資產（傳承 / 信託 / 全球布局）5 題
  //   assetTags: ultra  |  ageTags: 35to50 or over50 (or all)
  // ══════════════════════════════════════════════════════
  {
    id: 32,
    text: "你在考慮投資一家 Pre-IPO 科技新創，估值 10 億美元，你的看法？",
    assetTags: ["ultra"],
    ageTags: ["under25", "25to35", "35to50", "over50"],
    options: [
      { text: "估值太高，泡沫風險大，不考慮", score: 1 },
      { text: "仔細研究技術與商業模式再決定", score: 2 },
      { text: "用閒置資金配置 5-10% 參與", score: 3 },
      { text: "大膽配置，早期進場倍數最高！", score: 4 },
    ],
  },
  {
    id: 33,
    text: "資產管理人建議把 20% 資金放入境外信託，主要目的為節稅與傳承，你的想法？",
    assetTags: ["ultra"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "不太了解，先維持現有安排", score: 1 },
      { text: "有興趣，但需要完整法律評估", score: 2 },
      { text: "合理規劃，同意進一步討論", score: 3 },
      { text: "非常支持，同時想探索更多避稅結構", score: 4 },
    ],
  },
  {
    id: 34,
    text: "你在考慮是否設立家族辦公室，統一管理家族財富與傳承，你的想法？",
    assetTags: ["ultra"],
    ageTags: ["35to50", "over50"],
    options: [
      { text: "成本太高，維持現有財管服務即可", score: 1 },
      { text: "評估成本效益後再決定", score: 2 },
      { text: "有必要，正在規劃中", score: 3 },
      { text: "已在做，還想進一步整合全球資產", score: 4 },
    ],
  },
  {
    id: 35,
    text: "你的財務顧問建議設立慈善基金會，可同時達成傳承與節稅目的，你會？",
    assetTags: ["ultra"],
    ageTags: ["over50"],
    options: [
      { text: "捐款給現有機構就好，不需要另設", score: 1 },
      { text: "有點興趣，先了解運作方式", score: 2 },
      { text: "值得考慮，與家人討論後決定", score: 3 },
      { text: "很有意義，積極推動成立", score: 4 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 工具函式：Fisher-Yates 洗牌（純函式，不修改原陣列）
// ─────────────────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// 主要篩選函式
//
// 優先順序：
//   P1 — 同時符合 assetTags 與 ageTags  → 最先出現
//   P2 — 僅符合 assetTags               → 補充
//   P3 — 通用題 (4 個 tag 全有)          → 最後兜底
//
// 每個 pool 內部個別洗牌，確保每次測驗題目組合不同
// ─────────────────────────────────────────────────────────────────────────────
export function getQuestions(assetScale: AssetScale, ageRange: AgeRange): Question[] {
  const matchesAsset = (q: TaggedQuestion) => q.assetTags.includes(assetScale);
  const matchesAge   = (q: TaggedQuestion) => q.ageTags.includes(ageRange);

  const p1 = ALL.filter(q => matchesAsset(q) && matchesAge(q));
  const p2 = ALL.filter(q => matchesAsset(q) && !matchesAge(q));
  const p3 = ALL.filter(q => !matchesAsset(q) && matchesAge(q)); // 萬一 p1+p2 不足

  const pool = [
    ...shuffle(p1),
    ...shuffle(p2),
    ...shuffle(p3),
  ];

  // 去重（理論上不會有重複，但防禦性保留）
  const seen = new Set<number>();
  const unique = pool.filter(q => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });

  // 取前 10 題，去除標籤欄位，只回傳 Question 結構
  return unique.slice(0, 10).map(({ assetTags: _a, ageTags: _g, ...q }) => q);
}
