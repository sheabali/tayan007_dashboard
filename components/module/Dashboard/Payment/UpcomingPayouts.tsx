"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCardClick = (payout: PayoutItem) => {
    setSelectedPayout(payout);
    setOpen(true);
  };

  const handleReleaseEarly = () => {
    if (!selectedPayout) return;
    onReleasePayout(selectedPayout.id);
    toast.success(`Payout of ${formatCurrency(selectedPayout.amount)} released to ${selectedPayout.name}`);
    setOpen(false);
    setSelectedPayout(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight">
            Upcoming Payouts
          </h3>
        </div>

        {/* List of payouts */}
        <div className="flex flex-col gap-4">
          {payouts.length === 0 ? (
            <div className="text-center py-8 text-slate-400 font-semibold text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 stroke-[1.5]" />
              All payouts released!
            </div>
          ) : (
            payouts.map((payout) => (
              <div
                key={payout.id}
                onClick={() => handleCardClick(payout)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100/60 bg-slate-50/20 hover:bg-slate-50/80 hover:border-slate-200/80 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-xs">
                    <Image
                      src={payout.avatar}
                      alt={payout.name}
                      fill
                      className="object-cover"
                    />
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {payout.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      Scheduled: {payout.scheduledDate}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <span className="text-xs font-extrabold text-blue-600">
                  {formatCurrency(payout.amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Button at the bottom */}
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => toast.info("Opening all payout transactions...")}
          className="w-full h-10 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-lg text-xs"
        >
          Manage All Creator Payouts
        </Button>
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
              {/* Creator details */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={selectedPayout.avatar}
                    alt={selectedPayout.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">{selectedPayout.name}</span>
                  <span className="text-xs text-slate-400 font-medium mt-1">{selectedPayout.role}</span>
                </div>
              </div>

              {/* Payout specifications */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Date</span>
                  <span className="text-xs font-bold text-slate-700">{selectedPayout.scheduledDate}, 2026</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payout Amount</span>
                  <span className="text-xs font-extrabold text-blue-600">{formatCurrency(selectedPayout.amount)}</span>
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
