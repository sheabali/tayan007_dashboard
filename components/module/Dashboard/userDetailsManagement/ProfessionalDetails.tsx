import React from 'react';
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Eye,
    CheckCircle2,
    Building2,
    Award,
    ExternalLink,
    FileText,
} from "lucide-react";

const ProfessionalDetails = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl text-[#1f2937] font-serif">Professional Details: Elena Vance</h1>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column (Approx 70%) */}
                <div className="flex-[2] flex flex-col gap-6 w-full">

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative">
                        <div className="absolute top-6 right-6 text-sm text-gray-500">
                            Joined June 12, 2023
                        </div>
                        <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Elena Vance" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <h2 className="text-3xl font-bold text-[#043322]">Elena Vance</h2>
                                <div className="flex items-center gap-2 mt-1 text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-gray-500" />
                                    <span>Professional Member</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-8 mt-2">
                                <div>
                                    <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">EMAIL ADDRESS</p>
                                    <p className="text-sm font-medium text-gray-800">e.vance@structura.com</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">PHONE NUMBER</p>
                                    <p className="text-sm font-medium text-gray-800">+234 812 345 6789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business & Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Business Details */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-[#043322] font-semibold text-lg">
                                <Building2 className="w-5 h-5" />
                                Business Details
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">BUSINESS NAME</p>
                                <p className="text-base font-bold text-[#043322]">Structura Engineering Ltd</p>
                            </div>
                        </div>

                        {/* Expertise */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-[#043322] font-semibold text-lg uppercase tracking-wider text-sm">
                                <Award className="w-5 h-5" />
                                EXPERTISE
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">YEARS OF EXPERIENCE</p>
                                <p className="text-base font-bold text-[#043322]">8+ Years</p>
                            </div>
                        </div>
                    </div>

                    {/* Location & Guarantor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location Info */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-[#043322] font-semibold text-sm uppercase tracking-wider">
                                <MapPin className="w-5 h-5" />
                                LOCATION INFO
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Country</span>
                                    <span className="font-semibold text-gray-900">Nigeria</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">State</span>
                                    <span className="font-semibold text-gray-900">Lagos</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">City</span>
                                    <span className="font-semibold text-gray-900">Lekki</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-gray-500 mb-2">Service Areas</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Lekki</span>
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">VI</span>
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Ikoyi</span>
                                </div>
                            </div>
                        </div>

                        {/* Guarantor Information */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                            <h3 className="text-2xl font-semibold text-[#043322]">Guarantor<br />Information</h3>
                            <div className="mt-2">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-[#043322] text-lg">Engr. Samuel Okoro</p>
                                    <CheckCircle2 className="w-5 h-5 text-[#16c062]" />
                                </div>
                                <p className="text-sm text-gray-500">Former Employer / Mentor</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-1">Contact Details</p>
                                <p className="text-sm font-semibold text-[#043322]">s.okoro@probuild.com</p>
                                <p className="text-sm font-semibold text-[#043322]">+234 809 123 4567</p>
                            </div>
                        </div>
                    </div>

                    {/* Project Portfolio */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-[#043322]">Project Portfolio</h3>
                            <a href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-black">
                                View Full Portfolio
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Project 1 */}
                            <div className="flex flex-col gap-2">
                                <div className="h-32 rounded-xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400" alt="Lekki Heights Tower" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#043322] text-sm">Lekki Heights Tower</p>
                                    <p className="text-xs text-gray-500">Completed 2022</p>
                                </div>
                            </div>
                            {/* Project 2 */}
                            <div className="flex flex-col gap-2">
                                <div className="h-32 rounded-xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1581094722058-299e56346b85?auto=format&fit=crop&q=80&w=400" alt="Epe Logistics Hub" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#043322] text-sm">Epe Logistics Hub</p>
                                    <p className="text-xs text-gray-500">Completed 2021</p>
                                </div>
                            </div>
                            {/* Project 3 */}
                            <div className="flex flex-col gap-2">
                                <div className="h-32 rounded-xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400" alt="VI Waterfront Villa" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#043322] text-sm">VI Waterfront Villa</p>
                                    <p className="text-xs text-gray-500">Completed 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column (Approx 30%) */}
                <div className="flex-1 flex flex-col gap-6 w-full">

                    {/* Verification Docs */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 text-[#043322] font-semibold text-xl mb-6">
                            <FileText className="w-6 h-6" />
                            Verification Docs
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* Doc 1 */}
                            <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-sm font-semibold text-[#043322]">Government ID</p>
                                    <p className="text-xs text-gray-500">Passports_ElenaV.pdf</p>
                                </div>
                                <Eye className="w-5 h-5 text-[#043322]" />
                            </div>
                            {/* Doc 2 */}
                            <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-sm font-semibold text-[#043322]">Professional<br />License</p>
                                    <p className="text-xs text-gray-500 mt-1">COREN_Cert_2023.pdf</p>
                                </div>
                                <Eye className="w-5 h-5 text-[#043322]" />
                            </div>
                            {/* Doc 3 */}
                            <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-sm font-semibold text-[#043322]">Business<br />Registration</p>
                                    <p className="text-xs text-gray-500 mt-1">CAC_Registration.pdf</p>
                                </div>
                                <Eye className="w-5 h-5 text-[#043322]" />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-[#043322] mb-6">Actions</h3>
                        <Button className="w-full text-red-500 border border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl py-6 font-medium text-base shadow-none transition-all">
                            Suspend
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfessionalDetails;
