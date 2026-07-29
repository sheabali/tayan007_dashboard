"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "@/src/assets/logo.png";
import {
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  Users,
  Briefcase,
  AlertTriangle,
  MapPin,
  Workflow
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  user: {
    navMain: [
      {
        title: "Dashboard",
        url: "/user",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/user/dashboard/users",
        icon: Users,
      },
    ],
  },
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/user/dashboard/users",
        icon: Users,
      },
      {
        title: "Applications",
        url: "/admin/applications",
        icon: ClipboardCheck,
      },
      {
        title: "Jobs",
        url: "/admin/jobs",
        icon: Briefcase,
      },
      {
        title: "Payment",
        url: "/admin/payment",
        icon: CreditCard,
      },
      {
        title: "Disputes",
        url: "/admin/disputes",
        icon: AlertTriangle,
      },
      {
        title: "Location",
        url: "/admin/location",
        icon: MapPin,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: Workflow,
      },
    ],
  },
};

// add roles based on your requirements
interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-white border-r border-blue-200"
      {...props}
    >
      <SidebarHeader>
        <Link
          href={"/"}
          className="flex items-center w-full max-h-40 justify-center my-10"
        >
          <Image
            src={Logo.src}
            alt="Logo"
            width={500}
            height={500}
            // className="w-100px h-100px object-contain"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
