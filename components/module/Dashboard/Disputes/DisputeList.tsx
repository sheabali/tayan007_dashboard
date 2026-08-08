"use client";

import { useState, useMemo } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DisputeItem } from "./mockData";
import Image from "next/image";

interface DisputeListProps {
  disputes: DisputeItem[];
  meta?: { total: number; page: number; limit: number; totalPage: number };
  page: number;
  onPageChange: (page: number) => void;
}

const DisputeList = ({ disputes, meta, page, onPageChange }: DisputeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnDef<DisputeItem>[] = [
    {
      accessorKey: "reportId",
      header: "Report ID",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-slate-700">
          {row.original.reportId}
        </span>
      ),
    },
    {
      accessorKey: "reportDate",
      header: "Report Date",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.reportDate}
        </span>
      ),
    },
    {
      accessorKey: "reporter",
      header: "Reporter",
      cell: ({ row }) => {
        const reporter = row.original.reporter;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative">
              {reporter?.image ? (
                <Image
                  src={reporter.image}
                  alt={reporter?.name || "Reporter"}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-orange-300 to-orange-500" />
              )}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {reporter?.name || "Unknown"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "reportedUser",
      header: "Reported user",
      cell: ({ row }) => {
        const reportedUser = row.original.reportedUser;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative">
              {reportedUser?.image ? (
                <Image
                  src={reportedUser.image}
                  alt={reportedUser?.name || "Reported User"}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600" />
              )}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {reportedUser?.name || "Unknown"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Report title",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 truncate max-w-[200px] block">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const colorClass =
          status === "SOLVED" ? "text-green-500" : "text-yellow-500";
        return (
          <span className={`text-xs font-semibold ${colorClass}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const dispute = row.original;
        return (
          <Link href={`/admin/disputes/${dispute.reportId}`}>
            <Button variant="ghost" className="p-1.5 text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer h-8 w-8">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        );
      },
    },
  ];

  const filteredDisputes = useMemo(() => {
    if (!searchTerm) return disputes;
    const lowerSearch = searchTerm.toLowerCase();
    return disputes.filter(dispute => {
      return (
        dispute.title?.toLowerCase().includes(lowerSearch) ||
        dispute.reportId?.toLowerCase().includes(lowerSearch) ||
        dispute.reporter?.name?.toLowerCase().includes(lowerSearch) ||
        dispute.reportedUser?.name?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [disputes, searchTerm]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Filters and controls */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-[8px] shadow-sm border border-slate-100">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, title, or user name..."
            className="w-full outline-none text-sm text-slate-700 bg-transparent py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-slate-200 text-slate-600 h-10 px-4 rounded-[8px]">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </Button>
      </div>

      {/* Table Card */}
      <div className="bg-white p-6 rounded-[8px] shadow-sm w-full border border-slate-100">
        <NRTable columns={columns} data={filteredDisputes} />

        {/* Pagination element */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing {filteredDisputes.length} of {meta?.total ?? filteredDisputes.length} disputes
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: meta?.totalPage || 1 }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant="ghost"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 p-0 flex items-center justify-center text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  page === pageNum
                    ? "bg-[#C0962B] text-white shadow-sm hover:bg-[#b08825]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </Button>
            ))}

            <Button
              variant="ghost"
              onClick={() => onPageChange(Math.min(meta?.totalPage || 1, page + 1))}
              disabled={page === (meta?.totalPage || 1)}
              className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeList;
