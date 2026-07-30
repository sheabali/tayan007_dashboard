"use client";

import { useState } from "react";
import LocationStats from "./LocationStats";
import LocationList from "./LocationList";
import { mockLocationStats, mockLocations, LocationItem } from "./mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCountryModal from "./AddCountryModal";

const LocationModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<LocationItem | null>(null);

  const handleAdd = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: LocationItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-serif text-[#1e293b] tracking-wide">
          Location Management
        </h1>
        {/* User profile widget */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shrink-0"></div>
          <span className="text-sm font-medium text-slate-700">Admin User</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 w-full">
        {/* Location Stats Grid */}
        <div className="flex-1 w-full xl:w-auto">
          <LocationStats stats={mockLocationStats} />
        </div>
        
        <Button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#E8F3F1] hover:bg-[#d8ece8] text-[#1e6660] border border-[#1e6660]/20 h-10 px-5 rounded-[8px] font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Country</span>
        </Button>
      </div>

      {/* Location List & Filters & Table */}
      <LocationList locations={mockLocations} onEdit={handleEdit} />

      <AddCountryModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} initialData={itemToEdit} />
    </div>
  );
};

export default LocationModule;
