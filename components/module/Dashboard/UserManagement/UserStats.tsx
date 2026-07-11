"use client";

import { Users, PenTool, UserPlus, FileClock } from "lucide-react";

export interface UserStatItem {
  title: string;
  value: string;
  type: "clients" | "creators" | "signups" | "applications";
}

interface UserStatsProps {
  stats: UserStatItem[];
}

const themeMap = {
  clients: {
    icon: Users,
    bg: "bg-[#EFF6FF]", // Soft blue
    color: "text-[#3B82F6]",
  },
  creators: {
    icon: PenTool,
    bg: "bg-[#F5F3FF]", // Soft purple
    color: "text-[#8B5CF6]",
  },
  signups: {
    icon: UserPlus,
    bg: "bg-[#ECFDF5]", // Soft green
    color: "text-[#10B981]",
  },
  applications: {
    icon: FileClock,
    bg: "bg-[#FEF2F2]", // Soft red
    color: "text-[#EF4444]",
  },
};

const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const theme = themeMap[stat.type] || themeMap.clients;
        const Icon = theme.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {stat.value}
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

export default UserStats;
