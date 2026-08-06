"use client";

import { useState } from "react";
import PayoutsHeader from "./PayoutsHeader";
import PayoutsTable from "./PayoutsTable";
import { useGetPayoutsQuery } from "@/redux/api/dashboardApi";
import { format } from "date-fns";

interface Payout {
  id: string | number;
  name: string;
  avatar: string;
  role: string;
  totalEarned: number;
  fees: number;
  netPayout: number;
  lastPayout: string;
  status: "APPROVED" | "PENDING REVIEW" | "PROCESSING" | "COMPLETED" | "PENDING" | string;
}

interface APIPayoutItem {
  id: string;
  workerId: string;
  amount: number;
  fee: number;
  netPayout: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  worker?: {
    fullName: string;
    profileImage: string;
  };
}

export default function PayoutsManagement() {
  const { data, isLoading } = useGetPayoutsQuery({});
  const payoutsData = data?.data || [];

  const [processedIds, setProcessedIds] = useState<Set<string | number>>(new Set());
  const [approvedIds, setApprovedIds] = useState<Set<string | number>>(new Set());

  // Derive state
  const payouts: Payout[] = payoutsData.map((p: APIPayoutItem) => {
    let currentStatus = p.status;
    
    if (processedIds.has(p.id)) {
      currentStatus = "COMPLETED";
    } else if (approvedIds.has(p.id)) {
      currentStatus = "APPROVED";
    }

    return {
      id: p.id,
      name: p.worker?.fullName || "Unknown",
      avatar: p.worker?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      role: "Professional",
      totalEarned: p.amount,
      fees: p.fee,
      netPayout: p.netPayout,
      lastPayout: format(new Date(p.createdAt), "MMM dd, yyyy"),
      status: currentStatus,
    };
  });

  // Process APPROVED payouts early, marking status to COMPLETED
  const handleProcessPayout = (id: string | number) => {
    setProcessedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Clear PENDING REVIEW requests, approving the payout
  const handleApproveRequest = (id: string | number) => {
    setApprovedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-slate-50/50 rounded-3xl border border-slate-100/50 shadow-xs mb-20">
        <p className="text-slate-500 font-medium">Loading payouts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* 1. Page Header breadcrumbs */}
      <PayoutsHeader />

      {/* 2. Payouts queue table */}
      <div className="w-full">
        <PayoutsTable
          payouts={payouts}
          totalPayouts={data?.meta?.total ?? payouts.length}
          onProcessPayout={handleProcessPayout}
          onApproveRequest={handleApproveRequest}
        />
      </div>
    </div>
  );
}