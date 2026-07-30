"use client";

import { DisputeStatItem } from "./mockData";

interface DisputeStatsProps {
  stats: DisputeStatItem[];
}

const DisputeStats = ({ stats }: DisputeStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-2"
        >
          <span className="text-sm font-medium text-slate-500">
            {stat.title}
          </span>
          <span className={`text-[28px] font-semibold leading-tight ${stat.colorClass}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DisputeStats;
