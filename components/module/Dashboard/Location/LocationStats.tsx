"use client";

export interface LocationStatItem {
  title: string;
  value: string;
}

interface LocationStatsProps {
  stats: LocationStatItem[];
}

const LocationStats = ({ stats }: LocationStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-[8px] shadow-sm flex flex-col gap-2 border border-slate-100"
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

export default LocationStats;
