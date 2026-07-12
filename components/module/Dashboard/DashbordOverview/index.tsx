import MetricCards, { MetricItem } from "./MetricCards";
import RevenueChart, { RevenuePoint } from "./RevenueChart";
import UserActivity, { ActivityItem } from "./UserActivity";
import PendingPayouts from "./PendingPayouts";

// Mock data declared locally for easy replacement with API fetches
const dummyMetrics: MetricItem[] = [
    {
        title: "Total Revenue",
        value: "$24,500",
        type: "revenue",
    },
    {
        title: "Total Users",
        value: "12,458",
        type: "users",
    },
    {
        title: "Active Creators",
        value: "458",
        type: "creators",
    },
    {
        title: "Pending Applications",
        value: "12,458",
        type: "applications",
    },
];

const dummyRevenue: RevenuePoint[] = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 58000 },
    { month: "Jun", revenue: 72000 },
];

const dummyActivities: ActivityItem[] = [
    {
        name: "John Smith",
        action: "Booked chalets",
        time: "5 mins ago",
        avatarBg: "bg-amber-50",
        avatarColor: "text-amber-500",
    },
    {
        name: "Emma Wilson",
        action: "Cancelled booking #92",
        time: "12 mins ago",
        avatarBg: "bg-amber-50",
        avatarColor: "text-amber-500",
    },
    {
        name: "New Provider",
        action: "Registration pending approval",
        time: "25 mins ago",
        avatarBg: "bg-amber-50",
        avatarColor: "text-amber-500",
    },
    {
        name: "Michael Brown",
        action: "Cancelled booking #892",
        time: "1 hour ago",
        avatarBg: "bg-amber-50",
        avatarColor: "text-amber-500",
    },
];

const dummyPayouts = [
    {
        id: "1",
        creator: {
            name: "Marcus Jordan",
            role: "Photography",
            initials: "MJ",
            avatarBg: "bg-blue-100",
            avatarText: "text-blue-600",
        },
        amount: "$1,250.00",
        status: "AWAITING REVIEW",
    },
    {
        id: "2",
        creator: {
            name: "Sarah Lee",
            role: "Video Editing",
            initials: "SL",
            avatarBg: "bg-emerald-100",
            avatarText: "text-emerald-600",
        },
        amount: "$840.00",
        status: "AWAITING REVIEW",
    },
    {
        id: "3",
        creator: {
            name: "David Kim",
            role: "Graphic Design",
            initials: "DK",
            avatarBg: "bg-slate-100",
            avatarText: "text-slate-600",
        },
        amount: "$2,100.00",
        status: "AWAITING REVIEW",
    },
];

const DashboardOverview = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Top Header Section */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    Dashboard Overview
                </h1>
                {/* User profile widget */}

            </div>

            {/* Metric Cards Grid */}
            <MetricCards metrics={dummyMetrics} />

            {/* Charts and Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2 flex w-full">
                    <RevenueChart data={dummyRevenue} />
                </div>
                <div className="lg:col-span-1 flex w-full">
                    <UserActivity activities={dummyActivities} />
                </div>
            </div>

            {/* Pending Payouts Table */}
            <PendingPayouts data={dummyPayouts} />
        </div>
    );
};

export default DashboardOverview;