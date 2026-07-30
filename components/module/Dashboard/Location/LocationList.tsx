"use client";

import { useState } from "react";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationItem } from "./mockData";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";

interface LocationListProps {
  locations: LocationItem[];
  onEdit: (item: LocationItem) => void;
}

const LocationList = ({ locations, onEdit }: LocationListProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<LocationItem | null>(null);

  const handleEdit = (item: LocationItem) => {
    onEdit(item);
  };

  const handleDeleteClick = (item: LocationItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      toast.success(`${itemToDelete.country} deleted successfully`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const columns: ColumnDef<LocationItem>[] = [
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <span className="text-sm text-slate-700">
          {row.original.country}
        </span>
      ),
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.currency}
        </span>
      ),
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.state}
        </span>
      ),
    },
    {
      accessorKey: "cities",
      header: "Cities",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.cities}
        </span>
      ),
    },
    {
      accessorKey: "serviceAreas",
      header: "Service areas",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {row.original.serviceAreas}
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
        <NRTable columns={columns} data={locations} />

        {/* Pagination element */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing 1-{locations.length} from 15
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
        name={itemToDelete?.country || null}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default LocationList;
