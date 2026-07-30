"use client";

import Image from "next/image";
import { Star, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const DisputeDetailsModule = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-serif text-[#1e293b] tracking-wide">
          Disputes Management
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reporter Card */}
            <div className="bg-white p-6 rounded-[8px] border border-slate-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 overflow-hidden shrink-0">
                  <div className="w-full h-full bg-gradient-to-tr from-orange-300 to-orange-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Reporter
                  </span>
                  <span className="text-lg font-serif text-slate-800">
                    Emily Davis
                  </span>
                  <span className="text-sm text-slate-500">
                    Parent Member
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Joined</span>
                  <span className="text-sm font-medium text-slate-700">Oct 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reported User Card */}
            <div className="bg-white p-6 rounded-[8px] border border-slate-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 overflow-hidden shrink-0">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Reported User
                  </span>
                  <span className="text-lg font-serif text-slate-800">
                    Marc Wilson
                  </span>
                  <span className="text-sm text-slate-500">
                    Caregiver • Silver Tier
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Joined</span>
                  <span className="text-sm font-medium text-slate-700">June 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Details Card */}
          <div className="bg-white rounded-[8px] border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-serif text-slate-800">Incident Details</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Title</span>
                  <span className="text-[15px] text-slate-800">Safety Concern</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date of Incident</span>
                  <span className="text-[15px] text-slate-800">Oct 24, 2023</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Description</span>
                <div className="bg-slate-50 p-4 rounded-[8px] text-[15px] text-slate-700 leading-relaxed">
                  Caregiver arrived 45 minutes late and appeared distracted. During the session, the child was left unsupervised for a brief period while the caregiver was on a personal phone call in the other room. We observed this through our nursery camera.
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Evidence (3 Files)</span>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  <div className="w-32 h-32 bg-black rounded-[8px] shrink-0 border border-slate-200"></div>
                  <div className="w-32 h-32 bg-slate-100 rounded-[8px] shrink-0 border border-slate-200"></div>
                  <div className="w-32 h-32 bg-black rounded-[8px] shrink-0 border border-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white rounded-[8px] border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-serif text-slate-800">Admin Actions</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Request Explanation Note</span>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-[8px] p-3 text-sm text-slate-700 outline-none resize-none h-32 focus:border-teal-500 transition-colors placeholder:text-slate-400"
                  placeholder="Type a note for give warning to caregiver"
                ></textarea>
                <Button className="w-full bg-[#1e6660] hover:bg-[#154f49] text-white py-6 rounded-[8px] mt-2 font-medium">
                  Request explanation
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full py-6 rounded-[8px] border-[#FBBF24] text-[#FBBF24] hover:bg-[#FEF3C7] hover:text-[#D97706] font-medium flex items-center justify-center gap-2">
                  <Ban className="w-4 h-4" />
                  Suspend user
                </Button>
                
                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 font-medium">
                  Ban user
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetailsModule;
