"use client";

import { User } from "lucide-react";

export interface ActivityItem {
  name: string;
  action: string;
  time: string;
  avatarBg?: string;
  avatarColor?: string;
}

interface UserActivityProps {
  activities: ActivityItem[];
}

const UserActivity = ({ activities = [] }: UserActivityProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full w-full">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Recent User Activity</h3>

      <div className="flex flex-col gap-6 flex-1 justify-between">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 group transition-transform duration-200 hover:translate-x-1"
          >
            {/* Avatar container */}
            <div className={`w-9 h-9 rounded-full ${activity.avatarBg} ${activity.avatarColor} flex items-center justify-center shrink-0 border border-amber-100/50 shadow-sm`}>
              <User className="w-4 h-4 stroke-[2]" />
            </div>

            {/* Content info */}
            <div className="flex flex-col gap-1">
              <div className="text-sm text-slate-600 leading-snug">
                <span className="font-bold text-slate-800 mr-1.5 transition-colors duration-200 group-hover:text-amber-600">
                  {activity.name}
                </span>
                {activity.action}
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
