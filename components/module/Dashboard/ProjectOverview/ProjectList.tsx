"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  PenTool,
  UserCheck,
  Eye,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Creator {
  name: string;
  avatar: string;
  role: string;
}

interface Objective {
  id: number;
  text: string;
  completed: boolean;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "COMPLETED" | "IN PROGRESS" | "UPCOMING";
}

interface Deliverable {
  id: number;
  title: string;
  type: "JPG" | "MP4";
  sizeOrStatus: string;
  url: string;
}

interface ProjectData {
  id: number;
  name: string;
  creator: Creator | null;
  client: string;
  stage: string;
  deadline: string;
  daysRemaining: number;
  budget: number;
  objectives: Objective[];
  milestones: Milestone[];
  deliverables: Deliverable[];
}

interface ProjectListProps {
  projects: ProjectData[];
  onViewProject: (project: ProjectData) => void;
  onDeleteProject: (projectId: number) => void;
  onAssignCreator: (projectId: number, creator: Creator) => void;
}

const mockCreators: Creator[] = [
  { name: "Jordan Rivera", avatar: "/images/marcus_profile.png", role: "Lifestyle Photographer" },
  { name: "Sarah Lee", avatar: "/images/sofia_profile.png", role: "Video Editor" },
  { name: "David Kim", avatar: "/images/david_profile.png", role: "Graphic Designer" },
];

export default function ProjectList({
  projects,
  onViewProject,
  onDeleteProject,
  onAssignCreator,
}: ProjectListProps) {
  const token = useAppSelector((state) => state.auth.token);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;

  // Map stage to badge styles
  const getStageBadgeStyle = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "editing":
        return "bg-blue-50 text-blue-600 border-blue-200/50";
      case "shoot":
        return "bg-purple-50 text-purple-600 border-purple-200/50";
      case "client review":
      case "review":
        return "bg-amber-50 text-amber-600 border-amber-200/50";
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200/50";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200/50";
    }
  };

  const userName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName || ""}`.trim()
    : "Admin User";

  // Calculate Metrics based on project state
  const inProductionCount = projects.filter(
    (p) => p.stage.toLowerCase() === "editing" || p.stage.toLowerCase() === "shoot"
  ).length;
  
  const reviewCount = projects.filter(
    (p) => p.stage.toLowerCase() === "client review" || p.stage.toLowerCase() === "review"
  ).length;

  const completedCount = projects.filter(
    (p) => p.stage.toLowerCase() === "completed"
  ).length;

  // Define Columns for NRTable
  const columns: ColumnDef<ProjectData>[] = [
    {
      header: "Project Name",
      accessorKey: "name",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {project.name ? project.name[0] : "P"}
            </div>
            <span className="font-bold text-slate-700 text-sm">
              {project.name}
            </span>
          </div>
        );
      },
    },
    {
      header: "Assigned Creator",
      accessorKey: "creator",
      cell: ({ row }) => {
        const project = row.original;
        return project.creator ? (
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-100 shadow-xs shrink-0">
              <Image
                src={project.creator.avatar}
                alt={project.creator.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-slate-600 text-sm font-semibold">
              {project.creator.name}
            </span>
          </div>
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 gap-1.5 rounded-lg text-xs font-bold py-1 px-2.5 cursor-pointer"
                >
                  Assign creator
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-slate-100 p-1 w-56 rounded-xl shadow-md">
                {mockCreators.map((c) => (
                  <DropdownMenuItem
                    key={c.name}
                    onClick={() => {
                      onAssignCreator(project.id, c);
                      toast.success(`Creator ${c.name} assigned successfully!`);
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-100">
                      <Image
                        src={c.avatar}
                        alt={c.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{c.role}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      header: "Client",
      accessorKey: "client",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 font-semibold">
          {row.original.client}
        </span>
      ),
    },
    {
      header: "Stage",
      accessorKey: "stage",
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStageBadgeStyle(row.original.stage)} shadow-xs`}>
          {row.original.stage}
        </span>
      ),
    },
    {
      header: "Deadline",
      accessorKey: "deadline",
      cell: ({ row }) => (
        <span className="text-sm text-slate-500 font-medium">
          {row.original.deadline}
        </span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onViewProject(project)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="View project details"
            >
              <Eye className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => {
                onDeleteProject(project.id);
                toast.success("Project deleted successfully");
              }}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete project"
            >
              <Trash2 className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* 1. Header Row */}
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

      {/* 2. Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* In Production Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              In Production
            </span>
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {inProductionCount + 20}
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Review Stage Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Review Stage
            </span>
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {reviewCount + 9}
            </span>
          </div>
          <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
            <PenTool className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Completed
            </span>
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {completedCount + 42}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="w-6 h-6 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* 3. Projects Table card using NRTable */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col w-full px-6 py-2">
        <NRTable columns={columns} data={projects} emptyMessage="No projects available." />

        {/* Pagination bar */}
        <div className="border-t border-slate-100 py-4 flex items-center justify-between bg-white text-xs text-slate-400 font-semibold select-none">
          <span>
            Showing 1-{projects.length} of 1,248 users
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-lg border-slate-200 text-slate-400 hover:text-slate-600"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
            >
              1
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-lg border-slate-200 text-slate-500 hover:text-slate-700 font-semibold"
              onClick={() => toast.info("Navigating to page 2")}
            >
              2
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-lg border-slate-200 text-slate-500 hover:text-slate-700 font-semibold"
              onClick={() => toast.info("Navigating to page 3")}
            >
              3
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-lg border-slate-200 text-slate-400 hover:text-slate-600"
              onClick={() => toast.info("Navigating to next page")}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
