"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Film,
  Camera,
  Smartphone,
  Plane,
  Zap,
  Pencil,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface PackagePurchase {
  id: string;
  client: string;
  purchaseDate: string;
  status: "Completed" | "Pending";
}

export interface PackageData {
  id: number;
  name: string;
  status: "Active" | "Pending" | "Inactive";
  activeSubscriptions: number;
  totalRevenue: number;
  basePrice: number;
  description: string;
  videos: number;
  photography: number;
  equipment: string;
  droneIncluded: boolean;
  rushDelivery: boolean;
  purchases: PackagePurchase[];
  // Admin approval mode: if true, shows Approve/Reject instead of Edit
  needsApproval?: boolean;
}

interface PackageDetailsProps {
  pkg: PackageData;
  onBack: () => void;
  onEditPackage: (pkg: PackageData) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function PackageDetails({
  pkg,
  onBack,
  onEditPackage,
  onApprove,
  onReject,
}: PackageDetailsProps) {
  const [rejectOpen, setRejectOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Columns for Recent Client Purchases NRTable
  const columns: ColumnDef<PackagePurchase>[] = [
    {
      header: "Client",
      accessorKey: "client",
      cell: ({ row }) => {
        const purchase = row.original;
        return (
          <div className="py-2 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-600 shrink-0">
              {purchase.client[0]}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {purchase.client}
            </span>
          </div>
        );
      },
    },
    {
      header: "Purchase Date",
      accessorKey: "purchaseDate",
      cell: ({ row }) => (
        <div className="py-2 text-sm text-slate-500 font-medium">
          {row.original.purchaseDate}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="py-2">
            <span
              className={
                status === "Completed"
                  ? "text-emerald-600 font-bold text-sm"
                  : "text-slate-500 font-medium text-sm"
              }
            >
              {status}
            </span>
          </div>
        );
      },
    },
  ];

  const statusBadgeStyle =
    pkg.status === "Active"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : pkg.status === "Pending"
      ? "bg-amber-50 text-amber-600 border-amber-200"
      : "bg-slate-50 text-slate-500 border-slate-200";

  const deliverables = [
    { icon: Film, label: "Videos", value: String(pkg.videos) },
    { icon: Camera, label: "Photography", value: String(pkg.photography) },
    { icon: Smartphone, label: "Equipment", value: pkg.equipment },
    { icon: Plane, label: "Drone included", value: pkg.droneIncluded ? "Yes" : "No" },
    { icon: Zap, label: "Rush delivery available", value: pkg.rushDelivery ? "Yes" : "No" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* Top header row */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {pkg.name}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeStyle}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {pkg.status}
            </span>
          </div>
        </div>

        {/* User profile widget */}
        <div className="flex items-center gap-3 bg-white pl-2.5 pr-4 py-1.5 rounded-full border border-slate-100/80 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
            AU
          </div>
          <span className="text-xs font-bold text-slate-700">Admin User</span>
        </div>
      </div>

      {/* Metrics row — only shown when not in approval mode */}
      {!pkg.needsApproval && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              Active Subscriptions
            </span>
            <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
              {pkg.activeSubscriptions}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              Total Revenue
            </span>
            <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
              {formatCurrency(pkg.totalRevenue)}
            </p>
          </div>
        </div>
      )}

      {/* Main 2-column layout */}
      <div className="flex gap-6 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          {/* Package Configuration card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-extrabold text-slate-800 mb-5 tracking-tight">
              Package Configuration
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                  Base Price
                </span>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">
                  {formatCurrency(pkg.basePrice)}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                  Description
                </span>
                <p className="text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Client Purchases table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-extrabold text-slate-800 mb-1 tracking-tight">
              Recent Client Purchases
            </h2>
            <NRTable
              columns={columns}
              data={pkg.purchases}
              emptyMessage="No client purchases yet."
            />
          </div>
        </div>

        {/* Right column — Deliverables Breakdown */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5 mb-1">
              <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
                Deliverables Breakdown
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                Active per contract cycle
              </span>
            </div>

            {/* Deliverable items */}
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/80"
              >
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}

            {/* Action buttons based on mode */}
            {pkg.needsApproval ? (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  onClick={() => {
                    onApprove?.(pkg.id);
                    toast.success(`${pkg.name} has been approved!`);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl h-11 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Package
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setRejectOpen(true)}
                  className="w-full border-red-400 text-red-500 hover:bg-red-50 font-bold rounded-xl h-11 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Package
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => onEditPackage(pkg)}
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl h-10 mt-2 gap-2 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Package
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reject Confirmation Dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-800">
              Reject Package
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to reject "{pkg.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setRejectOpen(false)}
              className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onReject?.(pkg.id);
                toast.success(`${pkg.name} has been rejected.`);
                setRejectOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
