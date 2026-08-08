"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { useDeleteLocationMutation } from "@/redux/api/dashboardApi";

export interface LocationItem {
  id: string;
  country: string;
  currency: string;
  stateCount: number;
  cityCount: number;
  serviceAreaCount: number;
  status: string;
}

interface LocationListProps {
  locations: LocationItem[];
  onEdit: (item: LocationItem) => void;
  totalCount?: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LocationList = ({
  locations,
  onEdit,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: LocationListProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<LocationItem | null>(null);
  const [deleteLocation, { isLoading: isDeleting }] = useDeleteLocationMutation();

  const handleEdit = (item: LocationItem) => {
    onEdit(item);
  };

  const handleDeleteClick = (item: LocationItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteLocation(itemToDelete.id).unwrap();
      toast.success(`${itemToDelete.country} deleted successfully`);
    } catch {
      toast.error(`Failed to delete ${itemToDelete.country}.`);
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const columns: ColumnDef<LocationItem>[] = [
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <span className="text-sm text-slate-700">{row.original.country}</span>
      ),
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">{row.original.currency}</span>
      ),
    },
    {
      accessorKey: "stateCount",
      header: "State",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">{row.original.stateCount}</span>
      ),
    },
    {
      accessorKey: "cityCount",
      header: "Cities",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">{row.original.cityCount}</span>
      ),
    },
    {
      accessorKey: "serviceAreaCount",
      header: "Service areas",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.serviceAreaCount}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = status?.toUpperCase() === "ACTIVE";
        return (
          <span
            className={`text-xs font-semibold ${
              isActive ? "text-[#22C55E]" : "text-[#EF4444]"
            }`}
          >
            {isActive ? "Active" : "Deleted"}
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
      {/* Table Card */}
      <div className="bg-white p-6 rounded-[8px] shadow-sm w-full border border-slate-100">
        <NRTable columns={columns} data={locations} />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing {locations.length} of {totalCount ?? locations.length}
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {pageNumbers.map((num) => (
              <Button
                key={num}
                variant="ghost"
                onClick={() => onPageChange(num)}
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
              onClick={() => onPageChange(page + 1)}
              className="h-8 w-8 p-0 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md transition-colors cursor-pointer disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        name={itemToDelete?.country || null}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default LocationList;
