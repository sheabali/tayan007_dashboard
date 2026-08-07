"use client";

import { useState } from "react";
import UserStats, { UserStatItem } from "./UserStats";
import UserList from "./UserList";
import { useGetUserManagementDataQuery } from "@/redux/api/dashboardApi";

const UserManagementModule = () => {
  const [filters, setFilters] = useState({
    role: "Client",
    status: "All Users",
    sort: "Newest First",
    page: 1,
    limit: 10,
  });

  // Map filters to API params — role values sent as API expects (CLIENT / WORKER)
  const roleApiMap: Record<string, string> = {
    Client: "CLIENT",
    Professional: "WORKER",
  };
  const apiParams = {
    page: filters.page,
    limit: filters.limit,
    role: roleApiMap[filters.role] || filters.role,
    ...(filters.status !== "All Users" && { status: filters.status.toUpperCase() }),
    sort: filters.sort,
  };

  const { data: response, isLoading, isFetching } = useGetUserManagementDataQuery(apiParams);

  // Map stats
  let statsData: UserStatItem[] = [
    { title: "Total Clients", value: "0", type: "clients" },
    { title: "Active Professionals", value: "0", type: "creators" },
    { title: "New Signups", value: "0", type: "signups" },
    { title: "Pending Applications", value: "0", type: "applications" },
  ];

  if (response?.stats) {
    statsData = [
      { title: "Total Clients", value: String(response.stats.totalClients || 0), type: "clients" },
      { title: "Active Professionals", value: String(response.stats.activeProfessionals || 0), type: "creators" },
      { title: "New Signups", value: String(response.stats.newSignups || 0), type: "signups" },
      { title: "Pending Applications", value: String(response.stats.pendingApplications || 0), type: "applications" },
    ];
  }

  // Normalize API user data to match UserItem interface
  const rawUsers = response?.data || [];
  const users = rawUsers.map((u: Record<string, unknown>) => ({
    id: (u._id || u.id) as string,
    name: u.name as string,
    userId: u.userId as string | undefined,
    email: u.email as string,
    phone: u.phone as string,
    status: u.status as string,
    role: u.role as string,
    joinDate: u.joinDate as string,
  }));
  const meta = response?.meta;

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-serif text-[#1e293b] tracking-wide">
          User Managements
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      {/* User Stats Grid */}
      <UserStats stats={statsData} />

      {/* User List & Filters & Table */}
      <UserList 
        users={users} 
        meta={meta} 
        filters={filters} 
        onFilterChange={setFilters}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
};

export default UserManagementModule;

