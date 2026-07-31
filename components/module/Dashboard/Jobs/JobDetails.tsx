"use client";

import React from "react";
import { Banknote, Wallet, Calendar, Mail, Phone, Star, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobDetails = ({ id }: { id: string }) => {
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
                    Structural Engineering Analysis
                </h2>
                <span className="text-[15px] text-slate-500">
                    Project ID: #JOB-8821 · Created on Oct 12, 2024
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
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight">₦2,500,000</span>
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
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight">₦1,250,000</span>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#c99f45] w-[50%] rounded-full"></div>
                        </div>
                        <span className="text-[13px] font-bold text-[#c99f45]">25%</span>
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
                    <span className="text-[28px] font-semibold text-[#164231] tracking-tight">Structural</span>
                    <span className="text-[14px] text-slate-500 mt-1">Specialized Engineering</span>
                </div>

                {/* Completion Date */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start w-full mb-2">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <Calendar className="w-[20px] h-[20px]" />
                        </div>
                        <span className="text-[14px] text-slate-400 font-medium">Completion Date</span>
                    </div>
                    <span className="text-[26px] font-semibold text-[#164231] tracking-tight whitespace-nowrap">Oct 30, 2024</span>
                    <span className="text-[14px] text-slate-500 mt-1">12 days remaining</span>
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
                            <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" alt="Client" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-[18px] font-semibold text-slate-800 mb-1">Kwame Mensah</span>
                                <span className="text-[15px] text-slate-500 mb-4">Lagos, Nigeria</span>
                                <div className="flex gap-3 w-full">
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Mail className="w-[18px] h-[18px]" />
                                        <span className="truncate max-w-[150px]">k.mensah@techpulse.ng</span>
                                    </Button>
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Phone className="w-[18px] h-[18px]" />
                                        +234 802 555 0192
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Professional */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-serif text-[#164231] mb-6">Assigned Professional</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" alt="Professional" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[18px] font-semibold text-slate-800">Elena Vance</span>
                                    <div className="flex items-center gap-1 bg-[#ffedd5] text-[#d97706] px-2 py-0.5 rounded-md text-[13px] font-semibold">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        4.9
                                    </div>
                                </div>
                                <span className="text-[15px] text-slate-500 mb-4">Lagos, Nigeria</span>
                                <div className="flex gap-3 w-full">
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Mail className="w-[18px] h-[18px]" />
                                        <span className="truncate max-w-[150px]">e.vance@vancelabs.io</span>
                                    </Button>
                                    <Button variant="secondary" className="flex-1 h-11 bg-[#f4f5f7] hover:bg-[#ebedf0] text-slate-600 rounded-[12px] flex items-center justify-center gap-2 px-0 text-[14px]">
                                        <Phone className="w-[18px] h-[18px]" />
                                        +234 802 555 0192
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Scope & Details */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-serif text-[#164231] mb-6">Project Scope & Details</h3>
                        <div className="text-[15px] text-slate-600 leading-[1.7] flex flex-col gap-4">
                            <p>
                                Detailed structural analysis for a 12-story premium residential tower
                                located in the Victoria Island district of Lagos. The scope includes a
                                comprehensive stress test of the core structural foundations, wind-load
                                assessment at varying altitudes, and seismic vulnerability modeling.
                            </p>
                            <p>
                                Deliverables must include a certified draft report for Milestone 3 and a
                                final architectural clearance certificate for the state building authority. All
                                calculations must adhere to both local Nigerian building codes and
                                international BS EN standards.
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
                            <span className="text-[18px] text-white">₦2,500,000</span>
                        </div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[15px] text-[#8ea79d]">Platform Commission</span>
                                <span className="text-[15px] text-[#8ea79d]">(25%)</span>
                            </div>
                            <span className="text-[18px] text-[#c99f45]">-₦250,000</span>
                        </div>

                        <div className="w-full h-px bg-[#1d4234] mb-8"></div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[15px] text-[#8ea79d]">Net</span>
                            <div className="flex justify-between items-end">
                                <span className="text-[15px] text-[#8ea79d]">Professional</span>
                                <span className="text-[28px] font-semibold text-white leading-none">₦2,250,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white p-7 rounded-[20px] shadow-sm border border-slate-100/50">
                        <h3 className="text-[18px] font-semibold text-slate-800 mb-6">Actions</h3>
                        <Button variant="outline" className="w-full h-12 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-[12px] text-[15px] font-medium transition-colors">
                            Suspend Job
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
