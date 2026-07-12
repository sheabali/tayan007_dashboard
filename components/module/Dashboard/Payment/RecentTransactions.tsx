"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  client: string;
  creator: string;
  amount: number;
  fee: number;
  status: "COMPLETED" | "PENDING";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onCompleteTransaction: (id: string) => void;
}

export default function RecentTransactions({
  transactions,
  onCompleteTransaction,
}: RecentTransactionsProps) {
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "PENDING">("ALL");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "ALL") return true;
    return tx.status === filter;
  });

  const getStatusBadgeStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50 hover:bg-emerald-50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-600 border-amber-200/50 hover:bg-amber-50 rounded-md font-bold text-[10px] tracking-wider py-0.5 px-2";
    }
  };

  const handleRowClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setOpen(true);
  };

  const handleApprove = () => {
    if (!selectedTx) return;
    onCompleteTransaction(selectedTx.id);
    toast.success(`Transaction ${selectedTx.id} completed successfully`);
    setOpen(false);
    setSelectedTx(null);
  };

  // Define Columns for NRTable
  const columns: ColumnDef<Transaction>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div onClick={() => handleRowClick(tx)} className="py-2.5 cursor-pointer text-xs font-semibold text-slate-500 w-full h-full">
            {tx.id}
          </div>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div onClick={() => handleRowClick(tx)} className="py-2.5 cursor-pointer text-xs text-slate-400 font-semibold w-full h-full">
            {tx.date}
          </div>
        );
      },
    },
    {
      header: "Client / Creator",
      accessorKey: "client",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div onClick={() => handleRowClick(tx)} className="py-2.5 cursor-pointer flex flex-col leading-none w-full h-full">
            <span className="text-xs font-bold text-slate-800">
              {tx.client}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">
              to {tx.creator}
            </span>
          </div>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div onClick={() => handleRowClick(tx)} className="py-2.5 cursor-pointer flex flex-col leading-none w-full h-full">
            <span className="text-xs font-extrabold text-slate-800">
              {formatCurrency(tx.amount)}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold mt-1">
              Fee: {formatCurrency(tx.fee)}
            </span>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div onClick={() => handleRowClick(tx)} className="py-2.5 cursor-pointer w-full h-full">
            <span className={`border ${getStatusBadgeStyle(tx.status)}`}>
              {tx.status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col w-full hover:shadow-md transition-all duration-300">
      {/* Header and Filter Tab Buttons */}
      <div className="p-6 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full border-b border-slate-50">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          Recent Transactions
        </h3>
        
        {/* Simple button tabs filter */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg self-start">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              filter === "ALL"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("COMPLETED")}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              filter === "COMPLETED"
                ? "bg-white text-emerald-600 shadow-xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("PENDING")}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              filter === "PENDING"
                ? "bg-white text-amber-600 shadow-xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Transactions Table using NRTable */}
      <div className="px-6 py-2">
        <NRTable
          columns={columns}
          data={filteredTransactions}
          emptyMessage="No transactions available."
        />
      </div>

      {/* Transaction Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        {selectedTx && (
          <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Transaction Invoice
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Billing details and commission share breakdown.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 border-y border-slate-50 my-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Transaction ID</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.id}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Date</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.date}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Client (Sender)</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.client}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Creator (Recipient)</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.creator}</span>
                </div>
              </div>

              {/* Financial breakdown block */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col gap-2.5 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Gross Booking Amount</span>
                  <span className="font-bold text-slate-700">{formatCurrency(selectedTx.amount)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-red-500">
                  <span className="font-semibold">Platform Fee (15%)</span>
                  <span className="font-bold">- {formatCurrency(selectedTx.fee)}</span>
                </div>
                <div className="border-t border-slate-200/60 pt-2.5 flex justify-between items-center text-sm">
                  <span className="text-slate-800 font-extrabold">Net Payout Share</span>
                  <span className="font-extrabold text-blue-600">{formatCurrency(selectedTx.amount - selectedTx.fee)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2 px-1 text-xs">
                <span className="text-slate-400 font-semibold">Transfer Status</span>
                <span className={`border ${getStatusBadgeStyle(selectedTx.status)}`}>
                  {selectedTx.status}
                </span>
              </div>
            </div>

            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setSelectedTx(null);
                }}
                className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
              >
                Close
              </Button>
              {selectedTx.status === "PENDING" && (
                <Button
                  onClick={handleApprove}
                  className="font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Approve & Release
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
