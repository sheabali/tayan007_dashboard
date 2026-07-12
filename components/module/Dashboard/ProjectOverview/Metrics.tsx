"use client";

import { Calendar, Wallet, TrendingUp } from "lucide-react";

interface MetricsProps {
  daysRemaining: number;
  deadline: string;
  budget: number;
  progress: number;
}

export default function Metrics({
  daysRemaining,
  deadline,
  budget,
  progress,
}: MetricsProps) {
  // Format currency
  const formattedBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(budget);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Days Remaining Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[140px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Days Remaining
          </span>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {daysRemaining}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            Deadline: {deadline}
          </span>
        </div>
      </div>

      {/* Total Budget Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[140px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Total Budget
          </span>
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Wallet className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {formattedBudget}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            Allocated Budget
          </span>
        </div>
      </div>

      {/* Creator Progress Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[140px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Creator Progress
          </span>
          <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
            <TrendingUp className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {progress}%
            </span>
          </div>
          {/* Progress Bar container */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
