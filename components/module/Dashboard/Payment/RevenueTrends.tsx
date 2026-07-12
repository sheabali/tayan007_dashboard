"use client";

import { useState } from "react";

interface TrendDataPoint {
  month: string;
  grossVolume: number;
  netRevenue: number;
}

interface RevenueTrendsProps {
  data?: TrendDataPoint[];
}

const defaultTrendData: TrendDataPoint[] = [
  { month: "May", grossVolume: 35000, netRevenue: 15000 },
  { month: "Jun", grossVolume: 55000, netRevenue: 28000 },
  { month: "Jul", grossVolume: 42000, netRevenue: 22000 },
  { month: "Aug", grossVolume: 72000, netRevenue: 38000 },
  { month: "Sep", grossVolume: 58000, netRevenue: 30000 },
  { month: "Oct", grossVolume: 68000, netRevenue: 35000 },
];

export default function RevenueTrends({ data = defaultTrendData }: RevenueTrendsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG parameters
  const width = 600;
  const height = 280;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 80000;

  // Compute coordinates for bars and line nodes
  const points = data.map((item, idx) => {
    // X center of this month's column
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;

    // Y heights
    const grossY = height - paddingBottom - (item.grossVolume / maxVal) * chartHeight;
    const netY = height - paddingBottom - (item.netRevenue / maxVal) * chartHeight;

    return {
      x,
      grossY,
      netY,
      ...item,
    };
  });

  // Calculate Bezier line path for Gross Volume
  const getBezierPath = () => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x},${points[0].grossY}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.grossY;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.grossY;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.grossY}`;
    }
    return path;
  };

  const linePath = getBezierPath();
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x},${height - paddingBottom} L ${points[0].x},${height - paddingBottom} Z`
    : "";

  const gridTicks = [0, 20000, 40000, 60000, 80000];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col h-full w-full hover:shadow-md transition-all duration-300">
      {/* Header with Title and Legend */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          Revenue Trends
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Gross Volume
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BFDBFE]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Net Revenue
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 w-full min-h-[220px]">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            {/* Area gradient for line chart */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#1E293B" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* 1. Horizontal Grid Lines & Y Axis Ticks */}
          {gridTicks.map((tick) => {
            const y = height - paddingBottom - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F8FAFC"
                  strokeWidth={1.5}
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] font-bold fill-slate-400 font-sans"
                >
                  {tick === 0 ? "0" : `$${(tick / 1000)}k`}
                </text>
              </g>
            );
          })}

          {/* 2. Vertical Net Revenue Bars */}
          {points.map((pt, idx) => {
            const barWidth = 24;
            const barHeight = height - paddingBottom - pt.netY;
            return (
              <g key={idx}>
                {/* Background column guide */}
                <rect
                  x={pt.x - barWidth / 2}
                  y={paddingTop}
                  width={barWidth}
                  height={chartHeight}
                  fill="#F8FAFC/20"
                  className="pointer-events-none"
                />
                {/* Net Revenue Bar */}
                <rect
                  x={pt.x - barWidth / 2}
                  y={pt.netY}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx={4}
                  fill="#EFF6FF"
                  stroke="#DBEAFE"
                  strokeWidth={1}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
                {/* Overlay highlight bar on hover */}
                {hoveredIdx === idx && (
                  <rect
                    x={pt.x - barWidth / 2}
                    y={pt.netY}
                    width={barWidth}
                    height={Math.max(barHeight, 2)}
                    rx={4}
                    fill="#3B82F6"
                    opacity={0.15}
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}

          {/* 3. Gross Volume Area & Curve Line */}
          <path d={areaPath} fill="url(#areaGradient)" className="pointer-events-none" />
          <path
            d={linePath}
            fill="none"
            stroke="#1E293B"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          />

          {/* 4. Interactive Nodes for Gross Volume */}
          {points.map((pt, idx) => (
            <g key={idx}>
              {/* Invisible larger hover trigger circle */}
              <circle
                cx={pt.x}
                cy={pt.grossY}
                r={16}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Visible node circle */}
              <circle
                cx={pt.x}
                cy={pt.grossY}
                r={hoveredIdx === idx ? 6 : 4}
                fill="#FFFFFF"
                stroke="#1E293B"
                strokeWidth={2.5}
                className="pointer-events-none transition-all duration-200"
              />
            </g>
          ))}

          {/* 5. X Axis Labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 12}
              textAnchor="middle"
              className="text-[10px] font-bold fill-slate-400 font-sans"
            >
              {pt.month}
            </text>
          ))}
        </svg>

        {/* 6. Floating Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-slate-900/95 text-white text-xs font-semibold px-3 py-2.5 rounded-xl shadow-xl pointer-events-none transition-all duration-200 border border-slate-800/80 backdrop-blur-xs flex flex-col gap-1 w-32"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].grossY / height) * 100}%`,
              transform: "translate(-50%, -100%) translateY(-15px)",
            }}
          >
            <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase leading-none">
              {points[hoveredIdx].month}
            </span>
            <div className="flex flex-col gap-0.5 border-t border-slate-800 pt-1.5 mt-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 font-medium">Gross:</span>
                <span className="font-bold">${points[hoveredIdx].grossVolume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 font-medium">Net:</span>
                <span className="font-bold text-blue-400">${points[hoveredIdx].netRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
