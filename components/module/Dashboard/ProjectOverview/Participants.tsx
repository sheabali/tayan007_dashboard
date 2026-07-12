"use client";

import { Coffee, User } from "lucide-react";
import Image from "next/image";

export default function Participants() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Participants
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Client Row */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Client
          </span>
          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100/80 bg-slate-50/20 hover:bg-slate-50/50 transition-colors duration-200">
            {/* Dark green / dark gray brand logo */}
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
              <Coffee className="w-5 h-5 stroke-[2]" />
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-800">
                ABC Coffee House
              </span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">
                Sarah Jenkins, Owner
              </span>
            </div>
          </div>
        </div>

        {/* Creator Row */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Creator
          </span>
          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100/80 bg-slate-50/20 hover:bg-slate-50/50 transition-colors duration-200">
            {/* Avatar Image */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs">
              <Image
                src="/images/marcus_profile.png"
                alt="Jordan Rivera"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to text initials if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback avatar if error or missing */}
              <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-800">
                Jordan Rivera
              </span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">
                Lifestyle Photographer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
