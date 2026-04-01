"use client";

interface Segment {
  label: string;
  percent: number;
  color: string;
}

interface AllocationChartProps {
  segments: Segment[];
  dark?: boolean; // true = 深色背景版本
}

export default function AllocationChart({ segments, dark = false }: AllocationChartProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  const labelColor  = dark ? "text-slate-300" : "text-slate-700";
  const valueColor  = dark ? "text-white"     : "text-[#1e293b]";
  const trackColor  = dark ? "#ffffff0d"      : "#f1f5f9";
  const centerLabel = dark ? "text-slate-500" : "text-slate-400";
  const centerValue = dark ? "text-white"     : "text-[#1e293b]";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      {/* 環狀圖 */}
      <div className="relative flex-shrink-0">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          {/* 底層軌道圓 */}
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="28"
          />
          {segments.map((seg, i) => {
            const strokeDash   = (seg.percent / 100) * circumference;
            const strokeOffset = circumference - cumulative * (circumference / 100);
            cumulative += seg.percent;
            return (
              <circle
                key={i}
                cx="90" cy="90" r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="26"
                strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            );
          })}
        </svg>
        {/* 中心文字 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xs font-medium ${centerLabel}`}>配置建議</span>
          <span className={`text-2xl font-bold ${centerValue}`}>100%</span>
        </div>
      </div>

      {/* 圖例 + 橫條 */}
      <div className="flex-1 space-y-3.5 w-full">
        {segments.map((seg, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5 text-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className={`font-medium ${labelColor}`}>{seg.label}</span>
              </div>
              <span className={`font-bold tabular-nums ${valueColor}`}>{seg.percent}%</span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: trackColor }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${seg.percent}%`,
                  backgroundColor: seg.color,
                  boxShadow: dark ? `0 0 6px ${seg.color}80` : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
