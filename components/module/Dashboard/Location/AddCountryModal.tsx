"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { LocationItem } from "./LocationList";
import { toast } from "sonner";
import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
} from "@/redux/api/dashboardApi";

interface AddCountryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData?: LocationItem | null;
}

const inputClass =
  "w-full bg-slate-50 border border-slate-100 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400";

const AddCountryModal: React.FC<AddCountryModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
}) => {
  const [country, setCountry] = useState(initialData?.country || "");
  const [currency, setCurrency] = useState(initialData?.currency || "");
  const [stateCount, setStateCount] = useState(
    initialData?.stateCount?.toString() || ""
  );
  const [cityCount, setCityCount] = useState(
    initialData?.cityCount?.toString() || ""
  );
  const [serviceAreaCount, setServiceAreaCount] = useState(
    initialData?.serviceAreaCount?.toString() || ""
  );

  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (initialData !== prevInitialData || isOpen !== prevIsOpen) {
    setPrevInitialData(initialData);
    setPrevIsOpen(isOpen);

    if (isOpen) {
      if (initialData) {
        setCountry(initialData.country);
        setCurrency(initialData.currency);
        setStateCount(initialData.stateCount?.toString() || "");
        setCityCount(initialData.cityCount?.toString() || "");
        setServiceAreaCount(initialData.serviceAreaCount?.toString() || "");
      } else {
        setCountry("");
        setCurrency("");
        setStateCount("");
        setCityCount("");
        setServiceAreaCount("");
      }
    }
  }

  const isEditing = !!initialData;

  const [createLocation, { isLoading: isCreating }] = useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] = useUpdateLocationMutation();
  const isLoading = isCreating || isUpdating;

  const handleSubmit = async () => {
    if (!country.trim() || !currency.trim()) {
      toast.error("Country name and currency code are required.");
      return;
    }

    const payload = {
      country: country.trim(),
      currency: currency.trim(),
      stateCount: Number(stateCount) || 0,
      cityCount: Number(cityCount) || 0,
      serviceAreaCount: Number(serviceAreaCount) || 0,
      status: initialData?.status || "ACTIVE",
    };

    try {
      if (isEditing && initialData) {
        await updateLocation({ id: initialData.id, ...payload }).unwrap();
        toast.success("Country updated successfully");
      } else {
        await createLocation(payload).unwrap();
        toast.success("Country added successfully");
      }
      onOpenChange(false);
    } catch {
      toast.error(isEditing ? "Failed to update country." : "Failed to add country.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-8 bg-white rounded-[16px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-serif text-slate-800">
            {isEditing ? "Edit Country" : "Add New Country"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Country name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Country name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. South Africa"
              className={inputClass}
            />
          </div>

          {/* Currency code */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Currency code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="e.g. ZAR"
              className={inputClass}
            />
          </div>

          {/* State / City / Service area counts in a row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">
                State count
              </label>
              <input
                type="number"
                min={0}
                value={stateCount}
                onChange={(e) => setStateCount(e.target.value)}
                placeholder="9"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">
                City count
              </label>
              <input
                type="number"
                min={0}
                value={cityCount}
                onChange={(e) => setCityCount(e.target.value)}
                placeholder="25"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">
                Service areas
              </label>
              <input
                type="number"
                min={0}
                value={serviceAreaCount}
                onChange={(e) => setServiceAreaCount(e.target.value)}
                placeholder="50"
                className={inputClass}
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#1e6660] hover:bg-[#154f49] text-white py-6 rounded-[8px] mt-2 font-medium disabled:opacity-60"
          >
            {isLoading
              ? isEditing
                ? "Saving..."
                : "Adding..."
              : isEditing
              ? "Save Changes"
              : "Add Country"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryModal;
