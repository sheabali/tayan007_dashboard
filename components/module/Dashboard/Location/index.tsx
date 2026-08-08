"use client";

import { useState } from "react";
import LocationStats, { LocationStatItem } from "./LocationStats";
import LocationList, { LocationItem } from "./LocationList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCountryModal from "./AddCountryModal";
import { useGetLocationsQuery } from "@/redux/api/dashboardApi";

const LocationModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<LocationItem | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetLocationsQuery({ page, limit: 10 });

  const overview = data?.data?.overview;
  const meta = data?.meta;

  // Build stats cards from the API overview object
  const stats: LocationStatItem[] = [
    { title: "Total countries", value: overview?.totalCountries?.toString() ?? "—" },
    { title: "Total states", value: overview?.totalStates?.toString() ?? "—" },
    { title: "Total cities", value: overview?.totalCities?.toString() ?? "—" },
    { title: "Total service areas", value: overview?.totalServiceAreas?.toString() ?? "—" },
  ];

  // Map API locations to LocationItem shape
  const locations: LocationItem[] = (data?.data?.locations ?? []).map(
    (item: {
      id: string;
      country: string;
      currency: string;
      stateCount: number;
      cityCount: number;
      serviceAreaCount: number;
      status: string;
    }) => ({
      id: item.id,
      country: item.country,
      currency: item.currency,
      stateCount: item.stateCount,
      cityCount: item.cityCount,
      serviceAreaCount: item.serviceAreaCount,
      status: item.status,
    })
  );

  const handleAdd = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: LocationItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#f4f6f9]">
        <p className="text-slate-500 font-medium">Loading locations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-[#f4f6f9] min-h-screen">
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
          <LocationStats stats={stats} />
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
      <LocationList
        locations={locations}
        onEdit={handleEdit}
        totalCount={meta?.total}
        page={page}
        totalPages={meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      <AddCountryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={itemToEdit}
      />
    </div>
  );
};

export default LocationModule;
