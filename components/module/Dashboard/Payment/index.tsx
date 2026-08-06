"use client";

import { useState } from "react";
import PaymentHeader from "./PaymentHeader";
import PaymentMetrics from "./PaymentMetrics";
import RevenueTrends from "./RevenueTrends";
import UpcomingPayouts from "./UpcomingPayouts";
import JobRefunds from "./JobRefunds";
import RecentTransactions from "./RecentTransactions";
import { useGetPaymentStatsQuery } from "@/redux/api/dashboardApi";
import { format } from "date-fns";
interface PayoutItem {
  id: string | number;
  name: string;
  avatar: string;
  role: string;
  scheduledDate: string;
  amount: number;
  formattedAmount: string;
  bankName: string;
  accountNumber: string;
}

interface RefundItem {
  id: string | number;
  name: string;
  avatar: string;
  scheduledDate: string;
  formattedAmount: string;
}

interface Transaction {
  id: string;
  date: string;
  client: string;
  creator: string;
  amount: number;
  fee: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED" | string;
}

interface APIPayoutItem {
  id: string;
  professionalName?: string;
  professionalImage?: string;
  amount: number;
  scheduledDate: string;
}

interface APIRefundItem {
  id: string;
  professionalName?: string;
  professionalImage?: string;
  amount: number;
  scheduledDate: string;
}

interface APITransactionItem {
  id: string;
  date: string;
  clientName?: string;
  professionalName?: string;
  amount: number;
  fee: number;
  status: string;
}

export default function PaymentPage() {
  const { data, isLoading } = useGetPaymentStatsQuery({});
  const paymentData = data?.data;

  const [releasedPayoutIds, setReleasedPayoutIds] = useState<Set<string | number>>(new Set());

  const upcomingPayouts: PayoutItem[] = (paymentData?.upcomingPayouts || [])
    .filter((p: APIPayoutItem) => !releasedPayoutIds.has(p.id))
    .map((payout: APIPayoutItem) => ({
      id: payout.id,
      name: payout.professionalName || "Unknown",
      avatar: payout.professionalImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      role: "Professional",
      scheduledDate: format(new Date(payout.scheduledDate), "MMM dd"),
      amount: payout.amount,
      formattedAmount: `$${payout.amount.toLocaleString()}`,
      bankName: "Unknown Bank",
      accountNumber: "****",
    }));

  const handleReleasePayout = (payoutId: string | number) => {
    setReleasedPayoutIds((prev) => {
      const next = new Set(prev);
      next.add(payoutId);
      return next;
    });
  };

  const refunds: RefundItem[] = (paymentData?.jobRefunds || []).map((refund: APIRefundItem) => ({
    id: refund.id,
    name: refund.professionalName || "Unknown",
    avatar: refund.professionalImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    scheduledDate: format(new Date(refund.scheduledDate), "MMM dd"),
    formattedAmount: `$${refund.amount.toLocaleString()}`,
  }));

  const transactions: Transaction[] = (paymentData?.recentTransactions || []).map((tx: APITransactionItem) => ({
    id: tx.id,
    date: format(new Date(tx.date), "MMM dd, yyyy"),
    client: tx.clientName || "Unknown Client",
    creator: tx.professionalName || "Unknown Professional",
    amount: tx.amount,
    fee: tx.fee,
    status: tx.status,
  }));

  const metrics = {
    grossVolume: paymentData?.overview?.totalGrossVolume || 0,
    pendingPayouts: paymentData?.overview?.pendingPayouts || 0,
    marketplaceRevenue: paymentData?.overview?.marketplaceRevenue || 0,
  };

  const trends = paymentData?.revenueTrends || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#f4f6f9]">
        <p className="text-slate-500 font-medium">Loading payment stats...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      <PaymentHeader />

      <PaymentMetrics
        grossVolume={metrics.grossVolume}
        pendingPayouts={metrics.pendingPayouts}
        marketplaceRevenue={metrics.marketplaceRevenue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full h-full">
          <div className="w-full">
            <RevenueTrends data={trends.length > 0 ? trends : undefined} />
          </div>
          <div className="w-full">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6 w-full">
          <UpcomingPayouts
            payouts={upcomingPayouts}
            onReleasePayout={handleReleasePayout}
          />
          <JobRefunds refunds={refunds} />
        </div>
      </div>
    </div>
  );
}