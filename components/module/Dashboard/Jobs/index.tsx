"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Trash2, Users, Paintbrush, UserCheck, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetJobsDataQuery, useDeleteJobMutation } from "@/redux/api/dashboardApi";
import { toast } from "sonner";
import { format } from "date-fns";

const getStatusStyles = (status: string) => {
    switch (status) {
        case "IN_PROGRESS":
            return "bg-blue-50/80 text-blue-600";
        case "COMPLETED":
            return "bg-green-50/80 text-green-600";
        case "PENDING":
        case "COMPLETION_REQUESTED":
            return "bg-amber-50/80 text-amber-600";
        case "APPROVED":
            return "bg-emerald-50/80 text-emerald-600";
        case "CANCELLED":
        case "REJECTED":
            return "bg-red-50/80 text-red-600";
        default:
            return "bg-slate-50/80 text-slate-600";
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case "IN_PROGRESS": return "In Progress";
        case "COMPLETED": return "Completed";
        case "PENDING": return "Pending";
        case "COMPLETION_REQUESTED": return "Completion Requested";
        case "APPROVED": return "Approved";
        case "CANCELLED": return "Cancelled";
        case "REJECTED": return "Rejected";
        default: return status;
    }
};

const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
};

interface Job {
    id: string | number;
    jobTitle: string;
    status: string;
    expectedEndDate: string;
    worker?: {
        fullName: string;
        profileImage: string | null;
    };
    client?: {
        fullName: string;
    };
}

const JobsPage = () => {
    const [page, setPage] = useState(1);
    const { data: jobsResponse, isLoading } = useGetJobsDataQuery({ page, limit: 10 });
    const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

    const handleDelete = async (id: string | number) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                await deleteJob(id.toString()).unwrap();
                toast.success("Job deleted successfully");
            } catch (error) {
                console.error("Failed to delete job:", error);
                toast.error("Failed to delete job");
            }
        }
    };

    const jobs = jobsResponse?.data || [];
    const meta = jobsResponse?.meta || { total: 0, page: 1, limit: 10, totalPage: 1, inProduction: 0, reviewStage: 0, completed: 0 };

    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
            {/* Top Header Section */}
            <div className="flex justify-between items-center w-full mb-2">
                <h1 className="text-[32px] font-serif text-[#2a3b32] tracking-tight">
                    Jobs Management
                </h1>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shadow-sm shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700">Admin User</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="flex flex-wrap gap-5 mb-2">
                {/* In Production */}
                <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center w-full md:w-[260px] border border-slate-100/50">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-medium text-slate-500">In Production</span>
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">{meta.inProduction || 0}</span>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-[16px] bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Users className="w-[26px] h-[26px]" />
                    </div>
                </div>

                {/* Review Stage */}
                <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center w-full md:w-[260px] border border-slate-100/50">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-medium text-slate-500">Review Stage</span>
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">{meta.reviewStage || 0}</span>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-[16px] bg-pink-50 text-pink-500 flex items-center justify-center">
                        <Paintbrush className="w-[26px] h-[26px]" />
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center w-full md:w-[260px] border border-slate-100/50">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-medium text-slate-500">Completed</span>
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">{meta.completed || 0}</span>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-[16px] bg-green-50 text-green-500 flex items-center justify-center">
                        <UserCheck className="w-[26px] h-[26px]" />
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-white">
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[22%]">Project Name</th>
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[20%]">Professionals</th>
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[18%]">Client</th>
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[15%]">Stage</th>
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[15%]">Deadline</th>
                                <th className="px-7 py-5 text-[15px] font-semibold text-slate-800 w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-7 py-8 text-center text-slate-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-7 py-8 text-center text-slate-500">
                                        No jobs found
                                    </td>
                                </tr>
                            ) : jobs.map((job: Job) => (
                                <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors last:border-0">
                                    {/* Project Name */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-[17px] font-medium bg-gradient-to-br from-indigo-500 to-purple-500">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <span className="text-slate-700 font-medium text-[15px]">{job.jobTitle}</span>
                                        </div>
                                    </td>

                                    {/* Professionals */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-3">
                                            {job.worker?.profileImage ? (
                                                <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0">
                                                    <img src={job.worker.profileImage} alt={job.worker.fullName} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[14px] font-medium bg-slate-300">
                                                    {getInitials(job.worker?.fullName)}
                                                </div>
                                            )}
                                            <span className="text-slate-600 text-[15px]">{job.worker?.fullName || 'N/A'}</span>
                                        </div>
                                    </td>

                                    {/* Client */}
                                    <td className="px-7 py-4">
                                        <span className="text-slate-600 text-[15px]">{job.client?.fullName || 'N/A'}</span>
                                    </td>

                                    {/* Stage */}
                                    <td className="px-7 py-4">
                                        <span className={`px-4 py-[6px] rounded-full text-[13px] font-medium inline-flex items-center justify-center ${getStatusStyles(job.status)}`}>
                                            {getStatusText(job.status)}
                                        </span>
                                    </td>

                                    {/* Deadline */}
                                    <td className="px-7 py-4">
                                        <span className="text-slate-500 text-[15px]">
                                            {job.expectedEndDate ? format(new Date(job.expectedEndDate), "MMM d, yyyy") : 'N/A'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-4">
                                            <Link href={`/admin/jobs/${job.id}`}>
                                                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                    <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(job.id)}
                                                disabled={isDeleting}
                                                className="text-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination component */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-[#fdfdfe] border-t border-slate-100 py-5 px-7">
                    <span className="text-[14px] text-slate-500 font-medium">
                        Showing {meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0}-
                        {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} jobs
                    </span>

                    {/* Navigation triggers */}
                    {meta.totalPage > 1 && (
                        <div className="flex items-center gap-2.5">
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="w-[36px] h-[36px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                            </Button>

                            {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((p) => (
                                <Button
                                    key={p}
                                    variant="ghost"
                                    onClick={() => setPage(p)}
                                    className={`w-[36px] h-[36px] p-0 flex items-center justify-center text-[14px] font-semibold rounded-[8px] transition-colors cursor-pointer ${
                                        p === page
                                            ? "bg-[#333333] text-white hover:bg-[#222222] hover:text-white"
                                            : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    {p}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
                                disabled={page === meta.totalPage}
                                className="w-[36px] h-[36px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
