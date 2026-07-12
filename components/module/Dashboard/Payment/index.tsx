"use client";

import { useState } from "react";
import PaymentHeader from "./PaymentHeader";
import PaymentMetrics from "./PaymentMetrics";
import RevenueTrends from "./RevenueTrends";
import UpcomingPayouts from "./UpcomingPayouts";
import RecentTransactions from "./RecentTransactions";

interface PayoutItem {
  id: number;
  name: string;
  avatar: string;
  role: string;
  scheduledDate: string;
  amount: number;
  bankName: string;
  accountNumber: string;
}

interface Transaction {
  id: string;
  date: string;
  client: string;
  creator: string;
  amount: number;
  fee: number;
  status: "COMPLETED" | "PENDING";
}

const initialPayouts: PayoutItem[] = [
  {
    id: 1,
    name: "Marcus Wong",
    avatar: "/images/marcus_profile.png",
    role: "Lifestyle Photographer",
    scheduledDate: "Oct 28",
    amount: 1850,
    bankName: "Chase Bank",
    accountNumber: "5829",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    avatar: "/images/elena_profile.png",
    role: "Videographer",
    scheduledDate: "Oct 30",
    amount: 3200,
    bankName: "Bank of America",
    accountNumber: "9182",
  },
  {
    id: 3,
    name: "Sam Thorne",
    avatar: "/images/liam_profile.png",
    role: "Video Editor",
    scheduledDate: "Nov 02",
    amount: 920,
    bankName: "Wells Fargo",
    accountNumber: "4729",
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "#TRX-9482",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "COMPLETED",
  },
  {
    id: "#TRX-9481",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "PENDING",
  },
  {
    id: "#TRX-9480",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "COMPLETED",
  },
];

export default function PaymentPage() {
  // Page Metrics State
  const [grossVolume, setGrossVolume] = useState(142500);
  const [pendingPayouts, setPendingPayouts] = useState(18240);
  const [marketplaceRevenue, setMarketplaceRevenue] = useState(21375);

  // Lists State
  const [upcomingPayouts, setUpcomingPayouts] = useState<PayoutItem[]>(initialPayouts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // --- Handlers ---

  // Release a creator payout early:
  // - Subtract from upcoming payouts
  // - Subtract from pending payouts metrics (simulating payout transfer)
  const handleReleasePayout = (payoutId: number) => {
    const released = upcomingPayouts.find((p) => p.id === payoutId);
    if (!released) return;

    setUpcomingPayouts((prev) => prev.filter((p) => p.id !== payoutId));
    setPendingPayouts((prev) => Math.max(prev - released.amount, 0));

    // Append to transactions list as COMPLETED payout transaction
    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const nextTrxId = `#TRX-${Math.floor(1000 + Math.random() * 9000)}`;

    setTransactions((prev) => [
      {
        id: nextTrxId,
        date: dateStr,
        client: "Valley Payout",
        creator: released.name,
        amount: released.amount,
        fee: 0.00,
        status: "COMPLETED",
      },
      ...prev,
    ]);
  };

  // Complete a pending incoming payment:
  // - Mark transaction as completed
  // - Increase gross volume & platform fee share
  const handleCompleteTransaction = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === txId && tx.status === "PENDING") {
          // Add to volume
          setGrossVolume((v) => v + tx.amount);
          setMarketplaceRevenue((v) => v + tx.fee);
          return { ...tx, status: "COMPLETED" };
        }
        return tx;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* 1. Header breadcrumbs */}
      <PaymentHeader />

      {/* 2. Three metrics summary cards */}
      <PaymentMetrics
        grossVolume={grossVolume}
        pendingPayouts={pendingPayouts}
        marketplaceRevenue={marketplaceRevenue}
      />

      {/* 3. Main Dashboard grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* Left Column (Revenue Trends Chart & Transactions History table) */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          <div className="w-full">
            <RevenueTrends />
          </div>
          <div className="w-full">
            <RecentTransactions
              transactions={transactions}
              onCompleteTransaction={handleCompleteTransaction}
            />
          </div>
        </div>

        {/* Right Column (Upcoming Creator Payouts cards list) */}
        <div className="lg:col-span-1 w-full">
          <UpcomingPayouts
            payouts={upcomingPayouts}
            onReleasePayout={handleReleasePayout}
          />
        </div>
      </div>
    </div>
  );
}