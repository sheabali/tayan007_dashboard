import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Eye,
    CheckCircle2,
    Building2,
    Award,
    FileText,
    Mail,
    Phone,
    User,
    Ban,
    X,
} from "lucide-react";
import { useSuspendUserMutation } from "@/redux/api/dashboardApi";
import { toast } from "sonner";


interface PersonalInfo {
    id: string;
    name: string;
    role: string;
    status: string;
    location: string;
    profileImage?: string;
    joinDate?: string;
}

interface ContactInfo {
    email: string;
    phone: string;
    primaryAddress: string;
}

interface BusinessDetails {
    businessName?: string;
}

interface Expertise {
    yearsOfExperience?: string;
}

interface VerificationDocs {
    governmentId?: string[];
    professionalLicense?: string[];
    businessRegistration?: string[];
}

interface LocationInfo {
    country?: string;
    state?: string;
    city?: string;
    serviceAreas?: string[];
}

interface GuarantorInformation {
    name?: string;
    relationship?: string;
    email?: string;
    phone?: string;
}

interface ProfessionalDetailsProps {
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    businessDetails?: BusinessDetails;
    expertise?: Expertise;
    verificationDocs?: VerificationDocs;
    locationInfo?: LocationInfo;
    guarantorInformation?: GuarantorInformation;
    portfolio?: string[];
}

// Simple Image Modal for viewing verification docs / portfolio
const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
    >
        <div className="relative max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={onClose}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
                <X className="w-7 h-7" />
            </button>
            <img
                src={src}
                alt="Document"
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
        </div>
    </div>
);

const ProfessionalDetails = ({
    personalInfo,
    contactInfo,
    businessDetails,
    expertise,
    verificationDocs,
    locationInfo,
    guarantorInformation,
    portfolio,
}: ProfessionalDetailsProps) => {
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();

    const isAlreadySuspended = personalInfo.status === 'SUSPENDED';

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

    const docSections = [
        { label: "Government ID", urls: verificationDocs?.governmentId },
        { label: "Professional License", urls: verificationDocs?.professionalLicense },
        { label: "Business Registration", urls: verificationDocs?.businessRegistration },
    ].filter(d => d.urls && d.urls.length > 0);

    return (
        <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">

            {/* Image Preview Modal */}
            {previewSrc && <ImageModal src={previewSrc} onClose={() => setPreviewSrc(null)} />}

            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 pt-10">
                <h1 className="text-xl text-gray-600 font-serif">Professional Details: {personalInfo.name}</h1>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-[2] flex flex-col gap-6 w-full">

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative">
                        {personalInfo.joinDate && (
                            <div className="absolute top-6 right-6 text-xs text-gray-400 font-medium">
                                Joined {personalInfo.joinDate}
                            </div>
                        )}
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100">
                                {personalInfo.profileImage ? (
                                    <img
                                        src={personalInfo.profileImage}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#e8efe8]">
                                        <User className="w-12 h-12 text-[#114232]" />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`absolute bottom-[-4px] right-[-4px] w-5 h-5 rounded-full border-2 border-white ${personalInfo.status === 'ACTIVE' ? 'bg-[#16c062]' : 'bg-gray-400'}`}
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <h2 className="text-3xl font-bold text-[#043322]">{personalInfo.name}</h2>
                                <div className="flex items-center gap-2 mt-1 text-gray-500">
                                    <CheckCircle2 className="w-4 h-4 text-[#16c062]" />
                                    <span className="text-sm">Professional Member</span>
                                    <span className={`ml-3 inline-block px-3 py-0.5 text-[11px] font-semibold rounded-full ${personalInfo.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {personalInfo.status}
                                    </span>
                                </div>
                                {personalInfo.location && (
                                    <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-sm">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {personalInfo.location}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 mt-1">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">EMAIL ADDRESS</p>
                                    <p className="text-sm font-semibold text-[#114232]">{contactInfo.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">PHONE NUMBER</p>
                                    <p className="text-sm font-semibold text-[#114232]">{contactInfo.phone || 'N/A'}</p>
                                </div>
                                {contactInfo.primaryAddress && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">PRIMARY ADDRESS</p>
                                        <p className="text-sm font-semibold text-[#114232]">{contactInfo.primaryAddress}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Suspend button */}
                        <Button
                            onClick={handleSuspend}
                            disabled={isSuspending || isAlreadySuspended}
                            className="shrink-0 text-red-700 border border-red-700 bg-transparent hover:bg-red-50 rounded-xl px-5 py-5 flex items-center gap-2 font-medium shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Ban className="w-4 h-4" />
                            {isSuspending ? 'Suspending...' : isAlreadySuspended ? 'Suspended' : 'Suspend'}
                        </Button>
                    </div>

                    {/* Business & Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Business Details */}
                        {businessDetails && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-[#043322] font-semibold text-lg">
                                    <Building2 className="w-5 h-5" />
                                    Business Details
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">BUSINESS NAME</p>
                                    <p className="text-base font-bold text-[#043322]">{businessDetails.businessName || 'N/A'}</p>
                                </div>
                            </div>
                        )}

                        {/* Expertise */}
                        {expertise && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-[#043322] font-semibold text-lg">
                                    <Award className="w-5 h-5" />
                                    Expertise
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">YEARS OF EXPERIENCE</p>
                                    <p className="text-base font-bold text-[#043322]">{expertise.yearsOfExperience || 'N/A'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Location & Guarantor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location Info */}
                        {locationInfo && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-[#043322] font-semibold text-sm uppercase tracking-wider">
                                    <MapPin className="w-5 h-5" />
                                    Location Info
                                </div>
                                <div className="flex flex-col gap-3">
                                    {locationInfo.country && (
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">Country</span>
                                            <span className="font-semibold text-gray-900">{locationInfo.country}</span>
                                        </div>
                                    )}
                                    {locationInfo.state && (
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">State</span>
                                            <span className="font-semibold text-gray-900">{locationInfo.state}</span>
                                        </div>
                                    )}
                                    {locationInfo.city && (
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">City</span>
                                            <span className="font-semibold text-gray-900">{locationInfo.city}</span>
                                        </div>
                                    )}
                                </div>
                                {locationInfo.serviceAreas && locationInfo.serviceAreas.length > 0 && (
                                    <div className="mt-1">
                                        <p className="text-gray-500 text-sm mb-2">Service Areas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {locationInfo.serviceAreas.map((area, i) => (
                                                <span key={i} className="px-3 py-1 bg-[#f0f5f3] rounded-full text-xs font-medium text-[#114232]">
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Guarantor Information */}
                        {guarantorInformation && guarantorInformation.name && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                                <h3 className="text-lg font-semibold text-[#043322]">Guarantor Information</h3>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-[#043322] text-base">{guarantorInformation.name}</p>
                                        <CheckCircle2 className="w-4 h-4 text-[#16c062]" />
                                    </div>
                                    {guarantorInformation.relationship && (
                                        <p className="text-sm text-gray-500 mt-0.5">{guarantorInformation.relationship}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mt-1">
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Contact Details</p>
                                    {guarantorInformation.email && (
                                        <div className="flex items-center gap-2 text-sm text-[#043322] font-medium">
                                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                                            {guarantorInformation.email}
                                        </div>
                                    )}
                                    {guarantorInformation.phone && (
                                        <div className="flex items-center gap-2 text-sm text-[#043322] font-medium">
                                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                                            {guarantorInformation.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Project Portfolio */}
                    {portfolio && portfolio.length > 0 && (
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-[#043322] mb-6">Project Portfolio</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {portfolio.map((url, i) => (
                                    <div
                                        key={i}
                                        className="group relative h-32 rounded-xl overflow-hidden cursor-pointer"
                                        onClick={() => setPreviewSrc(url)}
                                    >
                                        <img
                                            src={url}
                                            alt={`Portfolio ${i + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col gap-6 w-full xl:max-w-[340px] shrink-0">

                    {/* Verification Docs */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 text-[#043322] font-semibold text-xl mb-6">
                            <FileText className="w-6 h-6" />
                            Verification Docs
                        </div>
                        {docSections.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {docSections.map((section) =>
                                    (section.urls || []).map((url, urlIdx) => (
                                        <div
                                            key={`${section.label}-${urlIdx}`}
                                            className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
                                            onClick={() => setPreviewSrc(url)}
                                        >
                                            <div>
                                                <p className="text-sm font-semibold text-[#043322]">{section.label}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">
                                                    {url.split('/').pop()}
                                                </p>
                                            </div>
                                            <Eye className="w-5 h-5 text-[#043322] opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No verification documents uploaded.</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-[#043322] mb-6">Actions</h3>
                        <Button
                            onClick={handleSuspend}
                            disabled={isSuspending || isAlreadySuspended}
                            className="w-full text-red-500 border border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl py-6 font-medium text-base shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Ban className="w-4 h-4 mr-2" />
                            {isSuspending ? 'Suspending...' : isAlreadySuspended ? 'User Suspended' : 'Suspend'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalDetails;
