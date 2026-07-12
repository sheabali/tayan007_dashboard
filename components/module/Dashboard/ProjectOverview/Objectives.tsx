"use client";

import { Check } from "lucide-react";

interface Objective {
  id: number;
  text: string;
  completed: boolean;
}

interface ObjectivesProps {
  description: string;
  objectives: Objective[];
  onToggleObjective: (id: number) => void;
}

export default function Objectives({
  description,
  objectives,
  onToggleObjective,
}: ObjectivesProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-3">
          Project Overview
        </h2>
        
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Description
        </span>
        <p className="text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="border-t border-slate-50 pt-5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-4">
          Key Objectives
        </span>

        {/* 2x2 or 1x2 Grid for objectives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              onClick={() => onToggleObjective(objective.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Checkbox box */}
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                  objective.completed
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-200 group-hover:border-blue-400 bg-slate-50/50"
                }`}
              >
                {objective.completed && (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-300 select-none ${
                  objective.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {objective.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
