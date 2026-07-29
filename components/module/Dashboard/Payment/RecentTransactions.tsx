"use client";

import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";

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
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getStatusBadgeStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-[#e5fcf0] text-[#1eb462] rounded-md font-bold text-[10px] tracking-wider py-1 px-2.5 uppercase";
      case "PENDING":
      default:
        return "bg-[#fef6e0] text-[#db9204] rounded-md font-bold text-[10px] tracking-wider py-1 px-2.5 uppercase";
    }
  };

  // Define Columns for NRTable
  const columns: ColumnDef<Transaction>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => {
        return (
          <div className="py-4 text-[13px] font-medium text-slate-500 w-full h-full">
            {row.original.id}
          </div>
        );
      },
    },
    {
      header: "DATE",
      accessorKey: "date",
      cell: ({ row }) => {
        return (
          <div className="py-4 text-[13px] text-slate-500 font-medium w-full h-full">
            {row.original.date}
          </div>
        );
      },
    },
    {
      header: "CLIENT / PROFESSIONAL",
      accessorKey: "client",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div className="py-4 flex flex-col gap-0.5 w-full h-full">
            <span className="text-[13px] font-bold text-slate-800">
              {tx.client}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              to {tx.creator}
            </span>
          </div>
        );
      },
    },
    {
      header: "AMOUNT",
      accessorKey: "amount",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div className="py-4 flex flex-col gap-0.5 w-full h-full">
            <span className="text-[13px] font-bold text-slate-800">
              {formatCurrency(tx.amount)}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Fee: {formatCurrency(tx.fee)}
            </span>
          </div>
        );
      },
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <div className="py-4 w-full h-full">
            <span className={getStatusBadgeStyle(row.original.status)}>
              {row.original.status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col w-full h-full">
      <div className="p-6 pb-2 w-full">
        <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
          Recent Transactions
        </h3>
      </div>

      <div className="px-6 py-2 pb-6">
        <NRTable
          columns={columns}
          data={transactions}
          emptyMessage="No transactions available."
        />
      </div>
    </div>
  );
}
