"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  Trash2, Edit3, ChevronLeft, ChevronRight,
  HardHat, Pickaxe, Drill, Ruler, Cable, Building2,
  Wrench, Paintbrush, Scale, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";

export interface CategoryItem {
  id: string;
  categoryIcon?: string;
  categoryName: string;
  totalJobs: number;
  totalPros: number;
  status: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onEdit: (item: CategoryItem) => void;
  totalCount?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

// Icon mapper based on category name keywords
const getIcon = (name: string) => {
  const iconProps = { className: "w-5 h-5 text-[#C0962B]" };
  const lower = name.toLowerCase();
  if (lower.includes("plumb"))                                                        return <Pickaxe {...iconProps} />;
  if (lower.includes("electric"))                                                     return <Cable {...iconProps} />;
  if (lower.includes("architect"))                                                    return <Ruler {...iconProps} />;
  if (lower.includes("builder") || lower.includes("civil") || lower.includes("construction")) return <HardHat {...iconProps} />;
  if (lower.includes("contractor"))                                                   return <Building2 {...iconProps} />;
  if (lower.includes("survey"))                                                       return <Drill {...iconProps} />;
  if (lower.includes("carpenter") || lower.includes("tiler") || lower.includes("roofer")) return <Wrench {...iconProps} />;
  if (lower.includes("paint") || lower.includes("interior") || lower.includes("design")) return <Paintbrush {...iconProps} />;
  if (lower.includes("legal") || lower.includes("estate") || lower.includes("property")) return <Scale {...iconProps} />;
  if (lower.includes("project") || lower.includes("manager"))                        return <Layers {...iconProps} />;
  return <Ruler {...iconProps} />;
};

const CategoryList = ({
  categories,
  onEdit,
  totalCount,
  page = 1,
  totalPages = 1,
  onPageChange,
}: CategoryListProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CategoryItem | null>(null);

  const handleEdit = (item: CategoryItem) => onEdit(item);

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
        <span className="text-sm text-slate-600">{row.original.totalJobs}</span>
      ),
    },
    {
      accessorKey: "totalPros",
      header: "Total Pros",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">{row.original.totalPros}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = status?.toUpperCase() === "ACTIVE";
        return (
          <span className={`text-xs font-semibold ${isActive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
            {isActive ? "Active" : status}
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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white p-6 rounded-[8px] shadow-sm w-full border border-slate-100">
        <NRTable columns={columns} data={categories} />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing {categories.length} of {totalCount ?? categories.length}
          </span>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                disabled={page <= 1}
                onClick={() => onPageChange?.(page - 1)}
                className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {pageNumbers.map((num) => (
                <Button
                  key={num}
                  variant="ghost"
                  onClick={() => onPageChange?.(num)}
                  className={`w-8 h-8 p-0 flex items-center justify-center text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    num === page
                      ? "bg-[#C0962B] text-white shadow-sm hover:bg-[#b08825]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {num}
                </Button>
              ))}

              <Button
                variant="ghost"
                disabled={page >= totalPages}
                onClick={() => onPageChange?.(page + 1)}
                className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
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
