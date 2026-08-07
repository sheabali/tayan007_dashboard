"use client";

import { Button } from "@/components/ui/button";
import {
    Ban,
    Briefcase,
    ClipboardList,
    Mail,
    Phone,
    MapPin,
    FileText,
    Banknote,
    LogIn,
    MessageSquare,
    CreditCard,
    User,
} from "lucide-react";
import { Suspense } from "react";
import ProfessionalDetails from "./ProfessionalDetails";
import { useParams, useSearchParams } from "next/navigation";
import { useGetUserDetailsQuery, useSuspendUserMutation } from "@/redux/api/dashboardApi";
import { toast } from "sonner";

interface TimelineItem {
    title?: string;
    description?: string;
    date?: string;
    type?: string;
    createdAt?: string;
    timestamp?: string;
    time?: string;
}

const formatTimelineDate = (dateString?: string) => {
    if (!dateString) return 'Recent';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;

        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
};

const getTimelineIconStyles = (title?: string, type?: string) => {
    const t = (type || title || '').toLowerCase();

    if (t.includes('login') || t.includes('account')) {
        return {
            icon: <LogIn className="w-4 h-4 text-white" />,
            bg: "bg-[#114232]"
        };
    }
    if (t.includes('job') || t.includes('post')) {
        return {
            icon: <FileText className="w-4 h-4 text-[#114232]" />,
            bg: "bg-[#fbc02d]"
        };
    }
    if (t.includes('review') || t.includes('message')) {
        return {
            icon: <MessageSquare className="w-4 h-4 text-[#114232]" />,
            bg: "bg-[#e4e8e4]"
        };
    }
    if (t.includes('payment') || t.includes('transaction')) {
        return {
            icon: <CreditCard className="w-4 h-4 text-[#114232]" />,
            bg: "bg-[#e8ece8]"
        };
    }

    // Default fallback
    return {
        icon: <FileText className="w-4 h-4 text-[#114232]" />,
        bg: "bg-[#f4f6f8]"
    };
};

const UserDetailsManagementContent = () => {
    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');

    const { data: response, isLoading, isError } = useGetUserDetailsQuery(id);

    // Hooks must be called unconditionally at the top level — before any early returns
    const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-[#114232] border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 text-sm font-medium">Loading user details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !response?.data) {
        return (
            <div className="flex flex-col gap-6 w-full p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500 font-medium">Failed to load user details.</p>
                </div>
            </div>
        );
    }

    const userData = response.data;

    // Determine role from API
    const apiRole = userData?.personalInfo?.role;
    const isProfessional = apiRole === 'WORKER' || apiRole === 'PROFESSIONAL' || roleParam === 'professional';

    if (isProfessional) {
        return (
            <ProfessionalDetails
                personalInfo={userData.personalInfo}
                contactInfo={userData.contactInfo}
                businessDetails={userData.businessDetails}
                expertise={userData.expertise}
                verificationDocs={userData.verificationDocs}
                locationInfo={userData.locationInfo}
                guarantorInformation={userData.guarantorInformation}
                portfolio={userData.portfolio}
            />
        );
    }

    // CLIENT VIEW
    const { personalInfo, contactInfo, stats, timeline } = userData;

    const isAlreadySuspended = personalInfo?.status === 'SUSPENDED';

    const handleSuspend = async () => {
        if (isAlreadySuspended || isSuspending) return;
        try {
            await suspendUser(personalInfo.id).unwrap();
            toast.success(`${personalInfo?.name ?? 'User'} has been suspended successfully`);
        } catch (err) {
            console.error('Failed to suspend user:', err);
            toast.error('Failed to suspend user. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen relative">

            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-10">
                <h1 className="text-xl text-gray-600 font-serif">Client Details: {personalInfo?.name}</h1>
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
                            <h2 className="text-3xl font-bold text-[#114232]">{personalInfo?.name}</h2>
                            <p className="text-gray-500 mt-1 text-sm">
                                Client ID: {personalInfo?.id}
                                {personalInfo?.location && <> &bull; {personalInfo.location}</>}
                            </p>
                        </div>
                        <Button
                            onClick={handleSuspend}
                            disabled={isSuspending || isAlreadySuspended}
                            className="w-full sm:w-auto text-red-700 border border-red-700 bg-transparent hover:bg-red-50 rounded-xl px-6 py-5 flex items-center justify-center gap-2 font-medium shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Ban className="w-4 h-4" />
                            {isSuspending ? 'Suspending...' : isAlreadySuspended ? 'Suspended' : 'Suspend'}
                        </Button>
                    </div>

                    {/* 4 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4">
                        {/* Profile Card */}
                        <div className="lg:flex-[1.5] bg-white rounded-3xl p-4 flex items-center gap-5 shadow-sm min-h-[150px]">
                            <div className="relative shrink-0 ml-2">
                                <div className="w-[6rem] h-[6rem] lg:w-[7rem] lg:h-[7rem] rounded-full border-[4px] lg:border-[5px] border-[#f4f6f8] overflow-hidden bg-[#e8efe8] flex items-center justify-center">
                                    {personalInfo?.profileImage ? (
                                        <img
                                            src={personalInfo.profileImage}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-[#114232]" />
                                    )}
                                </div>
                                <div className={`absolute bottom-[6px] right-[6px] w-[1.2rem] h-[1.2rem] ${personalInfo?.status === 'ACTIVE' ? 'bg-[#16c062]' : 'bg-gray-400'} border-[3px] border-white rounded-full`}></div>
                            </div>
                            <div>
                                <span className="font-semibold text-2xl lg:text-[1.7rem] text-[#043322]">{personalInfo?.name}</span>
                                <div className="mt-1">
                                    <span className={`inline-block px-3 py-0.5 text-[11px] font-semibold rounded-full ${personalInfo?.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {personalInfo?.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Total Spent */}
                        <div className="lg:flex-[1.4] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#fcf8ef] flex items-center justify-center mb-3">
                                <Banknote className="w-5 h-5 text-[#8b722d]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">TOTAL SPENT</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">${stats?.totalSpent ?? 0}</div>
                            </div>
                        </div>

                        {/* Total Jobs */}
                        <div className="lg:flex-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#f0f5f3] flex items-center justify-center mb-3">
                                <Briefcase className="w-5 h-5 text-[#043322]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">TOTAL JOBS</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">{stats?.totalJobs ?? 0}</div>
                            </div>
                        </div>

                        {/* Active Jobs */}
                        <div className="lg:flex-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[150px]">
                            <div className="w-11 h-11 rounded-[0.8rem] bg-[#f4f5f5] flex items-center justify-center mb-3">
                                <ClipboardList className="w-5 h-5 text-[#5e6a65]" />
                            </div>
                            <div>
                                <h4 className="text-[12px] lg:text-[13px] font-bold text-[#3d4b43] uppercase tracking-wide mb-1">ACTIVE JOBS</h4>
                                <div className="text-4xl lg:text-[2.8rem] leading-none font-bold text-[#043322] tracking-tight">{stats?.activeJobs ?? 0}</div>
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
                                    <p className="text-sm font-semibold text-[#114232] truncate">{contactInfo?.email || 'N/A'}</p>
                                </div>
                            </div>
                            {/* Phone */}
                            <div className="flex items-start gap-4 lg:gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-[#f4f7f6] flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-[#114232]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PHONE NUMBER</p>
                                    <p className="text-sm font-semibold text-[#114232]">{contactInfo?.phone || 'N/A'}</p>
                                </div>
                            </div>
                            {/* Address */}
                            {contactInfo?.primaryAddress && (
                                <div className="flex items-start gap-4 lg:gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#f4f7f6] flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-[#114232]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PRIMARY ADDRESS</p>
                                        <p className="text-sm font-semibold text-[#114232]">{contactInfo.primaryAddress}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Activity Timeline */}
                <div className="w-full xl:w-[350px] shrink-0 bg-white rounded-3xl p-6 lg:p-8 shadow-sm self-start">
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#114232] mb-10">Activity Timeline</h3>
                    <div className="relative pl-10 space-y-10">
                        {timeline && timeline.length > 0 ? (
                            timeline.map((item: TimelineItem, idx: number) => {
                                const styles = getTimelineIconStyles(item.title, item.type);
                                const rawDate = item.time || item.date || item.createdAt || item.timestamp;
                                const formattedDate = rawDate ? formatTimelineDate(rawDate) : 'Recent';

                                return (
                                    <div key={idx} className="relative">
                                        <div className="absolute left-[-24px] top-[32px] bottom-[-40px] w-[1px] bg-gray-200"></div>
                                        <div className={`absolute left-[-40px] top-0 w-8 h-8 rounded-full ${styles.bg} flex items-center justify-center z-10`}>
                                            {styles.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#114232]">{item.title || 'Activity'}</h4>
                                            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{item.description || 'Description not available'}</p>
                                            <p className="text-xs text-gray-400 mt-1.5">{formattedDate}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500">No recent activity.</p>
                        )}
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
