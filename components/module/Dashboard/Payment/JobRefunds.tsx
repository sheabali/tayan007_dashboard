"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RefundItem {
  id: string | number;
  name: string;
  avatar: string;
  scheduledDate: string;
  formattedAmount: string;
}

interface JobRefundsProps {
  refunds: RefundItem[];
}

export default function JobRefunds({ refunds }: JobRefundsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">
        <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
          Job Refund
        </h3>

        <div className="flex flex-col gap-3">
          {refunds.length === 0 ? (
            <div className="text-center py-8 text-slate-400 font-medium text-[13px]">
              No pending refunds.
            </div>
          ) : (
            refunds.map((refund) => (
              <div
                key={refund.id}
                className="flex items-center justify-between p-4 rounded-xl border border-red-50 bg-[#fcecec] hover:bg-[#fadcdc] hover:border-red-100 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0">
                    <img
                      src={refund.avatar}
                      alt={refund.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-slate-800">
                      {refund.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Scheduled: {refund.scheduledDate}
                    </span>
                  </div>
                </div>

                <span className="text-[13px] font-bold text-blue-600">
                  {refund.formattedAmount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-5">
        <Link href="/admin/refunds">
          <Button
            variant="outline"
            className="w-full h-11 border-[#2a3b32] text-[#2a3b32] hover:bg-slate-50 font-semibold rounded-[10px] text-[13px] transition-colors"
          >
            Manage All Refunds
          </Button>
        </Link>
      </div>
    </div>
  );
}
