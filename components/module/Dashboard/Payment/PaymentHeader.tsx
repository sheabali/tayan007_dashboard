"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PaymentHeader() {
  const token = useAppSelector((state) => state.auth.token);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userData } = useGetMeQuery(undefined, { skip: !token }) as any;

  const userName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName || ""}`.trim()
    : "Admin User";

  return (
    <div className="flex justify-between items-center w-full mb-2">
      <h1 className="text-[32px] font-serif text-[#2a3b32] tracking-tight">
        Payment Management
      </h1>

      {/* User profile widget */}
      <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shadow-sm shrink-0 border-none">
             {userData?.image && <AvatarImage src={userData.image} alt={userName} className="object-cover" />}
             <AvatarFallback className="bg-transparent text-white text-xs font-bold"></AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-slate-700">{userName}</span>
      </div>
    </div>
  );
}
