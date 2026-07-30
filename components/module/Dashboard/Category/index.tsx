"use client";

import { useState } from "react";
import CategoryStats from "./CategoryStats";
import CategoryList from "./CategoryList";
import { mockCategoryStats, mockCategories, CategoryItem } from "./mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";

const CategoryModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CategoryItem | null>(null);

  const handleAdd = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CategoryItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-serif text-[#1e293b] tracking-wide">
          Category Management
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        {/* Category Stats Grid */}
        <div className="w-full md:w-auto flex-1">
          <CategoryStats stats={mockCategoryStats} />
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
      <CategoryList categories={mockCategories} onEdit={handleEdit} />

      <AddCategoryModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} initialData={itemToEdit} />
    </div>
  );
};

export default CategoryModule;
