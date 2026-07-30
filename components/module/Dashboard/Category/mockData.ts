export interface CategoryStatItem {
  title: string;
  value: string;
}

export const mockCategoryStats: CategoryStatItem[] = [
  {
    title: "Total categories",
    value: "18",
  },
  {
    title: "Top category",
    value: "Plumber",
  },
];

export interface CategoryItem {
  id: string;
  categoryIcon: string;
  categoryName: string;
  totalJobs: number;
  totalPros: number;
  status: "Active" | "Deleted";
}

export const mockCategories: CategoryItem[] = [
  {
    id: "1",
    categoryIcon: "architect",
    categoryName: "Architect",
    totalJobs: 12,
    totalPros: 36,
    status: "Active",
  },
  {
    id: "2",
    categoryIcon: "builder",
    categoryName: "Builder",
    totalJobs: 60,
    totalPros: 38,
    status: "Deleted",
  },
  {
    id: "3",
    categoryIcon: "contractor",
    categoryName: "Contractor",
    totalJobs: 36,
    totalPros: 40,
    status: "Active",
  },
  {
    id: "4",
    categoryIcon: "plumber",
    categoryName: "Plumber",
    totalJobs: 48,
    totalPros: 41,
    status: "Deleted",
  },
  {
    id: "5",
    categoryIcon: "electrician",
    categoryName: "Electrician",
    totalJobs: 72,
    totalPros: 39,
    status: "Active",
  },
  {
    id: "6",
    categoryIcon: "civil_engineer",
    categoryName: "Civil Engineer",
    totalJobs: 24,
    totalPros: 37,
    status: "Active",
  },
  {
    id: "7",
    categoryIcon: "land_surveyor",
    categoryName: "Land Surveyor",
    totalJobs: 84,
    totalPros: 42,
    status: "Active",
  },
];
