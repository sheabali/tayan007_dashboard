"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { CategoryItem } from "./mockData";
import { toast } from "sonner";

interface AddCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData?: CategoryItem | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.categoryName);
    } else {
      setCategoryName("");
    }
  }, [initialData, isOpen]);

  const isEditing = !!initialData;

  const handleSubmit = () => {
    if (isEditing) {
      toast.success("Category updated successfully");
    } else {
      toast.success("Category added successfully");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-8 bg-white rounded-[16px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-serif text-slate-800">
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Category name</label>
            <input 
              type="text" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Land Surveyor" 
              className="w-full bg-slate-50 border border-slate-100 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Category Icon</label>
            <div className="w-full h-32 border-2 border-dashed border-teal-200 rounded-[12px] bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
              <ImagePlus className="w-6 h-6 text-teal-700" />
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-teal-700">Upload SVG</span>
                <span className="text-xs text-slate-400">or drag and drop</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#0F4A3F] hover:bg-[#0c3c33] text-white py-6 rounded-[8px] mt-2 font-medium"
          >
            {isEditing ? "Save Changes" : "Add Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
