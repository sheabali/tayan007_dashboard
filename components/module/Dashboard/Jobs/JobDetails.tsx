"use client";

import React from "react";
import { Banknote, Wallet, Calendar, Mail, Phone, Star, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetJobDetailsQuery, useSuspendJobMutation } from "@/redux/api/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getDaysRemaining = (endDateString: string) => {
    if (!endDateString) return "N/A";
    const end = new Date(endDateString);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Overdue";
    return `${diffDays} days remaining`;
};

const JobDetails = ({ id }: { id: string }) => {
    const { data: jobResponse, isLoading } = useGetJobDetailsQuery(id);
    const [suspendJob, { isLoading: isSuspending }] = useSuspendJobMutation();

    const handleSuspendJob = async () => {
        try {
            await suspendJob(id).unwrap();
            toast.success("Job suspended successfully");
        } catch (error) {
            console.error("Failed to suspend job:", error);
            toast.error("Failed to suspend job");
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
                <div className="flex justify-between items-center w-full mb-2">
                    <Skeleton className="h-10 w-[200px]" />
                </div>
                <Skeleton className="h-8 w-[300px] mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
                    {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-[20px]" />)}
                </div>
            </div>
        );
    }

    const job = jobResponse?.data;
    if (!job) {
        return <div className="p-6">Job not found.</div>;
    }

    const {
        jobTitle,
        jobDescription,
        serviceCategory,
        createdAt,
        expectedEndDate,
        client,
        worker,
        financial
    } = job;

    const commissionPercent = financial?.grossBudget && financial?.platformCommission
        ? Math.round((financial.platformCommission / financial.grossBudget) * 100)
        : 0;

    const isAlreadySuspended = job?.status === "SUSPENDED" || job?.status === "CANCELLED";

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

            {/* Job Title & Meta */}
            <div className="flex flex-col gap-1 mb-2">
                <h2 className="text-[28px] font-serif text-[#164231] tracking-tight">
                    {jobTitle || "N/A"}
                </h2>
                <span className="text-[15px] text-slate-500">
                    Project ID: #{job?.id?.slice(-6).toUpperCase()} · Created on {formatDate(createdAt)}
                    <span className="ml-2 font-medium">· Status: <span className={isAlreadySuspended ? "text-red-500" : "text-green-600"}>{job?.status || "ACTIVE"}</span></span>
                </span>
            </div>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
                {/* Total Budget */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start w-full mb-2">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-[#f4f7f5] text-[#164231] flex items-center justify-center shrink-0">
                            <Banknote className="w-[20px] h-[20px]" />
                        </div>
                        <span className="text-[14px] text-slate-400 font-medium">Total Budget</span>
                    </div>
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight">৳{financial?.grossBudget?.toLocaleString() || 0}</span>
                    <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-[#164231] w-full rounded-full"></div>
                    </div>
                </div>

                {/* Commission */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start w-full mb-2">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-[#fcf9f2] text-[#c99f45] flex items-center justify-center shrink-0">
                            <Wallet className="w-[20px] h-[20px]" />
                        </div>
                        <span className="text-[14px] text-slate-400 font-medium">Commission</span>
                    </div>
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight">৳{financial?.platformCommission?.toLocaleString() || 0}</span>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#c99f45] w-[50%] rounded-full" style={{ width: `${commissionPercent}%` }}></div>
                        </div>
                        <span className="text-[13px] font-bold text-[#c99f45]">{commissionPercent}%</span>
                    </div>
                </div>

                {/* Service Category */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start w-full mb-2">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <Settings2 className="w-[20px] h-[20px]" />
                        </div>
                        <span className="text-[14px] text-slate-400 font-medium">Service Category</span>
                    </div>
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight truncate" title={serviceCategory}>{serviceCategory || "N/A"}</span>
                    <span className="text-[14px] text-slate-500 mt-1">Category</span>
                </div>

                {/* Completion Date */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start w-full mb-2">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <Calendar className="w-[20px] h-[20px]" />
                        </div>
                        <span className="text-[14px] text-slate-400 font-medium">Completion Date</span>
                    </div>
                    <span className="text-[26px] font-semibold text-[#164231] tracking-tight whitespace-nowrap">{formatDate(expectedEndDate)}</span>
                    <span className="text-[14px] text-slate-500 mt-1">{getDaysRemaining(expectedEndDate)}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6 flex-1">
                    {/* Client Profile */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-serif text-[#164231] mb-6">Client Profile</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-bold">
                                {client?.profileImage ? (
                                    <img src={client.profileImage} alt="Client" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{client?.fullName?.charAt(0) || "C"}</span>
                                )}
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-[18px] font-semibold text-slate-800 mb-1">{client?.fullName || "N/A"}</span>
                                <span className="text-[15px] text-slate-500 mb-4">{[client?.city, client?.state, client?.country].filter(Boolean).join(", ")}</span>
                                <div className="flex gap-3 w-full">
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Mail className="w-[18px] h-[18px]" />
                                        <span className="truncate max-w-[150px]" title={client?.email}>{client?.email || "N/A"}</span>
                                    </Button>
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Phone className="w-[18px] h-[18px]" />
                                        {client?.phone || "N/A"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Professional */}
                    {worker ? (
                        <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                            <h3 className="text-[18px] font-serif text-[#164231] mb-6">Assigned Professional</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-bold">
                                    {worker?.profileImage ? (
                                        <img src={worker.profileImage} alt="Professional" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{worker?.fullName?.charAt(0) || "P"}</span>
                                    )}
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[18px] font-semibold text-slate-800">{worker?.fullName || "N/A"}</span>
                                        <div className="flex items-center gap-1 bg-[#ffedd5] text-[#d97706] px-2 py-0.5 rounded-md text-[13px] font-semibold">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            5.0
                                        </div>
                                    </div>
                                    <span className="text-[15px] text-slate-500 mb-4">{[worker?.city, worker?.state, worker?.country].filter(Boolean).join(", ")}</span>
                                    <div className="flex gap-3 w-full">
                                        <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                            <Mail className="w-[18px] h-[18px]" />
                                            <span className="truncate max-w-[150px]" title={worker?.email}>{worker?.email || "N/A"}</span>
                                        </Button>
                                        <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                            <Phone className="w-[18px] h-[18px]" />
                                            {worker?.phone || "N/A"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                            <h3 className="text-[18px] font-serif text-[#164231] mb-6">Assigned Professional</h3>
                            <div className="text-[15px] text-slate-500">No worker assigned yet.</div>
                        </div>
                    )}

                    {/* Project Scope & Details */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-serif text-[#164231] mb-6">Project Scope & Details</h3>
                        <div className="text-[15px] text-slate-600 leading-[1.7] flex flex-col gap-4">
                            <p className="whitespace-pre-wrap">
                                {jobDescription || "No description provided."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column / Sidebar */}
                <div className="flex flex-col gap-6 w-full lg:w-[380px] shrink-0">
                    {/* Financial Ledger */}
                    <div className="bg-[#093021] p-7 rounded-[20px] shadow-sm flex flex-col">
                        <h3 className="text-[18px] text-white mb-8">Financial Ledger</h3>
                        
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-[15px] text-[#8ea79d]">Gross Budget</span>
                            <span className="text-[18px] text-white">৳{financial?.grossBudget?.toLocaleString() || 0}</span>
                        </div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[15px] text-[#8ea79d]">Platform Commission</span>
                                <span className="text-[15px] text-[#8ea79d]">({commissionPercent}%)</span>
                            </div>
                            <span className="text-[18px] text-[#c99f45]">-৳{financial?.platformCommission?.toLocaleString() || 0}</span>
                        </div>

                        <div className="w-full h-px bg-[#1d4234] mb-8"></div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[15px] text-[#8ea79d]">Net</span>
                            <div className="flex justify-between items-end">
                                <span className="text-[15px] text-[#8ea79d]">Professional</span>
                                <span className="text-[28px] font-semibold text-white leading-none">৳{financial?.netProfessional?.toLocaleString() || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-semibold text-slate-800 mb-6">Actions</h3>
                        <Button 
                            onClick={handleSuspendJob}
                            disabled={isSuspending || isAlreadySuspended}
                            variant="outline" 
                            className="w-full h-12 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-[12px] text-[15px] font-medium transition-colors disabled:opacity-50"
                        >
                            {isSuspending ? "Suspending..." : (isAlreadySuspended ? "Job Suspended" : "Suspend Job")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
