"use client";

interface ProgressBarProps {
  current: number; // 0-based current question index
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const answered = current; // 已作答題數
  const percent = Math.round((answered / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm text-slate-500">
        <span>
          第 <span className="font-semibold text-slate-700">{answered}</span> /{" "}
          {total} 題
        </span>
        <span className="font-semibold text-[#1e293b]">{percent}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1e293b] to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
