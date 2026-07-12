"use client";

import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface Creator {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
}

interface PayoutData {
  id: string;
  creator: Creator;
  amount: string;
  status: string;
}

const columns: ColumnDef<PayoutData>[] = [
  {
    accessorKey: "creator",
    header: "CREATOR",
    cell: ({ row }) => {
      const creator = row.original.creator;
      return (
        <div className="flex items-center gap-3 py-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shrink-0 ${creator.avatarBg} ${creator.avatarText}`}>
            {creator.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm leading-tight">
              {creator.name}
            </span>
            <span className="text-[11px] font-bold text-slate-400 mt-0.5">
              {creator.role}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      return (
        <span className="font-extrabold text-slate-800 text-sm tracking-tight">
          {row.original.amount}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <span className="inline-block px-3 py-1.5 text-[9px] font-bold text-slate-500 bg-slate-100 rounded-md tracking-wider leading-none">
          {row.original.status}
        </span>
      );
    },
  },
  {
    id: "action",
    header: "ACTION",
    cell: () => {
      return (
        <div className="flex justify-start">
          <Button className="px-5 py-1.5 bg-[#2A2A2A] hover:bg-black text-white text-xs font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer">
            Review
          </Button>
        </div>
      );
    },
  },
];

interface PendingPayoutsProps {
  data: PayoutData[];
}

const PendingPayouts = ({ data = [] }: PendingPayoutsProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Pending Payouts</h3>
      </div>
      <NRTable columns={columns} data={data} />
    </div>
  );
};

export default PendingPayouts;
