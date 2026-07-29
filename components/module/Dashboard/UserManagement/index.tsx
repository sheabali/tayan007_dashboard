"use client";

import UserStats from "./UserStats";
import UserList from "./UserList";
import { mockStats, mockUsers } from "./mockData";

const UserManagementModule = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
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
      <UserStats stats={mockStats} />

      {/* User List & Filters & Table */}
      <UserList users={mockUsers} />
    </div>
  );
};

export default UserManagementModule;
