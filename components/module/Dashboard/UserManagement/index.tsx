"use client";

import UserStats from "./UserStats";
import UserList from "./UserList";
import { mockStats, mockUsers } from "./mockData";

const UserManagementModule = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          User Managements
        </h1>
        {/* User profile widget */}

      </div>

      {/* User Stats Grid */}
      <UserStats stats={mockStats} />

      {/* User List & Filters & Table */}
      <UserList users={mockUsers} />
    </div>
  );
};

export default UserManagementModule;
