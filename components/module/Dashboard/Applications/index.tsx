"use client";

import Link from "next/link";
import { Camera, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants } from "./mockData";

const ApplicationsPage = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-2 mb-20">

            {/* Top Header Section */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    Creator Applications
                </h1>


            </div>

            {/* Grid of Creator Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockApplicants.map((applicant) => (
                    <div
                        key={applicant.id}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-md"
                    >
                        {/* Portrait Circle Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                            <img
                                src={applicant.avatarUrl}
                                alt={applicant.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                                }}
                            />
                        </div>

                        {/* Profile name and application details */}
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-slate-800 tracking-tight">
                                {applicant.name}
                            </span>
                            <span className="text-xs font-bold text-slate-400 mt-1 leading-none">
                                Applied {applicant.appliedDate}
                            </span>
                        </div>

                        {/* Media details */}
                        <div className="flex items-center gap-4 mt-1 mb-2 text-slate-500 font-bold text-xs">
                            <div className="flex items-center gap-1.5">
                                <Camera className="w-4 h-4 text-slate-400 shrink-0" />
                                <span>{applicant.photoCount} Photos</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Video className="w-4 h-4 text-slate-400 shrink-0" />
                                <span>{applicant.videoCount} Videos</span>
                            </div>
                        </div>

                        {/* CTA button with variant="ghost" to allow custom gray/black colors */}
                        <Link href={`/admin/applications/${applicant.id}`} className="w-full">
                            <Button
                                variant="ghost"
                                className="w-full py-3.5 bg-[#2A2A2A] hover:bg-black text-white hover:text-white text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                            >
                                Review Application
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination component */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 w-full">
                <span className="text-xs font-semibold text-slate-400">
                    Showing 1-9 of 1,248 applicants
                </span>

                {/* Navigation triggers */}
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-8 h-8 flex items-center justify-center text-xs font-extrabold bg-slate-800 text-white rounded-lg shadow-sm"
                    >
                        1
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                        2
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                        3
                    </Button>
                    <Button
                        variant="ghost"
                        className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ApplicationsPage;