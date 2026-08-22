"use client";

import { Brush, FileCheck, UserPlus, Users } from "lucide-react";

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
    icon: Brush,
    bg: "bg-[#FDF2F8]", // Soft pink
    color: "text-[#EC4899]",
  },
  signups: {
    icon: UserPlus,
    bg: "bg-[#ECFDF5]", // Soft green
    color: "text-[#10B981]",
  },
  applications: {
    icon: FileCheck,
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
            className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-500">
                {stat.title}
              </span>
              <span className="text-[28px] font-semibold text-slate-800 leading-tight">
                {stat.value}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-xl ${theme.bg} ${theme.color} transition-transform duration-300 hover:scale-110`}
            >
              <Icon className="w-6 h-6 stroke-[2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
