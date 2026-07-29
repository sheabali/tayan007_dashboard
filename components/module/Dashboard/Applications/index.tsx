"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants } from "./mockData";

const ApplicationsPage = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 mb-20">

            {/* Top Header Section */}
            <div className="flex justify-between items-center w-full mb-2">
                <h1 className="text-[32px] font-serif text-[#2a3b32] tracking-tight">
                    Professional Applications
                </h1>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shadow-sm shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700">Admin User</span>
                </div>
            </div>

            {/* Grid of Creator Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockApplicants.map((applicant) => (
                    <div
                        key={applicant.id}
                        className="bg-white p-7 rounded-[24px] shadow-sm flex flex-col transition-all duration-300 hover:shadow-md border border-slate-100/50"
                    >
                        {/* Avatar and Profile Info */}
                        <div className="flex items-center gap-5">
                            <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0">
                                <img
                                    src={applicant.avatarUrl}
                                    alt={applicant.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[22px] font-normal text-slate-900">
                                    {applicant.name}
                                </span>
                                <span className="text-[17px] text-slate-500">
                                    Applied {applicant.appliedDate}
                                </span>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="w-full h-px bg-slate-100 my-6"></div>

                        {/* CTA button */}
                        <Link href={`/admin/applications/${applicant.id}`} className="w-full">
                            <Button
                                className="w-full h-[54px] bg-[#0d4732] hover:bg-[#093021] text-white text-[16px] font-semibold rounded-full shadow-none transition-colors"
                            >
                                Review Application
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination component */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 w-full bg-[#fdfdfe] border-y border-slate-200/80 py-5 px-6">
                <span className="text-[14px] text-slate-600 font-medium">
                    Showing 1-4 of 1,248 users
                </span>

                {/* Navigation triggers */}
                <div className="flex items-center gap-2.5">
                    <Button
                        variant="outline"
                        className="w-[38px] h-[38px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-[38px] h-[38px] p-0 flex items-center justify-center text-[15px] font-semibold bg-[#333333] text-white hover:bg-[#222222] hover:text-white rounded-[8px]"
                    >
                        1
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-[38px] h-[38px] p-0 flex items-center justify-center text-[15px] font-semibold text-slate-700 hover:bg-slate-100 rounded-[8px] transition-colors cursor-pointer"
                    >
                        2
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-[38px] h-[38px] p-0 flex items-center justify-center text-[15px] font-semibold text-slate-700 hover:bg-slate-100 rounded-[8px] transition-colors cursor-pointer"
                    >
                        3
                    </Button>
                    <Button
                        variant="outline"
                        className="w-[38px] h-[38px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ApplicationsPage;