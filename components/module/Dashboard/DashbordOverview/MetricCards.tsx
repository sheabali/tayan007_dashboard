"use client";

import { FileClock, PenTool, Ticket, Users } from "lucide-react";

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
    bg: "bg-green-50",
    color: "text-green-500",
  },
  users: {
    icon: Users,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  creators: {
    icon: PenTool,
    bg: "bg-fuchsia-50",
    color: "text-fuchsia-500",
  },
  applications: {
    icon: FileClock,
    bg: "bg-red-50",
    color: "text-red-500",
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
            className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex items-center justify-between"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-slate-500">
                {metric.title}
              </span>
              <span className="text-2xl font-semibold text-slate-800">
                {metric.value}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-xl ${theme.bg} ${theme.color}`}
            >
              <Icon className="w-6 h-6 stroke-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
