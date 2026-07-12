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
        {/* <div className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm border border-white">
            AU
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">
              Admin User
            </span>
          </div>
        </div> */}
      </div>

      {/* User Stats Grid */}
      <UserStats stats={mockStats} />

      {/* User List & Filters & Table */}
      <UserList users={mockUsers} />
    </div>
  );
};

export default UserManagementModule;
