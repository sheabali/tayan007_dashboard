"use client";

import { useState } from "react";
import CategoryStats from "./CategoryStats";
import CategoryList, { CategoryItem } from "./CategoryList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import { useGetCategoryStatsQuery } from "@/redux/api/dashboardApi";
import { CategoryStatItem } from "./mockData";

const CategoryModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CategoryItem | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCategoryStatsQuery({ page, limit: 10 });

  // Separate query to fetch ALL categories (all pages) for an accurate total count
  const { data: allData } = useGetCategoryStatsQuery({ page: 1, limit: 9999 });

  const apiData = data?.data;
  const meta = data?.meta;

  // Count all non-deleted categories across every page
  const totalActiveCategories = (allData?.data?.categoryJobs ?? []).filter(
    (item: { status: string }) => item.status?.toUpperCase() !== "DELETED"
  ).length;

  // Build stats cards from API
  const stats: CategoryStatItem[] = [
    {
      title: "Total Categories",
      value: totalActiveCategories > 0
        ? totalActiveCategories.toString()
        : (data?.data?.totalCategories?.toString() ?? "—"),
    },
    {
      title: "Top Category",
      value: data?.data?.topCategory ?? "—",
    },
  ];

  // Map API categoryJobs to CategoryItem shape, excluding soft-deleted entries
  const categories: CategoryItem[] = (apiData?.categoryJobs ?? [])
    .filter((item: { status: string }) => item.status?.toUpperCase() !== "DELETED")
    .map(
      (item: {
        id: string;
        name?: string;
        categoryName?: string;
        icon: string;
        status: string;
        totalJobs: number;
        totalPros: number;
      }) => ({
        id: item.id,
        categoryIcon: item.icon,
        categoryName: item.categoryName ?? item.name ?? "",
        totalJobs: item.totalJobs,
        totalPros: item.totalPros,
        status: item.status,
      })
    );

  const handleAdd = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CategoryItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#f4f6f9]">
        <p className="text-slate-500 font-medium">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-serif text-[#1e293b] tracking-wide">
          Category Management
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        {/* Category Stats Grid */}
        <div className="w-full md:w-auto flex-1">
          <CategoryStats stats={stats} />
        </div>

        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#E8F3F1] hover:bg-[#d8ece8] text-[#1e6660] border border-[#1e6660]/20 h-10 px-5 rounded-[8px] font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      {/* Category List & Filters & Table */}
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        totalCount={meta?.total}
        page={page}
        totalPages={meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      <AddCategoryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={itemToEdit}
      />
    </div>
  );
};

export default CategoryModule;
