"use client";

import { Ticket, Users, PenTool, FileClock } from "lucide-react";

export interface MetricItem {
  title: string;
  value: string;
  type: "revenue" | "users" | "creators" | "applications";
}

interface MetricCardsProps {
  metrics: MetricItem[];
}

const themeMap = {
  revenue: {
    icon: Ticket,
    bg: "bg-[#ECFDF5]",
    color: "text-[#10B981]",
  },
  users: {
    icon: Users,
    bg: "bg-[#EFF6FF]",
    color: "text-[#3B82F6]",
  },
  creators: {
    icon: PenTool,
    bg: "bg-[#F5F3FF]",
    color: "text-[#8B5CF6]",
  },
  applications: {
    icon: FileClock,
    bg: "bg-[#FEF2F2]",
    color: "text-[#EF4444]",
  },
};

const MetricCards = ({ metrics }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => {
        const theme = themeMap[metric.type] || themeMap.revenue;
        const Icon = theme.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {metric.title}
              </span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {metric.value}
              </span>
            </div>
            <div className={`p-3.5 rounded-xl ${theme.bg} ${theme.color} transition-transform duration-300 hover:scale-110`}>
              <Icon className="w-6 h-6 stroke-[2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
