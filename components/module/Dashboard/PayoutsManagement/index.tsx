"use client";

import { useState } from "react";
import PayoutsHeader from "./PayoutsHeader";
import PayoutsTable from "./PayoutsTable";

interface Payout {
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

const initialPayouts: Payout[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    avatar: "/images/elena_profile.png",
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
    avatar: "/images/marcus_profile.png",
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
    avatar: "/images/sofia_profile.png",
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
    avatar: "/images/sofia_profile.png",
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
    avatar: "/images/sofia_profile.png",
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
    avatar: "/images/sofia_profile.png",
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
    avatar: "/images/sofia_profile.png",
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
    avatar: "/images/david_profile.png",
    role: "Director",
    totalEarned: 6900.00,
    fees: 1035.00,
    netPayout: 5865.00,
    lastPayout: "Oct 15, 2026",
    status: "PENDING REVIEW",
  },
];

export default function PayoutsManagement() {
  const [payouts, setPayouts] = useState<Payout[]>(initialPayouts);

  // Process APPROVED payouts early, marking status to COMPLETED
  const handleProcessPayout = (id: number) => {
    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "COMPLETED", lastPayout: todayStr } : p
      )
    );
  };

  // Clear PENDING REVIEW requests, approving the payout
  const handleApproveRequest = (id: number) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* 1. Page Header breadcrumbs */}
      <PayoutsHeader />

      {/* 2. Payouts queue table */}
      <div className="w-full">
        <PayoutsTable
          payouts={payouts}
          onProcessPayout={handleProcessPayout}
          onApproveRequest={handleApproveRequest}
        />
      </div>
    </div>
  );
}