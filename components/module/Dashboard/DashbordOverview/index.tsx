"use client";

import { useGetDashboardDataQuery } from "../../../../redux/api/dashboardApi";
import MetricCards, { MetricItem } from "./MetricCards";
import PendingPayouts from "./PendingPayouts";
import RevenueChart, { RevenuePoint } from "./RevenueChart";
import UserActivity, { ActivityItem } from "./UserActivity";

interface DashboardResponse {
  data: {
    overview: {
      currency?: string;
      totalRevenue?: number;
      totalUsers?: number;
      activeProfessionals?: number;
      pendingApplications?: number;
    };
    monthlyRevenue: RevenuePoint[];
    recentActivity: {
      name: string;
      action: string;
      time: string;
    }[];
    pendingPayouts: {
      id: string;
      name: string;
      profession: string;
      initials: string;
      amount: number | string;
      status: string;
    }[];
  };
}

const DashboardOverview = () => {
  const { data: rawData, isLoading, isError, error } = useGetDashboardDataQuery({});
  const responseData = rawData as DashboardResponse;
  
  console.log("Dashboard API response:", { rawData, isError, error });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4f6f9]">
        <div className="text-xl font-medium text-slate-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (isError || !responseData?.data) {
    let errorMessage = "Failed to load dashboard data. Please try again later.";
    
    if (error) {
      if ('status' in error && error.status === 'FETCH_ERROR') {
        errorMessage = "Unable to connect to the server. Please ensure the backend is running.";
      } else if ('status' in error && typeof error.status === 'number') {
        errorMessage = `Server returned an error (Status: ${error.status}).`;
      }
    }

    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f4f6f9] px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-500 mb-6">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const { overview, monthlyRevenue, recentActivity, pendingPayouts } = responseData.data;

  const metrics: MetricItem[] = [
    {
      title: "Total Revenue",
      value: `${overview?.currency || "CFA"} ${overview?.totalRevenue?.toLocaleString() || "0"}`,
      type: "revenue",
    },
    {
      title: "Total Users",
      value: `${overview?.totalUsers?.toLocaleString() || "0"}`,
      type: "users",
    },
    {
      title: "Active Professionals",
      value: `${overview?.activeProfessionals?.toLocaleString() || "0"}`,
      type: "creators",
    },
    {
      title: "Pending Applications",
      value: `${overview?.pendingApplications?.toLocaleString() || "0"}`,
      type: "applications",
    },
  ];

  const revenueData: RevenuePoint[] = monthlyRevenue || [];

  const activityData: ActivityItem[] = (recentActivity || []).map((activity) => {
    // Basic relative time formatting if it's an ISO string
    const date = new Date(activity.time);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeString = activity.time;
    if (!isNaN(date.getTime())) {
      if (diffMins < 1) timeString = "Just now";
      else if (diffMins < 60) timeString = `${diffMins} mins ago`;
      else if (diffHours < 24) timeString = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      else if (diffDays < 7) timeString = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      else timeString = date.toLocaleDateString();
    }

    return {
      name: activity.name,
      action: activity.action,
      time: timeString,
      avatarBg: "bg-blue-50",
      avatarColor: "text-blue-500",
    };
  });

  const payoutsData = (pendingPayouts || []).map((payout, index: number) => {
    const bgColors = ["bg-blue-100", "bg-slate-100", "bg-amber-100", "bg-emerald-100"];
    const textColors = ["text-blue-600", "text-slate-600", "text-amber-600", "text-emerald-600"];
    const colorIndex = index % bgColors.length;

    return {
      id: payout.id,
      creator: {
        name: payout.name,
        role: payout.profession,
        initials: payout.initials,
        avatarBg: bgColors[colorIndex],
        avatarText: textColors[colorIndex],
      },
      amount: `$${Number(payout.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      status: payout.status === "PENDING" ? "AWAITING REVIEW" : payout.status,
    };
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
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
      <MetricCards metrics={metrics} />

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex w-full">
          <RevenueChart data={revenueData} />
        </div>
        <div className="lg:col-span-1 flex w-full">
          <UserActivity activities={activityData} />
        </div>
      </div>

      {/* Pending Payouts Table */}
      <PendingPayouts data={payoutsData} />
    </div>
  );
};

export default DashboardOverview;
