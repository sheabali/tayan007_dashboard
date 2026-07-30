"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DisputeItem } from "./mockData";
import Image from "next/image";

interface DisputeListProps {
  disputes: DisputeItem[];
}

const DisputeList = ({ disputes }: DisputeListProps) => {
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
          <div className="flex items-center gap-2 py-1">
            <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden shrink-0">
              {reporter.image ? (
                <Image src={reporter.image} alt={reporter.name} width={32} height={32} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-orange-400 to-orange-600" />
              )}
            </div>
            <span className="text-sm text-slate-700">{reporter.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "reportedUser",
      header: "Reported User",
      cell: ({ row }) => {
        const user = row.original.reportedUser;
        return (
          <div className="flex items-center gap-2 py-1">
            <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden shrink-0">
              {user.image ? (
                <Image src={user.image} alt={user.name} width={32} height={32} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-orange-400 to-orange-600" />
              )}
            </div>
            <span className="text-sm text-slate-700">{user.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
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
          status === "PENDING"
            ? "text-[#FBBF24]"
            : "text-[#22C55E]";
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
          <Link href={`/admin/disputes/${dispute.id}`}>
            <Button variant="ghost" className="p-1.5 text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer h-8 w-8">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Filters and controls */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-[8px] shadow-sm border border-slate-100">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
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
        <NRTable columns={columns} data={disputes} />

        {/* Pagination element */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing 1-{disputes.length} of 1,248 users
          </span>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium bg-[#C0962B] text-white rounded-md shadow-sm hover:bg-[#b08825]">
              1
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
              2
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
              3
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeList;
