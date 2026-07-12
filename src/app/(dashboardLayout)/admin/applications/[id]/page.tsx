"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  MapPin,
  Globe,
  Phone,
  CheckCircle2,
  Ban,
  Clock,
  Camera,
  Video,
  Cpu,
  AlertTriangle
} from "lucide-react";
import { mockApplicants } from "@/components/module/Dashboard/Applications/mockData";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationReviewPage({ params }: PageProps) {
  const { id } = use(params);

  // Find applicant by ID
  const applicant = mockApplicants.find((a) => a.id === id);

  // Fallback if not found
  if (!applicant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />
        <h2 className="text-xl font-bold text-slate-800">Application Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          The application with ID <span className="font-mono text-slate-800 font-bold">{id}</span> does not exist or has been processed.
        </p>
        <Link href="/admin/applications" className="mt-2">
          <Button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow hover:bg-slate-700 transition-colors active:scale-95 cursor-pointer">
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ApplicationReviewDetailsView applicant={applicant} />
  );
}

// APPLICATION DETAILS VIEW COMPONENT
interface ApplicationReviewDetailsViewProps {
  applicant: typeof mockApplicants[0];
}

function ApplicationReviewDetailsView({ applicant }: ApplicationReviewDetailsViewProps) {
  // Local state for interactive buttons
  const [isApproved, setIsApproved] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = () => {
    if (isApproved) return;
    setIsApproved(true);
    triggerToast("Application Approved successfully!");
  };

  const handleSuspend = () => {
    setIsSuspended(prev => !prev);
    triggerToast(isSuspended ? "Creator suspension lifted." : "Creator account has been suspended.");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 mb-20 relative">

      {/* Toast Alert Box */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 border border-slate-800 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Header and Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/applications">
            <Button variant="ghost" className="p-2 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer active:scale-90">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>

          {/* Avatar and name in header */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
              <img
                src={applicant.avatarUrl}
                alt={applicant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none animate-fade-in">
                {applicant.name}
              </h1>
              <span className="text-xs font-bold text-slate-400 mt-1.5 leading-none">
                {applicant.title} • {applicant.location}
              </span>
            </div>
          </div>
        </div>

        {/* Admin profile widget */}
        <div className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-100 shadow-sm w-fit self-end md:self-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm border border-white">
            AU
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">Admin User</span>
          </div>
        </div>
      </div>

      {/* KPI Performance Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Jobs Completed</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{applicant.jobsCompleted}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Average Rating</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">
            {applicant.averageRating} <span className="text-xs font-semibold text-slate-400">/ 5.0</span>
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Response Time</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{applicant.responseTime}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Completion Rate</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{applicant.completionRate}</span>
        </div>
      </div>

      {/* Main Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Double-Column Block */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Profile Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Profile Overview</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
              {applicant.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-50/50 border border-blue-50 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Location</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">{applicant.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-indigo-50/50 border border-indigo-50 shrink-0">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Applied Date</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">{applicant.appliedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-50/50 border border-emerald-50 shrink-0">
                  <Mail className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Email Address</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">e.rodriguez@valleycreative.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-50/50 border border-purple-50 shrink-0">
                  <Phone className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Phone Number</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">+1 (310) 555-0192</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Highlights */}
          {applicant.portfolio && applicant.portfolio.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Portfolio Highlights</h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 row-span-2 relative aspect-[3/4] overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                  <img
                    src={applicant.portfolio[0]}
                    alt="Portfolio Spotlight"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {applicant.portfolio[1] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={applicant.portfolio[1]}
                      alt="Portfolio Item 2"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {applicant.portfolio[2] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={applicant.portfolio[2]}
                      alt="Portfolio Item 3"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {applicant.portfolio[3] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={applicant.portfolio[3]}
                      alt="Portfolio Item 4"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {applicant.portfolio[4] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={applicant.portfolio[4]}
                      alt="Portfolio Item 5"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {applicant.portfolio[5] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={applicant.portfolio[5]}
                      alt="Portfolio Item 6"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Equipment Inventory */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Equipment Inventory</h2>
            <div className="flex flex-col gap-2">
              {applicant.equipment.map((item, idx) => {
                const isCamera = item.toLowerCase().includes("camera") || item.toLowerCase().includes("sony") || item.toLowerCase().includes("fujifilm") || item.toLowerCase().includes("lens") || item.toLowerCase().includes("nikon") || item.toLowerCase().includes("canon");
                const isVideo = item.toLowerCase().includes("drone") || item.toLowerCase().includes("komodo") || item.toLowerCase().includes("ronin") || item.toLowerCase().includes("mic") || item.toLowerCase().includes("komodo") || item.toLowerCase().includes("go-pro");

                return (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-100/50 transition-colors">
                    {isCamera ? (
                      <Camera className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : isVideo ? (
                      <Video className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Admin Controls / summaries Column */}
        <div className="flex flex-col gap-6">

          {/* Admin Control (Review Specific) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Admin Control</span>

            {/* Approve Application Button */}
            <Button
              variant="ghost"
              onClick={handleApprove}
              disabled={isApproved}
              className={`flex items-center justify-center gap-2 w-full py-3.5 border rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm active:scale-[0.98] ${isApproved
                  ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white"
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isApproved ? "Approved" : "Approve Application"}
            </Button>

            {/* Suspend Account Button */}
            <Button
              variant="ghost"
              onClick={handleSuspend}
              className={`flex items-center justify-center gap-2 w-full py-3.5 border rounded-xl text-xs font-extrabold transition-all cursor-pointer mt-3 active:scale-[0.98] ${isSuspended
                  ? "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                  : "bg-white border-rose-200 hover:border-rose-300 hover:bg-rose-50/50 text-rose-500"
                }`}
            >
              <Ban className="w-4 h-4" />
              {isSuspended ? "Activate Creator" : "Suspend Creator"}
            </Button>
          </div>

          {/* Payout Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Payout Summary</span>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Total Earned</span>
                <span className="text-sm font-extrabold text-slate-800">{applicant.payoutSummary.totalEarned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Pending Payout</span>
                <span className="text-sm font-extrabold text-blue-600">{applicant.payoutSummary.pendingPayout}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Platform Fees</span>
                <span className="text-sm font-extrabold text-slate-800">{applicant.payoutSummary.platformFees}</span>
              </div>

              {/* Last Payout Block */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl mt-3">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Last Payout</span>
                  <span className="text-xs font-extrabold text-slate-700 mt-1 leading-none">
                    {applicant.payoutSummary.lastPayout.date} • {applicant.payoutSummary.lastPayout.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Service Areas</span>

            {/* Map Placeholders */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-100 mb-4 bg-slate-100 shadow-inner group">
              <img
                src={applicant.serviceAreas.mapUrl}
                alt="Service Location Map"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white ring-4 ring-blue-600/30 animate-pulse shadow-md" />
              </div>
            </div>

            {/* Region Details */}
            <span className="text-xs font-extrabold text-slate-700 leading-snug">Primary Region</span>
            <span className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{applicant.serviceAreas.region}</span>

            {/* Place Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-50">
              {applicant.serviceAreas.places.map((place, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors select-none">
                  {place}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
