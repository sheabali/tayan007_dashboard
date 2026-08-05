"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { LocationItem } from "./mockData";
import { toast } from "sonner";

interface AddCountryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData?: LocationItem | null;
}

const AddCountryModal: React.FC<AddCountryModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
}) => {
  const [country, setCountry] = useState(initialData?.country || "");
  const [currencyName, setCurrencyName] = useState(
    initialData ? (initialData.currency === "NGN" ? "Nigerian Naira" : "West African CFA franc") : ""
  );
  const [currencySymbol, setCurrencySymbol] = useState(initialData?.currency || "");

  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (initialData !== prevInitialData || isOpen !== prevIsOpen) {
    setPrevInitialData(initialData);
    setPrevIsOpen(isOpen);
    
    if (isOpen) {
      if (initialData) {
        setCountry(initialData.country);
        setCurrencySymbol(initialData.currency);
        setCurrencyName(initialData.currency === "NGN" ? "Nigerian Naira" : "West African CFA franc");
      } else {
        setCountry("");
        setCurrencyName("");
        setCurrencySymbol("");
      }
    }
  }

  const isEditing = !!initialData;

  const handleSubmit = () => {
    if (isEditing) {
      toast.success("Country updated successfully");
    } else {
      toast.success("Country added successfully");
    }
    onOpenChange(false);
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Country name</label>
            <input 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Ivory Coast" 
              className="w-full bg-slate-50 border border-slate-100 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Currency name</label>
            <input 
              type="text" 
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              placeholder="e.g. West African CFA franc" 
              className="w-full bg-slate-50 border border-slate-100 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Currency symbol</label>
            <input 
              type="text" 
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              placeholder="e.g. CFA" 
              className="w-full bg-slate-50 border border-slate-100 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#1e6660] hover:bg-[#154f49] text-white py-6 rounded-[8px] mt-2 font-medium"
          >
            {isEditing ? "Save Changes" : "Add Country"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryModal;
