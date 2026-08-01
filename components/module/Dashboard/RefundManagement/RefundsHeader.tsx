"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RefundsHeader() {
  const token = useAppSelector((state) => state.auth.token);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;

  const userName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName || ""}`.trim()
    : "Admin User";

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <span className="text-xl md:text-2xl font-serif text-[#1e293b]">
          Refund Management
        </span>
      </div>

      {/* User profile widget */}
      <div className="flex items-center gap-3 pl-2.5 pr-4 py-1.5 rounded-full border border-slate-100/80 transition-all duration-300">
        <Avatar className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm border border-white">
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
            <span className="text-white text-[10px] font-bold"></span>
          )}
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-700 leading-none">
            {userName}
          </span>
        </div>
      </div>
    </div>
  );
}
