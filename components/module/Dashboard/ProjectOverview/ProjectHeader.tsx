"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholder from "@/src/assets/placeholders/image_placeholder.png";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface ProjectHeaderProps {
  status: string;
  title: string;
  onBack?: () => void;
}

export default function ProjectHeader({ status, title, onBack }: ProjectHeaderProps) {
  const token = useAppSelector((state) => state.auth.token);
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;

  // Map status to badge style
  const getStatusBadgeStyle = (statusStr: string) => {
    switch (statusStr.toLowerCase()) {
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200/60";
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
      case "client review":
      case "review":
        return "bg-amber-50 text-amber-600 border-amber-200/60";
      case "in progress - editing":
      case "editing":
      default:
        return "bg-blue-50 text-blue-600 border-blue-200/60";
    }
  };

  const getStatusDotColor = (statusStr: string) => {
    switch (statusStr.toLowerCase()) {
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-emerald-500";
      case "client review":
      case "review":
        return "bg-amber-500";
      case "in progress - editing":
      case "editing":
      default:
        return "bg-blue-500";
    }
  };

  const userName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName || ""}`.trim()
    : "Admin User";

  const userRole = userData?.role || "Admin";

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top row: Page title context & User Profile Widget */}
      <div className="flex justify-between items-center w-full">
        <div>
          <span className="text-sm font-semibold text-slate-400 tracking-wide uppercase">
            Project Management
          </span>
        </div>

        {/* User profile widget */}
        <div className="flex items-center gap-3 bg-white pl-2.5 pr-4 py-1.5 rounded-full border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300">
          <Avatar className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm border border-white">
            {userData?.image ? (
              <>
                <AvatarImage
                  src={userData.image}
                  alt={userName}
                  className="h-7 w-7 object-cover rounded-full"
                />
                <AvatarFallback className="rounded-full text-[10px]">
                  {userData?.firstName ? userData.firstName[0] : "A"}
                </AvatarFallback>
              </>
            ) : (
              <span className="text-white text-[10px] font-bold">AU</span>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">
              {userName}
            </span>
          </div>
        </div>
      </div>

      {/* Title & Status Badge row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(status)} shadow-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${getStatusDotColor(status)}`} />
            {status}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-1">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-all duration-200 focus:outline-hidden group"
              title="Back to projects"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </button>
          )}
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
