"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/redux/api/dashboardApi";
import { toast } from "sonner";

export interface UserItem {
  id: string;
  name: string;
  userId?: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  joinDate: string;
}

interface UserListProps {
  users: UserItem[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  filters: {
    role: string;
    status: string;
    sort: string;
    page: number;
    limit: number;
  };
  onFilterChange: (newFilters: UserListProps['filters']) => void;
  isLoading?: boolean;
}

const ActionCell = ({ row }: { row: { original: UserItem } }) => {
  const user = row.original;
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteConfirm = async () => {
    setShowConfirm(false);
    try {
      await deleteUser(user.id).unwrap();
      toast.success(`${user.name} has been deleted successfully`);
    } catch (err) {
      console.error('Failed to delete user:', err);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Link href={`/user/dashboard/users/${user.id}`}>
          <Button variant="ghost" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer active:scale-90 h-8 w-8">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting}
          className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer active:scale-90 h-8 w-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Custom Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            style={{ animation: "modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-400" />

            <div className="px-7 py-6">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border-2 border-red-100 mx-auto mb-5">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>

              {/* Heading */}
              <h2 className="text-center text-gray-900 font-semibold text-xl mb-1">
                Delete User
              </h2>
              <p className="text-center text-gray-500 text-sm leading-relaxed mb-1">
                You are about to permanently delete
              </p>
              <p className="text-center font-semibold text-gray-800 text-base mb-2">
                &ldquo;{user.name}&rdquo;
              </p>
              <p className="text-center text-xs text-red-400 font-medium mb-6">
                This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold text-sm hover:from-red-600 hover:to-rose-600 transition-all shadow-md shadow-red-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isDeleting ? "Deleting…" : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.88) translateY(10px); }
              to   { opacity: 1; transform: scale(1)    translateY(0px);  }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

const UserList = ({ users, meta, filters, onFilterChange, isLoading }: UserListProps) => {
  const { role: activeTab, status: statusFilter, sort: sortOrder, page, limit } = filters;

  const handleTabChange = (tab: string) => {
    onFilterChange({ ...filters, role: tab, page: 1 });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    onFilterChange({ ...filters, sort, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!meta || newPage <= meta.totalPage)) {
      onFilterChange({ ...filters, page: newPage });
    }
  };

  // Handle "Name A-Z" sorting on the frontend, others rely on backend
  const filteredUsers = sortOrder === "Name A-Z" 
    ? [...users].sort((a, b) => a.name.localeCompare(b.name))
    : users;

  const columns: ColumnDef<UserItem>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        const initial = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 1); // Only 1 letter in the image avatar
        const isPro = user.role === "Creator" || user.role === "Professional" || user.role === "WORKER" || user.role === "PROFESSIONAL";
        const bgClass = isPro
            ? "bg-[#6366F1] text-white"
            : "bg-[#4F46E5] text-white";
        return (
          <div className="flex items-center gap-3 py-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm shrink-0 ${bgClass}`}
            >
              {initial}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-slate-700 text-sm">
                {user.name}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                {user.userId || `#${user.id.slice(-6)}`}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex flex-col py-1">
            <span className="text-sm font-medium text-slate-700">
              {user.email}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              {user.phone}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = status === "active" || status === "ACTIVE";
        const bg = isActive
            ? "bg-[#DCFCE7] text-[#16A34A]"
            : "bg-[#FEE2E2] text-[#DC2626]";
        return (
          <span
            className={`inline-block px-3 py-1 text-[11px] font-medium rounded-full ${bg}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        const isPro = role === "Creator" || role === "Professional" || role === "WORKER" || role === "PROFESSIONAL";
        const displayRole = isPro ? "Professional" : "Client";
        const bg = isPro
            ? "bg-indigo-100 text-indigo-700"
            : "bg-blue-100 text-blue-700";
        return (
          <span
            className={`inline-block px-3 py-1 text-[11px] font-medium rounded-full ${bg}`}
          >
            {displayRole}
          </span>
        );
      },
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => {
        return (
          <span className="text-slate-500 font-medium text-sm">
            {row.original.joinDate}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionCell row={row} />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Filters and controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Toggle tabs */}
        <div className="flex bg-white p-1.5 rounded-[16px] w-fit shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
          <Button
            variant="ghost"
            onClick={() => handleTabChange("Client")}
            className={`px-8 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer h-10 ${activeTab === "Client"
              ? "bg-[#C0962B] text-white hover:bg-[#b08825]"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            Clients
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleTabChange("Professional")}
            className={`px-8 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer h-10 ${activeTab === "Professional" || activeTab === "Creator"
              ? "bg-[#C0962B] text-white hover:bg-[#b08825]"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            Professional
          </Button>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center bg-white px-2 py-1.5 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="border-r border-slate-200 pr-2">
            <CustomSelect
              label=""
              placeholder={`Status: ${statusFilter}`}
              options={["All Users", "Active", "Suspended"]}
              onChange={(val) => handleStatusChange(val)}
            />
          </div>
          <div className="pl-2">
            <CustomSelect
              label=""
              placeholder={`Sort: ${sortOrder}`}
              options={["Newest First", "Oldest First", "Name A-Z"]}
              onChange={(val) => handleSortChange(val)}
            />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full border border-slate-100">
        <NRTable columns={columns} data={filteredUsers} />

        {/* Pagination element */}
        {meta && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
            <span className="text-sm font-medium text-slate-500">
              Showing {(page - 1) * limit + 1}-{Math.min(page * limit, meta.total)} of {meta.total} users
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="h-9 w-9 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
                .filter(p => p === 1 || p === meta.totalPage || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => {
                  return (
                    <div key={p} className="flex items-center gap-1.5">
                      {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-slate-400 px-1">...</span>}
                      <Button
                        variant="ghost"
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 p-0 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${p === page
                          ? "bg-[#C0962B] text-white shadow-sm hover:bg-[#b08825]"
                          : "text-slate-600 hover:bg-slate-50"
                          }`}>
                        {p}
                      </Button>
                    </div>
                  );
                })}

              <Button
                variant="ghost"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= meta.totalPage}
                className="h-9 w-9 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
