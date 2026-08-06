"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ShieldQuestion } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import type { RefundItem } from "./index";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface RefundsTableProps {
  refunds: RefundItem[];
  meta: Meta;
  isLoading?: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const formatCurrency = (val: number, isNegative = false) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
  return isNegative ? `-$${formatted.slice(1)}` : formatted;
};

const getStatusBadgeStyle = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAID":
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-800 border-emerald-300 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    case "APPROVED":
      return "bg-emerald-50 text-emerald-600 border-emerald-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    case "PENDING REVIEW":
    case "PENDING":
      return "bg-amber-50 text-amber-600 border-amber-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    case "PROCESSING":
    default:
      return "bg-blue-50 text-blue-600 border-blue-200/50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
  }
};

export default function RefundsTable({
  refunds,
  meta,
  isLoading,
  page,
  onPageChange,
}: RefundsTableProps) {
  const [selectedRefund, setSelectedRefund] = useState<RefundItem | null>(null);
  const [activeModal, setActiveModal] = useState<"PROCESS" | "REVIEW" | null>(null);

  // Worker = the "creator/professional" shown in the table
  const getCreatorName = (item: RefundItem) => item.worker?.fullName || "Unknown";
  const getCreatorImage = (item: RefundItem) => item.worker?.profileImage || "";

  // API field mappings matching the design columns
  // totalAmount  = what client paid (packageSubtotal + commission)
  // commission   = platform fee (15% of packageSubtotal)
  // packageSubtotal = net payout to worker
  const getTotalEarned = (item: RefundItem) => item.totalAmount;
  const getFees = (item: RefundItem) => item.commission;
  const getNetPayout = (item: RefundItem) => item.packageSubtotal;

  const handleRefundClick = (e: React.MouseEvent, refund: RefundItem) => {
    e.stopPropagation();
    setSelectedRefund(refund);
    setActiveModal("PROCESS");
  };

  const handleRowClick = (refund: RefundItem) => {
    if (refund.status.toUpperCase() === "PENDING" || refund.status.toUpperCase() === "PENDING REVIEW") {
      setSelectedRefund(refund);
      setActiveModal("REVIEW");
    } else {
      toast.info(`Creator: ${getCreatorName(refund)} | Status: ${refund.status}`);
    }
  };

  const handleConfirmProcess = () => {
    if (!selectedRefund) return;
    toast.success(
      `Refund of ${formatCurrency(getNetPayout(selectedRefund))} processed for ${getCreatorName(selectedRefund)}`
    );
    setActiveModal(null);
    setSelectedRefund(null);
  };

  const handleConfirmApprove = () => {
    if (!selectedRefund) return;
    toast.success(`Refund request approved for ${getCreatorName(selectedRefund)}`);
    setActiveModal(null);
    setSelectedRefund(null);
  };

  const columns: ColumnDef<RefundItem>[] = [
    {
      header: "Creator",
      accessorKey: "worker",
      cell: ({ row }) => {
        const item = row.original;
        const name = getCreatorName(item);
        const img = getCreatorImage(item);
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1 cursor-pointer flex items-center gap-3 w-full h-full"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-xs shrink-0 bg-slate-100 flex items-center justify-center">
              {img ? (
                <Image src={img} alt={name} fill className="object-cover" />
              ) : (
                <span className="text-slate-400 text-[10px] font-bold">
                  {getInitials(name)}
                </span>
              )}
            </div>
            <span className="font-extrabold text-slate-800 text-sm">{name}</span>
          </div>
        );
      },
    },
    {
      header: "Total Earned",
      accessorKey: "totalAmount",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1.5 cursor-pointer text-sm text-slate-700 font-bold w-full h-full"
          >
            {formatCurrency(getTotalEarned(item))}
          </div>
        );
      },
    },
    {
      header: "Fees (15%)",
      accessorKey: "commission",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1.5 cursor-pointer text-sm text-red-500 font-bold w-full h-full"
          >
            {formatCurrency(getFees(item), true)}
          </div>
        );
      },
    },
    {
      header: "Net Payout",
      accessorKey: "packageSubtotal",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1.5 cursor-pointer text-sm text-blue-600 font-extrabold w-full h-full"
          >
            {formatCurrency(getNetPayout(item))}
          </div>
        );
      },
    },
    {
      header: "Last Payout",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1.5 cursor-pointer text-xs text-slate-400 font-semibold w-full h-full"
          >
            {formatDate(item.createdAt)}
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            onClick={() => handleRowClick(item)}
            className="py-1 cursor-pointer w-full h-full flex items-center"
          >
            <span
              className={`border ${getStatusBadgeStyle(item.status)} uppercase`}
            >
              {item.status}
            </span>
          </div>
        );
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        const isApproved = item.status.toUpperCase() === "APPROVED";
        return (
          <div className="py-0.5 text-right">
            {isApproved ? (
              <Button
                size="sm"
                onClick={(e) => handleRefundClick(e, item)}
                className="h-8 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-xs py-1 px-4 cursor-pointer"
              >
                Refund
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="h-8 bg-slate-200 text-slate-400 font-bold rounded-lg text-xs py-1 px-4"
              >
                Process
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const totalPage = meta.totalPage ?? 1;
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col w-full hover:shadow-md transition-all duration-300">
      <div className="px-6 py-2">
        <NRTable
          columns={columns}
          data={refunds}
          emptyMessage={isLoading ? "Loading refunds..." : "No refunds found."}
        />
      </div>

      {/* Pagination */}
      <div className="border-t border-slate-100 p-6 flex items-center justify-between bg-white text-xs text-slate-400 font-semibold select-none">
        <span>
          Showing {refunds.length === 0 ? 0 : (meta.page - 1) * meta.limit + 1}–
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} refunds
        </span>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-lg border-slate-200 text-slate-400 hover:text-slate-600"
            disabled={page <= 1 || isLoading}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {pageNumbers.map((p) => (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              className={
                p === page
                  ? "w-8 h-8 rounded-lg bg-[#b79140] hover:bg-[#a68238] text-white font-bold"
                  : "w-8 h-8 rounded-lg border-slate-200 text-slate-500 hover:text-slate-700 font-semibold"
              }
              onClick={() => onPageChange(p)}
              disabled={isLoading}
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-lg border-slate-200 text-slate-400 hover:text-slate-600"
            disabled={page >= totalPage || isLoading}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Confirm Refund Modal */}
      <Dialog
        open={activeModal === "PROCESS"}
        onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}
      >
        {selectedRefund && (
          <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Confirm Refund Transfer
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Approve and execute electronic funds transfer (EFT) back to the
                user&apos;s registered bank.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 border-y border-slate-50 my-2">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100 flex items-center justify-center shrink-0">
                  {getCreatorImage(selectedRefund) ? (
                    <Image
                      src={getCreatorImage(selectedRefund)}
                      alt={getCreatorName(selectedRefund)}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs font-bold">
                      {getInitials(getCreatorName(selectedRefund))}
                    </span>
                  )}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">
                    {getCreatorName(selectedRefund)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium mt-1">
                    {selectedRefund.client?.fullName
                      ? `Client: ${selectedRefund.client.fullName}`
                      : "Professional"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex flex-col gap-2.5 mt-1">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>Gross Payout Share</span>
                  <span>{formatCurrency(getTotalEarned(selectedRefund))}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-red-500 font-semibold">
                  <span>Valley Fee share (15%)</span>
                  <span>-{formatCurrency(getFees(selectedRefund))}</span>
                </div>
                <div className="border-t border-slate-200/60 pt-2 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-800">
                    Net Refund Amount
                  </span>
                  <span className="font-extrabold text-blue-600">
                    {formatCurrency(getNetPayout(selectedRefund))}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveModal(null);
                  setSelectedRefund(null);
                }}
                className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmProcess}
                className="font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm &amp; Send Funds
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Review Modal */}
      <Dialog
        open={activeModal === "REVIEW"}
        onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}
      >
        {selectedRefund && (
          <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Review Refund Request
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                This transaction requires administrative clearance before release.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 border-y border-slate-50 my-2">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100 flex items-center justify-center shrink-0">
                  {getCreatorImage(selectedRefund) ? (
                    <Image
                      src={getCreatorImage(selectedRefund)}
                      alt={getCreatorName(selectedRefund)}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs font-bold">
                      {getInitials(getCreatorName(selectedRefund))}
                    </span>
                  )}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">
                    {getCreatorName(selectedRefund)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium mt-1">
                    Status: {selectedRefund.status}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200/50 rounded-xl flex gap-3 text-xs leading-relaxed text-amber-800 font-medium">
                <ShieldQuestion className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block mb-0.5">
                    Verification Required
                  </span>
                  Ensure that this refund matches the original transaction limits
                  and conditions before processing.
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveModal(null);
                  setSelectedRefund(null);
                }}
                className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
              >
                Close
              </Button>
              <Button
                onClick={handleConfirmApprove}
                className="font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Approve Refund Request
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
