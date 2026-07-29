"use client";

import { useState } from "react";
import RefundsHeader from "./RefundsHeader";
import RefundsTable from "./RefundsTable";

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

const initialRefunds: RefundItem[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Videographer",
    totalEarned: 4250.00,
    fees: 637.50,
    netPayout: 3612.50,
    lastPayout: "Oct 12, 2026",
    status: "APPROVED",
  },
  {
    id: 2,
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    role: "Photographer",
    totalEarned: 2800.00,
    fees: 420.00,
    netPayout: 2380.00,
    lastPayout: "Sep 30, 2026",
    status: "PENDING REVIEW",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Producer",
    totalEarned: 1200.00,
    fees: 180.00,
    netPayout: 1020.00,
    lastPayout: "Oct 05, 2026",
    status: "APPROVED",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Producer",
    totalEarned: 1200.00,
    fees: 180.00,
    netPayout: 1020.00,
    lastPayout: "Oct 05, 2026",
    status: "APPROVED",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Producer",
    totalEarned: 1200.00,
    fees: 180.00,
    netPayout: 1020.00,
    lastPayout: "Oct 05, 2026",
    status: "APPROVED",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Producer",
    totalEarned: 1200.00,
    fees: 180.00,
    netPayout: 1020.00,
    lastPayout: "Oct 05, 2026",
    status: "APPROVED",
  },
  {
    id: 7,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Producer",
    totalEarned: 1200.00,
    fees: 180.00,
    netPayout: 1020.00,
    lastPayout: "Oct 05, 2026",
    status: "APPROVED",
  },
  {
    id: 8,
    name: "David Miller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Director",
    totalEarned: 6900.00,
    fees: 1035.00,
    netPayout: 5865.00,
    lastPayout: "Oct 15, 2026",
    status: "PENDING REVIEW",
  },
];

export default function RefundManagement() {
  const [refunds, setRefunds] = useState<RefundItem[]>(initialRefunds);

  const handleProcessRefund = (id: number) => {
    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setRefunds((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "COMPLETED", lastPayout: todayStr } : p
      )
    );
  };

  const handleApproveRequest = (id: number) => {
    setRefunds((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      <RefundsHeader />

      <div className="w-full">
        <RefundsTable
          refunds={refunds}
          onProcessRefund={handleProcessRefund}
          onApproveRequest={handleApproveRequest}
        />
      </div>
    </div>
  );
}
