"use client";

import { useState } from "react";
import PaymentHeader from "./PaymentHeader";
import PaymentMetrics from "./PaymentMetrics";
import RevenueTrends from "./RevenueTrends";
import UpcomingPayouts from "./UpcomingPayouts";
import JobRefunds from "./JobRefunds";
import RecentTransactions from "./RecentTransactions";

interface PayoutItem {
  id: number;
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
  id: number;
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
  status: "COMPLETED" | "PENDING";
}

const initialPayouts: PayoutItem[] = [
  {
    id: 1,
    name: "Marcus Wong",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    role: "Lifestyle Photographer",
    scheduledDate: "Oct 28",
    amount: 1850,
    formattedAmount: "CFA1,850",
    bankName: "Chase Bank",
    accountNumber: "5829",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Videographer",
    scheduledDate: "Oct 30",
    amount: 3200,
    formattedAmount: "$3,200",
    bankName: "Bank of America",
    accountNumber: "9182",
  },
  {
    id: 3,
    name: "Sam Thorne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Video Editor",
    scheduledDate: "Nov 02",
    amount: 920,
    formattedAmount: "$920",
    bankName: "Wells Fargo",
    accountNumber: "4729",
  },
];

const initialRefunds: RefundItem[] = [
  {
    id: 1,
    name: "Marcus Wong",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    scheduledDate: "Oct 28",
    formattedAmount: "$1,850",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    scheduledDate: "Oct 30",
    formattedAmount: "$3,200",
  },
  {
    id: 3,
    name: "Sam Thorne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    scheduledDate: "Nov 02",
    formattedAmount: "$920",
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "#TRX- 9482",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "COMPLETED",
  },
  {
    id: "#TRX- 9481",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "PENDING",
  },
  {
    id: "#TRX- 9480",
    date: "Oct 24, 2026",
    client: "Lumina Creative",
    creator: "Marcus Wong",
    amount: 2450.00,
    fee: 367.50,
    status: "COMPLETED",
  },
];

export default function PaymentPage() {
  const [grossVolume] = useState(142500);
  const [pendingPayouts] = useState(18240);
  const [marketplaceRevenue] = useState(21375);

  const [upcomingPayouts, setUpcomingPayouts] = useState<PayoutItem[]>(initialPayouts);
  const [refunds] = useState<RefundItem[]>(initialRefunds);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const handleReleasePayout = (payoutId: number) => {
    const released = upcomingPayouts.find((p) => p.id === payoutId);
    if (!released) return;

    setUpcomingPayouts((prev) => prev.filter((p) => p.id !== payoutId));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      <PaymentHeader />

      <PaymentMetrics
        grossVolume={grossVolume}
        pendingPayouts={pendingPayouts}
        marketplaceRevenue={marketplaceRevenue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full h-full">
          <div className="w-full">
            <RevenueTrends />
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