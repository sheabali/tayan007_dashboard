"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancellationProps {
  projectStatus: string;
  onInitiateCancellation: () => void;
}

export default function Cancellation({
  projectStatus,
  onInitiateCancellation,
}: CancellationProps) {
  const [open, setOpen] = useState(false);
  const isCancelled = projectStatus.toLowerCase() === "cancelled";

  const handleConfirm = () => {
    onInitiateCancellation();
    setOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Cancellation Information
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Cancellation Requests
        </span>
        
        <ul className="flex flex-col gap-2.5 pl-1">
          <li className="text-xs font-semibold text-slate-500 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            5+ business days before booking: No fee
          </li>
          <li className="text-xs font-semibold text-slate-500 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            Within 5 business days: $75 reschedule fee
          </li>
          <li className="text-xs font-semibold text-slate-500 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            Cancel within 5 business days: 50% booking retained
          </li>
          <li className="text-xs font-semibold text-slate-500 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            Client no-show: Admin review
          </li>
        </ul>

        <div className="mt-2">
          {isCancelled ? (
            <Button
              disabled
              variant="outline"
              className="w-full border-red-200 bg-red-50 text-red-500 font-bold hover:bg-red-50"
            >
              Cancellation Initiated
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-all duration-300"
            >
              Initiate Cancellation
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle className="text-lg font-bold text-slate-800">
              Initiate Cancellation
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 leading-relaxed mt-1">
              Are you sure you want to cancel the &quot;Coffee House Campaign&quot; project? This action will notify all participants and apply any relevant cancellation fees.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
            >
              No, Keep Project
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Cancel Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
