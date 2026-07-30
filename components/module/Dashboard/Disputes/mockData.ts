export interface DisputeStatItem {
  title: string;
  value: string;
  colorClass: string;
}

export const mockDisputeStats: DisputeStatItem[] = [
  {
    title: "Total users",
    value: "1852",
    colorClass: "text-slate-800",
  },
  {
    title: "Total completed jobs",
    value: "224",
    colorClass: "text-green-500",
  },
  {
    title: "Total report posted",
    value: "98",
    colorClass: "text-red-500",
  },
  {
    title: "Total report solved",
    value: "88",
    colorClass: "text-green-500",
  },
];

export interface DisputeItem {
  id: string;
  reportId: string;
  reportDate: string;
  reporter: {
    name: string;
    image: string;
  };
  reportedUser: {
    name: string;
    image: string;
  };
  title: string;
  status: "PENDING" | "SOLVED";
}

export const mockDisputes: DisputeItem[] = [
  {
    id: "1",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Michael Chen", image: "" },
    reportedUser: { name: "Michael Chen", image: "" },
    title: "Safety concern",
    status: "PENDING",
  },
  {
    id: "2",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Elena Rodriguez", image: "" },
    reportedUser: { name: "Elena Rodriguez", image: "" },
    title: "Unprofessional",
    status: "SOLVED",
  },
  {
    id: "3",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Jessica Lee", image: "" },
    reportedUser: { name: "Jessica Lee", image: "" },
    title: "Unprofessional",
    status: "SOLVED",
  },
  {
    id: "4",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Sarah Jenkins", image: "" },
    reportedUser: { name: "Sarah Jenkins", image: "" },
    title: "Safety concern",
    status: "PENDING",
  },
  {
    id: "5",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Sarah Jenkins", image: "" },
    reportedUser: { name: "Sarah Jenkins", image: "" },
    title: "Safety concern",
    status: "PENDING",
  },
  {
    id: "6",
    reportId: "#1534dsg",
    reportDate: "Jan 12 , 26",
    reporter: { name: "Sarah Jenkins", image: "" },
    reportedUser: { name: "Sarah Jenkins", image: "" },
    title: "Safety concern",
    status: "PENDING",
  },
];
