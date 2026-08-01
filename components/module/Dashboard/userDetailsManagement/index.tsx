"use client";

import { Button } from "@/components/ui/button";
import {
    Ban,
    Briefcase,
    ClipboardList,
    Mail,
    Phone,
    MapPin,
    LogIn,
    FileText,
    MessageSquare,
    CreditCard,
    Banknote
} from "lucide-react";
import { Suspense } from "react";
import ProfessionalDetails from "./ProfessionalDetails";
import { useSearchParams } from "next/navigation";

const UserDetailsManagementContent = () => {
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');
    
    const role = (roleParam === 'professional' || roleParam === 'client') ? roleParam : 'client';

    if (role === 'professional') {
        return <ProfessionalDetails />;
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen relative">
            
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-10">
                <h1 className="text-xl text-gray-600 font-serif">Client Details: Chidi Okafor</h1>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-6 w-full overflow-hidden">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-[#114232]">Chidi Okafor</h2>
                            <p className="text-gray-500 mt-1">Client ID: PC-8921-NG &bull; Lagos, Nigeria</p>
                        </div>
                        <Button className="w-full sm:w-auto text-red-700 border border-red-700 bg-transparent hover:bg-red-50 rounded-xl px-6 py-5 flex items-center justify-center gap-2 font-medium">
                            <Ban className="w-4 h-4" />
                            Suspend
                        </Button>
                    </div>

                    {/* 4 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4">
                        {/* Profile Card */}
                        <div className="lg:flex-[1.5] bg-white rounded-3xl p-4 flex items-center gap-5 shadow-sm min-h-[150px]">
                            <div className="relative shrink-0 ml-2">
                                <div className="w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] rounded-full border-[4px] lg:border-[5px] border-[#f4f6f8] p-0.5">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute bottom-[6px] right-[6px] w-[1.2rem] h-[1.2rem] bg-[#16c062] border-[3px] border-white rounded-full"></div>
                            </div>
                            <span className="font-semibold text-2xl lg:text-[1.7rem] text-[#043322]">Chidi Okafor</span>
                        </div>

                        {/* Total Spent */}
                        <div className="lg:flex-[1.4] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#fcf8ef] flex items-center justify-center mb-3">
                                <Banknote className="w-5 h-5 text-[#8b722d]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">TOTAL SPENT</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">$15.4k</div>
                            </div>
                        </div>

                        {/* Total Jobs */}
                        <div className="lg:flex-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#f0f5f3] flex items-center justify-center mb-3">
                                <Briefcase className="w-5 h-5 text-[#043322]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">TOTAL JOBS</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">24</div>
                            </div>
                        </div>

                        {/* Active Jobs */}
                        <div className="lg:flex-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#f4f5f5] flex items-center justify-center mb-3">
                                <ClipboardList className="w-5 h-5 text-[#5e6a65]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">ACTIVE JOBS</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">03</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm">
                        <h3 className="text-xl lg:text-2xl font-semibold text-[#114232] mb-8">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 lg:gap-y-10 gap-x-8">
                            {/* Email */}
                            <div className="flex items-start gap-4 lg:gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-[#f4f7f6] flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-[#114232]" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">EMAIL ADDRESS</p>
                                    <p className="text-sm font-semibold text-[#114232] truncate">chidi.okafor@techpulse.ng</p>
                                </div>
                            </div>
                            {/* Phone */}
                            <div className="flex items-start gap-4 lg:gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-[#f4f7f6] flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-[#114232]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PHONE NUMBER</p>
                                    <p className="text-sm font-semibold text-[#114232]">+234 812 345 6789</p>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="flex items-start gap-4 lg:gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-[#f4f7f6] flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#114232]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PRIMARY ADDRESS</p>
                                    <p className="text-sm font-semibold text-[#114232]">45 Lekki Phase 1, Lagos,<br />Nigeria</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Activity Timeline */}
                <div className="w-full xl:w-[350px] shrink-0 bg-white rounded-3xl p-6 lg:p-8 shadow-sm self-start">
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#114232] mb-10">Activity Timeline</h3>
                    <div className="relative pl-10 space-y-10">

                        {/* Timeline Item 1 */}
                        <div className="relative">
                            <div className="absolute left-[-24px] top-[32px] bottom-[-40px] w-[1px] bg-gray-200"></div>
                            <div className="absolute left-[-40px] top-0 w-8 h-8 rounded-full bg-[#114232] flex items-center justify-center z-10">
                                <LogIn className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#114232]">Account Login</h4>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Accessed admin dashboard via mobile app.</p>
                                <p className="text-xs text-gray-400 mt-1.5">2 hours ago</p>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                        <div className="relative">
                            <div className="absolute left-[-24px] top-[32px] bottom-[-40px] w-[1px] bg-gray-200"></div>
                            <div className="absolute left-[-40px] top-0 w-8 h-8 rounded-full bg-[#fbc02d] flex items-center justify-center z-10">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#114232]">New Job Posted</h4>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">&quot;Cloud Infrastructure Audit&quot; was listed in marketplace.</p>
                                <p className="text-xs text-gray-400 mt-1.5">Yesterday, 4:12 PM</p>
                            </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="relative">
                            <div className="absolute left-[-24px] top-[32px] bottom-[-40px] w-[1px] bg-gray-200"></div>
                            <div className="absolute left-[-40px] top-0 w-8 h-8 rounded-full bg-[#e4e8e4] flex items-center justify-center z-10">
                                <MessageSquare className="w-4 h-4 text-[#114232]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#114232]">Review Submitted</h4>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Left a 5-star review for professional &quot;Amina Bello&quot;.</p>
                                <p className="text-xs text-gray-400 mt-1.5">Oct 22, 2023</p>
                            </div>
                        </div>

                        {/* Timeline Item 4 */}
                        <div className="relative">
                            <div className="absolute left-[-40px] top-0 w-8 h-8 rounded-full bg-[#e8ece8] flex items-center justify-center z-10">
                                <CreditCard className="w-4 h-4 text-[#114232]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#114232]">Payment Processed</h4>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">$1,200 payment confirmed for &quot;Security Patching&quot;.</p>
                                <p className="text-xs text-gray-400 mt-1.5">Oct 20, 2023</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const UserDetailsManagementModule = () => {
    return (
        <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading user details...</div>}>
            <UserDetailsManagementContent />
        </Suspense>
    );
};

export default UserDetailsManagementModule;