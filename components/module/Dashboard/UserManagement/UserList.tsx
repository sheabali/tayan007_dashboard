"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface UserItem {
  id: string;
  name: string;
  userId: string;
  email: string;
  phone: string;
  status: "active" | "suspended";
  role: "Client" | "Creator";
  joinDate: string;
}

interface UserListProps {
  users: UserItem[];
}

const UserList = ({ users }: UserListProps) => {
  const [activeTab, setActiveTab] = useState<"Client" | "Creator">("Client");
  const [statusFilter, setStatusFilter] = useState<string>("All Users");
  const [sortOrder, setSortOrder] = useState<string>("Newest First");

  // Filtering data based on tab selection
  const filteredUsers = users.filter((user) => {
    const matchesTab = user.role === activeTab;
    const matchesStatus =
      statusFilter === "All Users" ||
      (statusFilter === "Active" && user.status === "active") ||
      (statusFilter === "Suspended" && user.status === "suspended");
    return matchesTab && matchesStatus;
  });

  const columns: ColumnDef<UserItem>[] = [
    {
      accessorKey: "name",
      header: "USER",
      cell: ({ row }) => {
        const user = row.original;
        const initial = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        const bgClass =
          user.role === "Creator"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-blue-100 text-blue-600";
        return (
          <div className="flex items-center gap-3 py-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shrink-0 ${bgClass}`}
            >
              {initial}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm leading-tight">
                {user.name}
              </span>
              <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                {user.userId}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "CONTACT",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex flex-col py-1">
            <span className="text-sm font-semibold text-slate-700 leading-tight">
              {user.email}
            </span>
            <span className="text-[11px] font-bold text-slate-400 mt-0.5">
              {user.phone}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.original.status;
        const bg =
          status === "active"
            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
            : "bg-rose-50 text-rose-600 border-rose-100";
        return (
          <span
            className={`inline-block px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider border ${bg} leading-none`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ row }) => {
        const role = row.original.role;
        const bg =
          role === "Creator"
            ? "bg-[#EEF2F6] text-[#475569]"
            : "bg-[#EFF6FF] text-[#1D4ED8]";
        return (
          <span
            className={`inline-block px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider ${bg} leading-none`}
          >
            {role}
          </span>
        );
      },
    },
    {
      accessorKey: "joinDate",
      header: "JOIN DATE",
      cell: ({ row }) => {
        return (
          <span className="text-slate-500 font-semibold text-sm">
            {row.original.joinDate}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/user/dashboard/users/${user.id}`}>
              <Button variant="ghost" className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer active:scale-90">
                <Eye className="w-4 h-4 stroke-[2]" />
              </Button>
            </Link>
            <Button variant="ghost" className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer active:scale-90">
              <Trash2 className="w-4 h-4 stroke-[2]" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Filters and controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Toggle tabs */}
        <div className="flex bg-[#E2E8F0]/70 p-1.5 rounded-2xl w-fit shadow-inner">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("Client")}
            className={`px-8 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === "Client"
                ? "bg-slate-800 text-white hover:bg-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
          >
            Clients
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("Creator")}
            className={`px-8 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === "Creator"
                ? "bg-slate-800 text-white hover:bg-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
          >
            Creators
          </Button>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          <CustomSelect
            label="Filter by Status"
            placeholder={`Status: ${statusFilter}`}
            options={["All Users", "Active", "Suspended"]}
            onChange={(val) => setStatusFilter(val)}
          />
          <CustomSelect
            label="Sort Order"
            placeholder={`Sort: ${sortOrder}`}
            options={["Newest First", "Oldest First", "Name A-Z"]}
            onChange={(val) => setSortOrder(val)}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
        <NRTable columns={columns} data={filteredUsers} />

        {/* Pagination element */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400">
            Showing 1-{filteredUsers.length} of {filteredUsers.length * 312} users
          </span>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </Button>
            <Button variant="ghost" className="w-8 h-8 flex items-center justify-center text-xs font-extrabold bg-slate-800 text-white rounded-lg shadow-sm">
              1
            </Button>
            <Button variant="ghost" className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              2
            </Button>
            <Button variant="ghost" className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              3
            </Button>
            <Button variant="ghost" className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
