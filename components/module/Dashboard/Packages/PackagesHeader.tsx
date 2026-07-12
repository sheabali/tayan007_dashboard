"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PackagesHeaderProps {
  onAddPackage: () => void;
}

export default function PackagesHeader({ onAddPackage }: PackagesHeaderProps) {
  const token = useAppSelector((state) => state.auth.token);
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;

  const userName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName || ""}`.trim()
    : "Admin User";

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
        Packages
      </h1>

      <div className="flex items-center gap-4">
        <Button
          onClick={onAddPackage}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl px-4 h-9 text-sm gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add new package
        </Button>

        {/* User profile widget */}
        <div className="flex items-center gap-3 bg-white pl-2.5 pr-4 py-1.5 rounded-full border border-slate-100/80 shadow-xs hover:shadow-md transition-all duration-300">
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
          <span className="text-xs font-bold text-slate-700 leading-none">
            {userName}
          </span>
        </div>
      </div>
    </div>
  );
}
