"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetSingleDisputeQuery, useRequestExplanationMutation } from "@/redux/api/dashboardApi";
import { toast } from "sonner";

const DisputeDetailsModule = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState("");
  const { data, isLoading, isError } = useGetSingleDisputeQuery(id, {
    skip: !id,
  });
  const [requestExplanation, { isLoading: isRequesting }] = useRequestExplanationMutation();

  const handleRequestExplanation = async () => {
    if (!note.trim()) {
      toast.error("Please enter an explanation note.");
      return;
    }

    try {
      await requestExplanation({ id, note }).unwrap();
      toast.success("Explanation request sent successfully.");
      setNote("");
    } catch (error) {
      toast.error("Failed to send explanation request.");
    }
  };

  const dispute = data?.data;
  const reporter = dispute?.reporter;
  const reportedUser = dispute?.reportedUser;
  const incidentDetails = dispute?.incidentDetails;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
        <div className="w-full h-8 bg-slate-200 animate-pulse rounded mb-2 w-1/4"></div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-slate-200 animate-pulse rounded-[8px]"></div>
              <div className="h-48 bg-slate-200 animate-pulse rounded-[8px]"></div>
            </div>
            <div className="h-64 bg-slate-200 animate-pulse rounded-[8px]"></div>
          </div>
          <div className="w-full lg:w-80 h-64 bg-slate-200 animate-pulse rounded-[8px]"></div>
        </div>
      </div>
    );
  }

  if (isError || !dispute) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4f6f9]">
        <div className="text-red-500 font-medium">Failed to load dispute details.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
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
                <div className="w-14 h-14 rounded-full bg-orange-100 overflow-hidden shrink-0 relative">
                  {reporter?.image ? (
                    <Image src={reporter.image} alt={reporter.name} layout="fill" objectFit="cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-orange-300 to-orange-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Reporter
                  </span>
                  <span className="text-lg font-serif text-slate-800">
                    {reporter?.name || "Unknown"}
                  </span>
                  <span className="text-sm text-slate-500">
                    {reporter?.role || "User"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Joined</span>
                  <span className="text-sm font-medium text-slate-700">{reporter?.joined || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{reporter?.rating || "0"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reported User Card */}
            <div className="bg-white p-6 rounded-[8px] border border-slate-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 overflow-hidden shrink-0 relative">
                  {reportedUser?.image ? (
                    <Image src={reportedUser.image} alt={reportedUser.name} layout="fill" objectFit="cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Reported User
                  </span>
                  <span className="text-lg font-serif text-slate-800">
                    {reportedUser?.name || "Unknown"}
                  </span>
                  <span className="text-sm text-slate-500">
                    {reportedUser?.role || "User"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Joined</span>
                  <span className="text-sm font-medium text-slate-700">{reportedUser?.joined || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{reportedUser?.rating || "0"}</span>
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
                  <span className="text-[15px] text-slate-800">{incidentDetails?.title || "No Title"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date of Incident</span>
                  <span className="text-[15px] text-slate-800">{incidentDetails?.dateOfIncident || "Unknown Date"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Description</span>
                <div className="bg-slate-50 p-4 rounded-[8px] text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {incidentDetails?.description || "No description provided."}
                </div>
              </div>

              {incidentDetails?.evidence && incidentDetails.evidence.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Evidence ({incidentDetails.evidence.length} Files)
                  </span>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {incidentDetails.evidence.map((fileUrl: string, idx: number) => (
                      <div key={idx} className="w-32 h-32 relative rounded-[8px] shrink-0 border border-slate-200 overflow-hidden bg-slate-100">
                        <Image src={fileUrl} alt={`Evidence ${idx + 1}`} layout="fill" objectFit="cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={isRequesting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[8px] p-3 text-sm text-slate-700 outline-none resize-none h-32 focus:border-teal-500 transition-colors placeholder:text-slate-400 disabled:opacity-50"
                  placeholder="Type a note for give warning to caregiver"
                ></textarea>
                <Button 
                  onClick={handleRequestExplanation}
                  disabled={isRequesting}
                  className="w-full bg-[#1e6660] hover:bg-[#154f49] text-white py-6 rounded-[8px] mt-2 font-medium disabled:opacity-50"
                >
                  {isRequesting ? "Requesting..." : "Request explanation"}
                </Button>
              </div>

              <div className="w-full h-px bg-slate-100 mt-2 mb-2"></div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full py-6 rounded-[8px] border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-medium flex items-center justify-center gap-2">
                  <Ban className="w-5 h-5" />
                  Cancel Project
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
