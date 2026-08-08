"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Briefcase,
  FolderOpen,
  Eye,
  CheckCircle2,
  ExternalLink,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  useGetSingleApplicationQuery, 
  useApproveApplicationMutation, 
  useRejectApplicationMutation 
} from "@/redux/api/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ApplicationReviewDetailsViewProps {
  id: string;
}

export default function ApplicationReviewDetailsView({ id }: ApplicationReviewDetailsViewProps) {
  const [hasActed, setHasActed] = useState(false);

  const { data, isLoading, isError } = useGetSingleApplicationQuery(id);
  const [approveApplication, { isLoading: isApproving }] = useApproveApplicationMutation();
  const [rejectApplication, { isLoading: isRejecting }] = useRejectApplicationMutation();
  
  const applicantData = data?.data;

  const handleApprove = async () => {
    try {
      await approveApplication(id).unwrap();
      toast.success("Application Approved");
      setHasActed(true);
    } catch (error) {
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(id).unwrap();
      toast.success("Application Rejected");
      setHasActed(true);
    } catch (error) {
      toast.error("Failed to reject application");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
        <Skeleton className="h-10 w-64 mb-2" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Skeleton className="w-full h-48 rounded-[24px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Skeleton className="w-full h-32 rounded-[24px]" />
              <Skeleton className="w-full h-32 rounded-[24px]" />
            </div>
          </div>
          <Skeleton className="w-full h-full min-h-[300px] rounded-[24px]" />
        </div>
      </div>
    );
  }

  if (isError || !applicantData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />
        <h2 className="text-xl font-bold text-slate-800">Application Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          Failed to load application details or it does not exist.
        </p>
        <Link href="/admin/applications" className="mt-2">
          <Button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow hover:bg-slate-700 transition-colors active:scale-95 cursor-pointer">
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  const {
    personalInfo,
    businessDetails,
    expertise,
    verificationDocs,
    locationInfo,
    guarantorInformation,
    portfolio,
  } = applicantData;

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-[32px] font-serif text-[#1e2a3b] tracking-tight">
          Application Review: {personalInfo?.name}
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shadow-sm shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      {/* Top Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Double Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col sm:flex-row gap-8 border border-slate-100">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
              <img
                src={personalInfo?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                alt={personalInfo?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                }}
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <h2 className="text-[26px] font-medium text-[#0d4732] leading-none">
                    {personalInfo?.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-2.5 text-slate-600 text-[15px]">
                    <CheckCircle2 className="w-4 h-4 text-slate-500" />
                    <span className="capitalize">{personalInfo?.role?.toLowerCase() || "Professional"} Member</span>
                  </div>
                </div>
                <span className="text-[15px] text-slate-500">
                  Joined {personalInfo?.joinDate}
                </span>
              </div>
              <div className="flex gap-12 mt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase">
                    Email Address
                  </span>
                  <span className="text-[15px] font-medium text-slate-800">
                    {personalInfo?.email || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase">
                    Phone Number
                  </span>
                  <span className="text-[15px] font-medium text-slate-800">
                    {personalInfo?.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details & Expertise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-2.5 mb-8">
                <Building2 className="w-[22px] h-[22px] text-[#0d4732]" />
                <h3 className="text-[20px] font-medium text-[#0d4732]">Business Details</h3>
              </div>
              <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase mb-1.5">
                Business Name
              </span>
              <span className="text-[16px] font-bold text-[#0d4732]">
                {businessDetails?.businessName || "N/A"}
              </span>
            </div>
            <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-2.5 mb-8">
                <Briefcase className="w-[20px] h-[20px] text-[#0d4732]" />
                <h3 className="text-[13px] font-bold tracking-widest uppercase text-[#0d4732]">Expertise</h3>
              </div>
              <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase mb-1.5">
                Years of Experience
              </span>
              <span className="text-[16px] font-bold text-[#0d4732]">
                {expertise?.yearsOfExperience || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Docs Column */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-8">
            <FolderOpen className="w-[22px] h-[22px] text-[#0d4732]" />
            <h3 className="text-[22px] font-medium text-[#0d4732]">Verification Docs</h3>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { title: "Government ID", docs: verificationDocs?.governmentId || [] },
              { title: "Professional License", docs: verificationDocs?.professionalLicense || [] },
              { title: "Business Registration", docs: verificationDocs?.businessRegistration || [] },
            ].map((docCategory, i) => (
              <div key={i} className="flex flex-col gap-2 mb-2">
                 <span className="text-[15px] font-medium text-[#0d4732]">{docCategory.title}</span>
                 {docCategory.docs.length > 0 ? (
                   docCategory.docs.map((doc: string, idx: number) => (
                    <a
                      key={idx}
                      href={doc}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-between items-center p-3 rounded-[12px] border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
                    >
                      <span className="text-[13px] text-slate-600 truncate max-w-[80%]">
                         {doc.split('/').pop() || `Document ${idx + 1}`}
                      </span>
                      <Eye className="w-[18px] h-[18px] text-[#0d4732] opacity-80" />
                    </a>
                   ))
                 ) : (
                    <span className="text-[13px] text-slate-400 italic">No documents provided</span>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Info */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6">
            <MapPin className="w-5 h-5 text-[#0d4732]" />
            <h3 className="text-[13px] font-bold tracking-widest uppercase text-[#0d4732]">Location Info</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[15px] text-slate-500">Country</span>
              <span className="text-[15px] font-bold text-slate-900">{locationInfo?.country || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[15px] text-slate-500">State</span>
              <span className="text-[15px] font-bold text-slate-900">{locationInfo?.state || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[15px] text-slate-500">City</span>
              <span className="text-[15px] font-bold text-slate-900">{locationInfo?.city || "N/A"}</span>
            </div>
          </div>
          <span className="text-[14px] text-slate-500 mt-5 mb-3">Service Areas</span>
          <div className="flex flex-wrap gap-2.5">
            {locationInfo?.serviceAreas?.length ? locationInfo.serviceAreas.map((area: string) => (
              <span
                key={area}
                className="px-3 py-1 bg-slate-100 rounded-full text-[12px] font-medium text-slate-700"
              >
                {area}
              </span>
            )) : <span className="text-[13px] text-slate-400 italic">No service areas</span>}
          </div>
        </div>

        {/* Guarantor Information */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-[22px] font-medium text-[#0d4732] leading-tight mb-8">
              Guarantor
              <br />
              Information
            </h3>
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-bold text-[#0d4732]">
                  {guarantorInformation?.name || "N/A"}
                </span>
                <span className="text-[13px] font-medium text-slate-500">
                  {guarantorInformation?.relationship || "Guarantor"}
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#0d4732] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] text-slate-500 mb-1">Contact Details</span>
            <span className="text-[15px] font-bold text-[#0d4732]">{guarantorInformation?.email || "N/A"}</span>
            <span className="text-[15px] font-bold text-[#0d4732]">{guarantorInformation?.phone || "N/A"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-[22px] font-medium text-[#0d4732] mb-6">Actions</h3>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleApprove}
              disabled={isApproving || isRejecting || hasActed}
              className="w-full h-[52px] bg-[#22c55e] hover:bg-[#16a34a] text-white text-[16px] font-medium rounded-[12px] shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isApproving ? "Approving..." : "Approved"}
            </Button>
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={isApproving || isRejecting || hasActed}
              className="w-full h-[52px] bg-red-50/30 border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 text-[16px] font-medium rounded-[12px] shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRejecting ? "Rejecting..." : "Rejected"}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Portfolio */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col lg:col-span-2 w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[22px] font-medium text-[#0d4732]">Project Portfolio</h3>
            {portfolio?.length > 0 && (
              <Link
                href="#"
                className="text-[14px] font-medium text-[#0d4732] flex items-center gap-1.5 hover:underline"
              >
                View Full Portfolio <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolio?.length > 0 ? portfolio.map((imgUrl: string, i: number) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    src={imgUrl}
                    alt={`Portfolio Item ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1541888081622-441617c0677f?w=400";
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#0d4732]">Project {i + 1}</span>
                </div>
              </div>
            )) : (
              <div className="col-span-3 py-6 text-center text-slate-500 text-sm">
                No portfolio items provided.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
