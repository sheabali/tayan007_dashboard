/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

export function NavUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    dispatch(logout());
    router.push("/login?redirect=" + pathname);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          className="text-[#f03a47] hover:text-[#d92d39] hover:bg-red-50 rounded-none py-6 px-6 flex items-center mb-4"
        >
          <LogOut className="mr-4 h-5 w-5" strokeWidth={1.5} />
          <span className="text-[15px] font-normal">Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
