"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "COMPLETED" | "IN PROGRESS" | "UPCOMING";
}

interface TimelineProps {
  milestones: Milestone[];
  onUpdateStatus: (id: number, status: Milestone["status"]) => void;
}

export default function Timeline({ milestones, onUpdateStatus }: TimelineProps) {
  // Styles based on status
  const getStatusBadge = (status: Milestone["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border border-emerald-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2">
            COMPLETED
          </Badge>
        );
      case "IN PROGRESS":
        return (
          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border border-blue-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2 animate-pulse">
            IN PROGRESS
          </Badge>
        );
      case "UPCOMING":
      default:
        return (
          <Badge className="bg-slate-50 text-slate-400 hover:bg-slate-50 border border-slate-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2">
            UPCOMING
          </Badge>
        );
    }
  };

  const renderIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white z-10">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        );
      case "IN PROGRESS":
        return (
          <div className="w-8 h-8 rounded-full bg-white border-[3px] border-blue-600 shadow-sm flex items-center justify-center text-blue-600 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          </div>
        );
      case "UPCOMING":
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 border-[3px] border-white shadow-sm flex items-center justify-center text-slate-300 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Timeline & Milestones
        </h2>
      </div>

      <div className="relative pl-4 flex flex-col gap-8 mt-2">
        {/* Continuous timeline line running in background */}
        <div className="absolute left-[31px] top-4 bottom-4 w-[2px] bg-slate-100" />

        {milestones.map((milestone) => {
          const isCompleted = milestone.status === "COMPLETED";

          return (
            <div key={milestone.id} className="relative flex gap-6 items-start group">
              {/* Left timeline node indicator */}
              <div className="flex items-center justify-center relative -left-[1px]">
                {renderIcon(milestone.status)}
              </div>

              {/* Card / Details area */}
              <div className="flex-1 flex justify-between items-start border-b border-slate-50 pb-5 last:border-0 last:pb-0">
                <div className="flex flex-col gap-1.5 max-w-[80%]">
                  <h3
                    className={`text-sm font-bold transition-colors duration-300 ${
                      isCompleted ? "text-slate-800" : "text-slate-700"
                    }`}
                  >
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {milestone.description}
                  </p>
                  
                  {/* Status Dropdown to cycle/set status interactively */}
                  <div className="mt-1.5 self-start">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-hidden">
                        <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                          {getStatusBadge(milestone.status)}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-white shadow-md rounded-xl border border-slate-100 p-1">
                        <DropdownMenuItem
                          onClick={() => onUpdateStatus(milestone.id, "COMPLETED")}
                          className="flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg py-2 px-3 cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onUpdateStatus(milestone.id, "IN PROGRESS")}
                          className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg py-2 px-3 cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          Mark In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onUpdateStatus(milestone.id, "UPCOMING")}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-lg py-2 px-3 cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Mark Upcoming
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Date on far right */}
                <div className="text-xs font-semibold text-slate-400 select-none pt-1">
                  {milestone.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
