import MetricCards, { MetricItem } from "./MetricCards";
import PendingPayouts from "./PendingPayouts";
import RevenueChart, { RevenuePoint } from "./RevenueChart";
import UserActivity, { ActivityItem } from "./UserActivity";

const dummyMetrics: MetricItem[] = [
  {
    title: "Total Revenue",
    value: "CFA 24,500",
    type: "revenue",
  },
  {
    title: "Total Users",
    value: "12,458",
    type: "users",
  },
  {
    title: "Active Professionals",
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
      avatarBg: "bg-slate-100",
      avatarText: "text-slate-600",
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
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-2xl font-serif text-slate-800">
          Dashboard Overview
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500"></div>
          <span className="text-sm text-slate-800 font-medium">Admin User</span>
        </div>
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
