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
  Check
} from "lucide-react";
import { mockApplicants } from "./mockData";
import { Button } from "@/components/ui/button";

interface ApplicationReviewDetailsViewProps {
  applicant: typeof mockApplicants[0];
}

export default function ApplicationReviewDetailsView({ applicant }: ApplicationReviewDetailsViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Toast Alert Box */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 border border-slate-800 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-[32px] font-serif text-[#1e2a3b] tracking-tight">
          Application Review: {applicant.name}
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
                src={applicant.avatarUrl}
                alt={applicant.name}
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
                    {applicant.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-2.5 text-slate-600 text-[15px]">
                    <CheckCircle2 className="w-4 h-4 text-slate-500" />
                    <span>Professional Member</span>
                  </div>
                </div>
                <span className="text-[15px] text-slate-500">
                  Joined June 12, 2023
                </span>
              </div>
              <div className="flex gap-12 mt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase">
                    Email Address
                  </span>
                  <span className="text-[15px] font-medium text-slate-800">
                    {applicant.name.toLowerCase().split(" ")[0]}@structura.com
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-medium text-slate-500 tracking-wider uppercase">
                    Phone Number
                  </span>
                  <span className="text-[15px] font-medium text-slate-800">
                    +234 812 345 6789
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
                Structura Engineering Ltd
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
              <span className="text-[16px] font-bold text-[#0d4732]">8+ Years</span>
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
              { title: "Government ID", sub: "Passports_ElenaV.pdf" },
              { title: "Professional License", sub: "COREN_Cert_2023.pdf" },
              { title: "Business Registration", sub: "CAC_Registration.pdf" },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 rounded-[16px] border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium text-[#0d4732]">{doc.title}</span>
                  <span className="text-[12px] text-slate-500">{doc.sub}</span>
                </div>
                <Eye className="w-[20px] h-[20px] text-[#0d4732] opacity-80" />
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
              <span className="text-[15px] font-bold text-slate-900">Nigeria</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[15px] text-slate-500">State</span>
              <span className="text-[15px] font-bold text-slate-900">Lagos</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[15px] text-slate-500">City</span>
              <span className="text-[15px] font-bold text-slate-900">Lekki</span>
            </div>
          </div>
          <span className="text-[14px] text-slate-500 mt-5 mb-3">Service Areas</span>
          <div className="flex gap-2.5">
            {["Lekki", "VI", "Ikoyi"].map((area) => (
              <span
                key={area}
                className="px-3 py-1 bg-slate-100 rounded-full text-[12px] font-medium text-slate-700"
              >
                {area}
              </span>
            ))}
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
                <span className="text-[15px] font-bold text-[#0d4732]">Engr. Samuel Okoro</span>
                <span className="text-[13px] font-medium text-slate-500">
                  Former Employer / Mentor
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#0d4732] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] text-slate-500 mb-1">Contact Details</span>
            <span className="text-[15px] font-bold text-[#0d4732]">s.okoro@probuild.com</span>
            <span className="text-[15px] font-bold text-[#0d4732]">+234 809 123 4567</span>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-[22px] font-medium text-[#0d4732] mb-6">Actions</h3>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => triggerToast("Application Approved")}
              className="w-full h-[52px] bg-[#22c55e] hover:bg-[#16a34a] text-white text-[16px] font-medium rounded-[12px] shadow-none"
            >
              Approve
            </Button>
            <Button
              variant="outline"
              onClick={() => triggerToast("Application Rejected")}
              className="w-full h-[52px] bg-red-50/30 border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 text-[16px] font-medium rounded-[12px] shadow-none"
            >
              Reject
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
            <Link
              href="#"
              className="text-[14px] font-medium text-[#0d4732] flex items-center gap-1.5 hover:underline"
            >
              View Full Portfolio <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Lekki Heights Tower",
                date: "Completed 2022",
                img: applicant.portfolio[0] || "/images/portfolio_main.png",
              },
              {
                title: "Epe Logistics Hub",
                date: "Completed 2021",
                img: applicant.portfolio[1] || "/images/portfolio_forest.png",
              },
              {
                title: "VI Waterfront Villa",
                date: "Completed 2023",
                img: applicant.portfolio[2] || "/images/portfolio_warm.png",
              },
            ].map((project, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden border border-slate-100">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#0d4732]">{project.title}</span>
                  <span className="text-[12px] text-slate-500 mt-0.5">{project.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
