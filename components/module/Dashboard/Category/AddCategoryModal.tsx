"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useRef, useState } from "react";
import { ImagePlus, X, CheckCircle2, Loader2 } from "lucide-react";
import { CategoryItem } from "./CategoryList";
import { toast } from "sonner";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/redux/api/dashboardApi";

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
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens / initialData changes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevInitialData, setPrevInitialData] = useState<
    CategoryItem | null | undefined
  >(initialData);

  if (initialData !== prevInitialData || isOpen !== prevIsOpen) {
    setPrevInitialData(initialData);
    setPrevIsOpen(isOpen);
    setCategoryName(initialData ? initialData.categoryName : "");
    setIconFile(null);
    setIconPreview(null);
  }

  const isEditing = !!initialData;

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const isLoading = isCreating || isUpdating;

  // ── File helpers ────────────────────────────────────────────────
  const applyFile = (file: File) => {
    setIconFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setIconPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const removeIcon = () => {
    setIconFile(null);
    setIconPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    // Build FormData — status is always ACTIVE (no user control)
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ name: categoryName.trim(), status: "ACTIVE" })
    );
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    try {
      if (isEditing && initialData) {
        await updateCategory({ id: initialData.id, formData }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created successfully");
      }
      setCategoryName("");
      setIconFile(null);
      setIconPreview(null);
      onOpenChange(false);
    } catch (err: unknown) {
      const apiError = err as {
        data?: { message?: string; error?: string };
        status?: number;
      };
      console.error("[category mutation error]", JSON.stringify(err, null, 2));
      const message =
        apiError?.data?.message ||
        apiError?.data?.error ||
        `Failed to ${isEditing ? "update" : "create"} category (status: ${apiError?.status ?? "unknown"})`;
      toast.error(message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-8 bg-white rounded-[16px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-serif text-slate-800">
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {/* Category Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Category name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Land Surveyor"
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 rounded-[8px] p-3 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400 disabled:opacity-60"
            />
          </div>

          {/* Icon Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Category Icon
            </label>

            {iconPreview ? (
              /* Preview */
              <div className="relative w-full h-32 rounded-[12px] border border-teal-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                {iconFile?.type === "image/svg+xml" ||
                iconFile?.name?.endsWith(".svg") ? (
                  <img
                    src={iconPreview}
                    alt="icon preview"
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <img
                    src={iconPreview}
                    alt="icon preview"
                    className="w-16 h-16 object-contain"
                  />
                )}
                <button
                  type="button"
                  onClick={removeIcon}
                  disabled={isLoading}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                  <span className="text-xs text-slate-500 bg-white/80 px-2 py-0.5 rounded-full truncate max-w-[80%]">
                    {iconFile?.name}
                  </span>
                </div>
              </div>
            ) : (
              /* Drop zone */
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full h-32 border-2 border-dashed rounded-[12px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                  isDragging
                    ? "border-teal-400 bg-teal-50"
                    : "border-teal-200 bg-white hover:bg-slate-50"
                }`}
              >
                <ImagePlus className="w-6 h-6 text-teal-700" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-teal-700">
                    Upload Icon
                  </span>
                  <span className="text-xs text-slate-400">
                    SVG, PNG, JPG — or drag and drop
                  </span>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.svg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#0F4A3F] hover:bg-[#0c3c33] text-white py-6 rounded-[8px] mt-2 font-medium disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditing ? "Saving..." : "Creating..."}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {isEditing ? "Save Changes" : "Add Category"}
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
