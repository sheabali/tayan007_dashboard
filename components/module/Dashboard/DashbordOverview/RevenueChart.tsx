"use client";

import { useState } from "react";

export interface RevenuePoint {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenuePoint[];
}

const RevenueChart = ({ data = [] }: RevenueChartProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 500;
  const height = 200;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 80000;

  // Compute coordinates
  const points = data.map((item, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
    const y = height - paddingBottom - (item.revenue / maxVal) * chartHeight;
    return { x, y, ...item };
  });

  // Generate cubic bezier curve path
  const getBezierPath = () => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return path;
  };

  const linePath = getBezierPath();
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x},${height - paddingBottom} L ${points[0].x},${height - paddingBottom} Z`
    : "";

  // Grid lines
  const gridTicks = [0, 20000, 40000, 60000, 80000];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Monthly Revenue</h3>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1D3E35]"></span>
          <span className="text-xs text-slate-500 font-semibold">Revenue ($)</span>
        </div>
      </div>

      <div className="relative flex-1 w-full min-h-[220px]">
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D3E35" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#1D3E35" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Grid lines & Y Axis Labels */}
          {gridTicks.map((tick) => {
            const y = height - paddingBottom - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-bold font-sans"
                >
                  {tick === 0 ? "0" : tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Curved Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#1D3E35"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              {/* Larger hover target area */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={14}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Visible node */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === idx ? 6 : 4.5}
                fill="#FFFFFF"
                stroke="#8B5CF6"
                strokeWidth={2}
                className="pointer-events-none transition-all duration-200"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 6}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-bold font-sans"
            >
              {pt.month}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-slate-900/95 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all duration-200 border border-slate-800"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].y / height) * 100}%`,
              transform: "translate(-50%, -100%) translateY(-10px)",
            }}
          >
            <div className="text-[9px] text-slate-400 font-normal leading-none mb-0.5">
              {points[hoveredIdx].month} Revenue
            </div>
            <div className="font-bold text-white text-sm">
              ${points[hoveredIdx].revenue.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
