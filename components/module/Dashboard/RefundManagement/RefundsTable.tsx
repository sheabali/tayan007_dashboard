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
import { ChevronLeft, ChevronRight, User, ShieldQuestion } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface RefundItem {
  id: number;
  name: string;
  avatar: string;
  role: string;
  totalEarned: number;
  fees: number;
  netPayout: number;
  lastPayout: string;
  status: "APPROVED" | "PENDING REVIEW" | "PROCESSING" | "COMPLETED";
}

interface RefundsTableProps {
  refunds: RefundItem[];
  onProcessRefund: (id: number) => void;
  onApproveRequest: (id: number) => void;
}

export default function RefundsTable({
  refunds,
  onProcessRefund,
  onApproveRequest,
}: RefundsTableProps) {
  const [selectedRefund, setSelectedRefund] = useState<RefundItem | null>(null);
  const [activeModal, setActiveModal] = useState<"PROCESS" | "REVIEW" | null>(null);

  const formatCurrency = (val: number, isNegative = false) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
    return isNegative ? `-$${formatted.slice(1)}` : formatted;
  };

  const getStatusBadgeStyle = (status: RefundItem["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
      case "APPROVED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50 hover:bg-emerald-50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
      case "PENDING REVIEW":
        return "bg-amber-50 text-amber-600 border-amber-200/50 hover:bg-amber-50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
      case "PROCESSING":
      default:
        return "bg-blue-50 text-blue-600 border-blue-200/50 hover:bg-blue-50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    }
  };

  const handleRefundClick = (e: React.MouseEvent, refund: RefundItem) => {
    e.stopPropagation();
    setSelectedRefund(refund);
    setActiveModal("PROCESS");
  };

  const handleRowClick = (refund: RefundItem) => {
    if (refund.status === "PENDING REVIEW") {
      setSelectedRefund(refund);
      setActiveModal("REVIEW");
    } else {
      toast.info(`Creator: ${refund.name} | Status: ${refund.status}`);
    }
  };

  const handleConfirmProcess = () => {
    if (!selectedRefund) return;
    onProcessRefund(selectedRefund.id);
    toast.success(`Refund of ${formatCurrency(selectedRefund.netPayout)} processed for ${selectedRefund.name}`);
    setActiveModal(null);
    setSelectedRefund(null);
  };

  const handleConfirmApprove = () => {
    if (!selectedRefund) return;
    onApproveRequest(selectedRefund.id);
    toast.success(`Refund request approved for ${selectedRefund.name}`);
    setActiveModal(null);
    setSelectedRefund(null);
  };

  const columns: ColumnDef<RefundItem>[] = [
    {
      header: "Creator",
      accessorKey: "name",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div onClick={() => handleRowClick(item)} className="py-1 cursor-pointer flex items-center gap-3 w-full h-full">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-xs shrink-0">
              <Image
                src={item.avatar}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User className="w-4 h-4" />
              </div>
            </div>
            <span className="font-extrabold text-slate-800 text-sm">
              {item.name}
            </span>
          </div>
        );
      },
    },
    {
      header: "Total Earned",
      accessorKey: "totalEarned",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div onClick={() => handleRowClick(item)} className="py-1.5 cursor-pointer text-sm text-slate-700 font-bold w-full h-full">
            {formatCurrency(item.totalEarned)}
          </div>
        );
      },
    },
    {
      header: "Fees (15%)",
      accessorKey: "fees",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div onClick={() => handleRowClick(item)} className="py-1.5 cursor-pointer text-sm text-red-500 font-bold w-full h-full">
            {formatCurrency(item.fees, true)}
          </div>
        );
      },
    },
    {
      header: "Net Payout",
      accessorKey: "netPayout",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div onClick={() => handleRowClick(item)} className="py-1.5 cursor-pointer text-sm text-blue-600 font-extrabold w-full h-full">
            {formatCurrency(item.netPayout)}
          </div>
        );
      },
    },
    {
      header: "Last Payout",
      accessorKey: "lastPayout",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div onClick={() => handleRowClick(item)} className="py-1.5 cursor-pointer text-xs text-slate-400 font-semibold w-full h-full">
            {item.lastPayout}
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
          <div onClick={() => handleRowClick(item)} className="py-1 cursor-pointer w-full h-full flex items-center">
            <span className={`border ${getStatusBadgeStyle(item.status)} uppercase`}>
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
        return (
          <div className="py-0.5 text-right">
            {item.status === "APPROVED" ? (
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

  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col w-full hover:shadow-md transition-all duration-300">
      <div className="px-6 py-2">
        <NRTable
          columns={columns}
          data={refunds}
          emptyMessage="No refunds available."
        />
      </div>

      <div className="border-t border-slate-100 p-6 flex items-center justify-between bg-white text-xs text-slate-400 font-semibold select-none">
        <span>
          Showing 1-{refunds.length} of 1,248 users
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
            className="w-8 h-8 rounded-lg bg-[#b79140] hover:bg-[#a68238] text-white font-bold"
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

      <Dialog open={activeModal === "PROCESS"} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        {selectedRefund && (
          <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Confirm Refund Transfer
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Approve and execute electronic funds transfer (EFT) back to the user&apos;s registered bank.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 border-y border-slate-50 my-2">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
                  <Image
                    src={selectedRefund.avatar}
                    alt={selectedRefund.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">{selectedRefund.name}</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">{selectedRefund.role}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex flex-col gap-2.5 mt-1">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>Gross Payout Share</span>
                  <span>{formatCurrency(selectedRefund.totalEarned)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-red-500 font-semibold">
                  <span>Valley Fee share (15%)</span>
                  <span>-{formatCurrency(selectedRefund.fees)}</span>
                </div>
                <div className="border-t border-slate-200/60 pt-2 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-800">Net Refund Amount</span>
                  <span className="font-extrabold text-blue-600">{formatCurrency(selectedRefund.netPayout)}</span>
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
                Confirm & Send Funds
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={activeModal === "REVIEW"} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
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
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
                  <Image
                    src={selectedRefund.avatar}
                    alt={selectedRefund.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">{selectedRefund.name}</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">{selectedRefund.role}</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200/50 rounded-xl flex gap-3 text-xs leading-relaxed text-amber-800 font-medium">
                <ShieldQuestion className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block mb-0.5">Verification Required</span>
                  Ensure that this refund matches the original transaction limits and conditions before processing.
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
