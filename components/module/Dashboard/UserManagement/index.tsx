"use client";

import UserStats, { UserStatItem } from "./UserStats";
import UserList, { UserItem } from "./UserList";

const mockStats: UserStatItem[] = [
  {
    title: "Total Clients",
    value: "12,458",
    type: "clients",
  },
  {
    title: "Active Creators",
    value: "458",
    type: "creators",
  },
  {
    title: "New Signups",
    value: "92",
    type: "signups",
  },
  {
    title: "Pending Applications",
    value: "12,458",
    type: "applications",
  },
];

const mockUsers: UserItem[] = [
  {
    id: "1",
    name: "John Smith",
    userId: "U001",
    email: "john@example.com",
    phone: "+1 234-567-8901",
    status: "active",
    role: "Client",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Emma Wilson",
    userId: "U002",
    email: "emma@example.com",
    phone: "+1 234-567-8902",
    status: "active",
    role: "Client",
    joinDate: "2024-02-10",
  },
  {
    id: "3",
    name: "Michael Brown",
    userId: "U003",
    email: "michael@example.com",
    phone: "+1 234-567-8903",
    status: "suspended",
    role: "Creator",
    joinDate: "2024-03-05",
  },
  {
    id: "4",
    name: "Sarah Davis",
    userId: "U004",
    email: "sarah@example.com",
    phone: "+1 234-567-8904",
    status: "active",
    role: "Creator",
    joinDate: "2024-01-20",
  },
  {
    id: "5",
    name: "James Miller",
    userId: "U005",
    email: "james@example.com",
    phone: "+1 234-567-8905",
    status: "active",
    role: "Creator",
    joinDate: "2024-04-01",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    userId: "U006",
    email: "lisa@example.com",
    phone: "+1 234-567-8906",
    status: "active",
    role: "Client",
    joinDate: "2023-12-10",
  },
  {
    id: "7",
    name: "David Taylor",
    userId: "U007",
    email: "david@example.com",
    phone: "+1 234-567-8907",
    status: "suspended",
    role: "Creator",
    joinDate: "2024-05-15",
  },
  {
    id: "8",
    name: "Jennifer White",
    userId: "U008",
    email: "jennifer@example.com",
    phone: "+1 234-567-8908",
    status: "active",
    role: "Creator",
    joinDate: "2024-02-28",
  },
];

const UserManagementModule = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          User Managements
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm border border-white">
            AU
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">
              Admin User
            </span>
          </div>
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
