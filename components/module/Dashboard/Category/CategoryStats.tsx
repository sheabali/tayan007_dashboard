"use client";

import { CategoryStatItem } from "./mockData";

interface CategoryStatsProps {
  stats: CategoryStatItem[];
}

const CategoryStats = ({ stats }: CategoryStatsProps) => {
  return (
    <div className="flex gap-6 w-full max-w-xl">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-[8px] shadow-sm flex flex-col gap-2 border border-slate-100 flex-1"
        >
          <span className="text-sm font-medium text-[#1e6660]/70">
            {stat.title}
          </span>
          <span className="text-[28px] font-semibold leading-tight text-slate-800">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;
