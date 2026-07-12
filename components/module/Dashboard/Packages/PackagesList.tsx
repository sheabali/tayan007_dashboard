"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Package, Users, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { PackageData } from "./PackageDetails";
import PackagesHeader from "./PackagesHeader";

interface PackagesListProps {
  packages: PackageData[];
  onViewPackage: (pkg: PackageData) => void;
  onDeletePackage: (id: number) => void;
  onAddPackage: () => void;
}

export default function PackagesList({
  packages,
  onViewPackage,
  onDeletePackage,
  onAddPackage,
}: PackagesListProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(val);
  };

  const getStatusStyle = (status: PackageData["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px] tracking-wider py-0.5 px-2 rounded-full";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200 font-bold text-[10px] tracking-wider py-0.5 px-2 rounded-full";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200 font-bold text-[10px] tracking-wider py-0.5 px-2 rounded-full";
    }
  };

  const totalActive = packages.filter((p) => p.status === "Active").length;
  const totalSubscriptions = packages.reduce((s, p) => s + p.activeSubscriptions, 0);
  const totalRevenue = packages.reduce((s, p) => s + p.totalRevenue, 0);

  const columns: ColumnDef<PackageData>[] = [
    {
      header: "Package Name",
      accessorKey: "name",
      cell: ({ row }) => {
        const pkg = row.original;
        return (
          <div className="py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 text-sm">{pkg.name}</span>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="py-2">
          <span className={`border ${getStatusStyle(row.original.status)}`}>
            {row.original.status}
          </span>
        </div>
      ),
    },
    {
      header: "Active Subscriptions",
      accessorKey: "activeSubscriptions",
      cell: ({ row }) => (
        <div className="py-2 text-sm font-bold text-slate-700">
          {row.original.activeSubscriptions}
        </div>
      ),
    },
    {
      header: "Base Price",
      accessorKey: "basePrice",
      cell: ({ row }) => (
        <div className="py-2 text-sm font-bold text-slate-700">
          {formatCurrency(row.original.basePrice)}
        </div>
      ),
    },
    {
      header: "Total Revenue",
      accessorKey: "totalRevenue",
      cell: ({ row }) => (
        <div className="py-2 text-sm font-extrabold text-blue-600">
          {formatCurrency(row.original.totalRevenue)}
        </div>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const pkg = row.original;
        return (
          <div
            className="py-0.5 flex items-center justify-end gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onViewPackage(pkg)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="View package"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onDeletePackage(pkg.id);
                toast.success("Package deleted");
              }}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete package"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* Header */}
      <PackagesHeader onAddPackage={onAddPackage} />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              Active Packages
            </span>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{totalActive}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              Total Subscriptions
            </span>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{totalSubscriptions}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all duration-300">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              Total Revenue
            </span>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Packages NRTable */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden px-6 py-2 hover:shadow-md transition-all duration-300">
        <NRTable
          columns={columns}
          data={packages}
          emptyMessage="No packages found. Click 'Add new package' to create one."
        />
      </div>
    </div>
  );
}
