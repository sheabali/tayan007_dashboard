"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Trash2, Users, Paintbrush, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockJobs } from "./mockData";

const JobsPage = () => {
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
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">24</span>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-[16px] bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Users className="w-[26px] h-[26px]" />
                    </div>
                </div>

                {/* Review Stage */}
                <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center w-full md:w-[260px] border border-slate-100/50">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-medium text-slate-500">Review Stage</span>
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">11</span>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-[16px] bg-pink-50 text-pink-500 flex items-center justify-center">
                        <Paintbrush className="w-[26px] h-[26px]" />
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center w-full md:w-[260px] border border-slate-100/50">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-medium text-slate-500">Completed</span>
                        <span className="text-[32px] font-semibold text-slate-900 leading-none">42</span>
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
                            {mockJobs.map((job) => (
                                <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors last:border-0">
                                    {/* Project Name */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-[17px] font-medium ${job.projectColor}`}>
                                                {job.projectIcon}
                                            </div>
                                            <span className="text-slate-700 font-medium text-[15px]">{job.projectName}</span>
                                        </div>
                                    </td>

                                    {/* Professionals */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-3">
                                            {job.professionalAvatar ? (
                                                <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0">
                                                    <img src={job.professionalAvatar} alt={job.professionalName} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[14px] font-medium ${job.professionalColor}`}>
                                                    {job.professionalInitial}
                                                </div>
                                            )}
                                            <span className="text-slate-600 text-[15px]">{job.professionalName}</span>
                                        </div>
                                    </td>

                                    {/* Client */}
                                    <td className="px-7 py-4">
                                        <span className="text-slate-600 text-[15px]">{job.clientName}</span>
                                    </td>

                                    {/* Stage */}
                                    <td className="px-7 py-4">
                                        <span className={`px-4 py-[6px] rounded-full text-[13px] font-medium inline-flex items-center justify-center
                                            ${job.stage === 'In Progress' ? 'bg-blue-50/80 text-blue-600' : ''}
                                            ${job.stage === 'Completed' ? 'bg-green-50/80 text-green-600' : ''}
                                            ${job.stage === 'Pending' ? 'bg-amber-50/80 text-amber-600' : ''}
                                        `}>
                                            {job.stage}
                                        </span>
                                    </td>

                                    {/* Deadline */}
                                    <td className="px-7 py-4">
                                        <span className="text-slate-500 text-[15px]">{job.deadline}</span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-7 py-4">
                                        <div className="flex items-center gap-4">
                                            <Link href={`/admin/jobs/${job.id}`}>
                                                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                    <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                                </button>
                                            </Link>
                                            <button className="text-red-400 hover:text-red-500 transition-colors">
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
                        Showing 1-4 of 1,248 users
                    </span>

                    {/* Navigation triggers */}
                    <div className="flex items-center gap-2.5">
                        <Button
                            variant="outline"
                            className="w-[36px] h-[36px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-[36px] h-[36px] p-0 flex items-center justify-center text-[14px] font-semibold bg-[#333333] text-white hover:bg-[#222222] hover:text-white rounded-[8px]"
                        >
                            1
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-[36px] h-[36px] p-0 flex items-center justify-center text-[14px] font-semibold text-slate-700 hover:bg-slate-100 rounded-[8px] transition-colors cursor-pointer"
                        >
                            2
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-[36px] h-[36px] p-0 flex items-center justify-center text-[14px] font-semibold text-slate-700 hover:bg-slate-100 rounded-[8px] transition-colors cursor-pointer"
                        >
                            3
                        </Button>
                        <Button
                            variant="outline"
                            className="w-[36px] h-[36px] p-0 flex items-center justify-center bg-white border-slate-200 text-slate-600 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
