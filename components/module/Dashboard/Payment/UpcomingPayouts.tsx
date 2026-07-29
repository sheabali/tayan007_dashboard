"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

interface PayoutItem {
  id: number;
  name: string;
  avatar: string;
  role: string;
  scheduledDate: string;
  amount: number;
  formattedAmount?: string;
  bankName: string;
  accountNumber: string;
}

interface UpcomingPayoutsProps {
  payouts: PayoutItem[];
  onReleasePayout: (id: number) => void;
}

export default function UpcomingPayouts({
  payouts,
  onReleasePayout,
}: UpcomingPayoutsProps) {
  const [selectedPayout, setSelectedPayout] = useState<PayoutItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleCardClick = (payout: PayoutItem) => {
    setSelectedPayout(payout);
    setOpen(true);
  };

  const handleReleaseEarly = () => {
    if (!selectedPayout) return;
    onReleasePayout(selectedPayout.id);
    toast.success(`Payout of ${selectedPayout.formattedAmount || selectedPayout.amount} released to ${selectedPayout.name}`);
    setOpen(false);
    setSelectedPayout(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">
        <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
          Upcoming Payouts
        </h3>

        <div className="flex flex-col gap-3">
          {payouts.length === 0 ? (
            <div className="text-center py-8 text-slate-400 font-medium text-[13px]">
              All payouts released!
            </div>
          ) : (
            payouts.map((payout) => (
              <div
                key={payout.id}
                onClick={() => handleCardClick(payout)}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100/40 bg-[#f4f6fa] hover:bg-[#ebf0f7] hover:border-slate-200 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0">
                    <img
                      src={payout.avatar}
                      alt={payout.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-slate-800">
                      {payout.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Scheduled: {payout.scheduledDate}
                    </span>
                  </div>
                </div>

                <span className="text-[13px] font-bold text-blue-600">
                  {payout.formattedAmount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5">
        <Link href="/admin/payouts">
          <Button
            variant="outline"
            className="w-full h-11 border-[#2a3b32] text-[#2a3b32] hover:bg-slate-50 font-semibold rounded-[10px] text-[13px] transition-colors"
          >
            Manage All Creator Payouts
          </Button>
        </Link>
      </div>

      {/* Payout Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        {selectedPayout && (
          <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Creator Payout Details
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Review and approve the payout transaction for early settlement.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 border-y border-slate-50 my-2">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200">
                  <img
                    src={selectedPayout.avatar}
                    alt={selectedPayout.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none gap-1">
                  <span className="text-sm font-bold text-slate-800">{selectedPayout.name}</span>
                  <span className="text-xs text-slate-400 font-medium">{selectedPayout.role}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Date</span>
                  <span className="text-xs font-bold text-slate-700">{selectedPayout.scheduledDate}, 2026</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payout Amount</span>
                  <span className="text-xs font-extrabold text-blue-600">{selectedPayout.formattedAmount}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Recipient Bank</span>
                  <span className="text-xs font-bold text-slate-700">{selectedPayout.bankName}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Account Number</span>
                  <span className="text-xs font-bold text-slate-700">•••• {selectedPayout.accountNumber}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setSelectedPayout(null);
                }}
                className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
              >
                Close
              </Button>
              <Button
                onClick={handleReleaseEarly}
                className="font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Release Payout Early
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
