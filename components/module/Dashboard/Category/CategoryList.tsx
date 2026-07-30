"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit3, ChevronLeft, ChevronRight, HardHat, Pickaxe, Drill, Ruler, Cable, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryItem } from "./mockData";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";

interface CategoryListProps {
  categories: CategoryItem[];
  onEdit: (item: CategoryItem) => void;
}

// Simple icon mapper based on mock data names
const getIcon = (name: string) => {
  const iconProps = { className: "w-5 h-5 text-[#C0962B]" };
  switch (name.toLowerCase()) {
    case "architect": return <Ruler {...iconProps} />;
    case "builder": return <HardHat {...iconProps} />;
    case "contractor": return <Building2 {...iconProps} />;
    case "plumber": return <Pickaxe {...iconProps} />;
    case "electrician": return <Cable {...iconProps} />;
    case "civil engineer": return <HardHat {...iconProps} />;
    case "land surveyor": return <Drill {...iconProps} />;
    default: return <Ruler {...iconProps} />;
  }
};

const CategoryList = ({ categories, onEdit }: CategoryListProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CategoryItem | null>(null);

  const handleEdit = (item: CategoryItem) => {
    onEdit(item);
  };

  const handleDeleteClick = (item: CategoryItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      toast.success(`${itemToDelete.categoryName} deleted successfully`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const columns: ColumnDef<CategoryItem>[] = [
    {
      accessorKey: "categoryIcon",
      header: "Category Icon",
      cell: ({ row }) => (
        <div className="w-10 h-10 flex items-center justify-center bg-[#FDFBF4] border border-[#F4E3B7] rounded-[8px]">
          {getIcon(row.original.categoryName)}
        </div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "Category Name",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-slate-700">
          {row.original.categoryName}
        </span>
      ),
    },
    {
      accessorKey: "totalJobs",
      header: "Total Jobs",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.totalJobs}
        </span>
      ),
    },
    {
      accessorKey: "totalPros",
      header: "Total Pros",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.totalPros}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const colorClass =
          status === "Active"
            ? "text-[#22C55E]"
            : "text-[#EF4444]";
        return (
          <span className={`text-xs font-semibold ${colorClass}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => handleEdit(item)}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer h-8 w-8"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleDeleteClick(item)}
              className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer h-8 w-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Table Card */}
      <div className="bg-white p-6 rounded-[8px] shadow-sm w-full border border-slate-100">
        <NRTable columns={columns} data={categories} />

        {/* Pagination element */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing 1-{categories.length} from 15
          </span>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium bg-[#C0962B] text-white rounded-md shadow-sm hover:bg-[#b08825]">
              1
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
              2
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
              3
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        name={itemToDelete?.categoryName || null}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CategoryList;
