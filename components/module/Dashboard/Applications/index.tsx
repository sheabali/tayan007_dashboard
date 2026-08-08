"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetApplicationsQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationItem {
    id: string;
    name: string;
    profileImage?: string;
    appliedDate: string;
}

const ApplicationsPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    
    const { data, isLoading, isError } = useGetApplicationsQuery({ page, limit });

    const applications = data?.data || [];
    const meta = data?.meta || { total: 0, page: 1, limit, totalPage: 1 };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < meta.totalPage) setPage(page + 1);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
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
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white p-7 rounded-[24px] shadow-sm flex flex-col border border-slate-100/50">
                            <div className="flex items-center gap-5">
                                <Skeleton className="w-[72px] h-[72px] rounded-full" />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <div className="w-full h-px bg-slate-100 my-6"></div>
                            <Skeleton className="w-full h-[54px] rounded-full" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="text-center py-10 text-red-500">Failed to load applications.</div>
            ) : applications.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No applications found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((applicant: ApplicationItem) => (
                        <div
                            key={applicant.id}
                            className="bg-white p-7 rounded-[24px] shadow-sm flex flex-col transition-all duration-300 hover:shadow-md border border-slate-100/50"
                        >
                            {/* Avatar and Profile Info */}
                            <div className="flex items-center gap-5">
                                <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0">
                                    <img
                                        src={applicant.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
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
            )}

            {/* Pagination component */}
            {!isLoading && applications.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 w-full bg-[#fdfdfe] border-y border-slate-200/80 py-5 px-6">
                    <span className="text-[14px] text-slate-600 font-medium">
                        Showing {Math.min((page - 1) * limit + 1, meta.total)}-{Math.min(page * limit, meta.total)} of {meta.total} users
                    </span>

                    {/* Navigation triggers */}
                    <div className="flex items-center gap-2.5">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className="w-[38px] h-[38px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                        </Button>
                        
                        {Array.from({ length: meta.totalPage }).map((_, idx) => {
                            const pageNum = idx + 1;
                            // Basic logic to show limited pages
                            if (
                                pageNum === 1 ||
                                pageNum === meta.totalPage ||
                                (pageNum >= page - 1 && pageNum <= page + 1)
                            ) {
                                return (
                                    <Button
                                        key={pageNum}
                                        variant="ghost"
                                        onClick={() => setPage(pageNum)}
                                        className={`w-[38px] h-[38px] p-0 flex items-center justify-center text-[15px] font-semibold rounded-[8px] transition-colors cursor-pointer ${
                                            pageNum === page 
                                                ? "bg-[#333333] text-white hover:bg-[#222222] hover:text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            } else if (
                                pageNum === page - 2 ||
                                pageNum === page + 2
                            ) {
                                return <span key={pageNum} className="text-slate-500">...</span>;
                            }
                            return null;
                        })}

                        <Button
                            variant="outline"
                            onClick={handleNext}
                            disabled={page === meta.totalPage}
                            className="w-[38px] h-[38px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsPage;