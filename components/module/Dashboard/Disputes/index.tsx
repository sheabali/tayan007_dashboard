"use client";

import { useState } from "react";
import DisputeStats from "./DisputeStats";
import DisputeList from "./DisputeList";
import { DisputeStatItem } from "./mockData";
import { useGetDisputesQuery } from "@/redux/api/dashboardApi";

const DisputesModule = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetDisputesQuery({ page, limit: 10 });

    const overview = data?.data?.overview;
    const disputes = data?.data?.disputes ?? [];

    const stats: DisputeStatItem[] = [
        {
            title: "Total users",
            value: overview?.totalUsers?.toString() ?? "—",
            colorClass: "text-slate-800",
        },
        {
            title: "Total completed jobs",
            value: overview?.totalCompletedJobs?.toString() ?? "—",
            colorClass: "text-green-500",
        },
        {
            title: "Total report posted",
            value: overview?.totalReportPosted?.toString() ?? "—",
            colorClass: "text-red-500",
        },
        {
            title: "Total report solved",
            value: overview?.totalReportSolved?.toString() ?? "—",
            colorClass: "text-green-500",
        },
    ];

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

            {/* Dispute Stats Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-[4px] shadow-sm h-24 animate-pulse" />
                    ))}
                </div>
            ) : isError ? (
                <div className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">
                    Failed to load dispute statistics.
                </div>
            ) : (
                <DisputeStats stats={stats} />
            )}

            {/* Dispute List & Filters & Table */}
            {isLoading ? (
                <div className="bg-white rounded-[8px] shadow-sm h-64 animate-pulse" />
            ) : isError ? (
                <div className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">
                    Failed to load disputes list.
                </div>
            ) : (
                <DisputeList disputes={disputes} meta={data?.meta} page={page} onPageChange={setPage} />
            )}
        </div>
    );
};

export default DisputesModule;
