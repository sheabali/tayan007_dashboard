"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AddOnItem {
  id: number;
  name: string;
  price: string;
  description: string;
}

interface PackageFormData {
  name: string;
  deliveryTime: string;
  photos: string;
  videos: string;
  equipment: string;
  droneIncluded: string;
  headshotCount: string;
  price: string;
  rushDelivery: boolean;
  addOns: AddOnItem[];
}

interface PackageFormProps {
  onPublish: (data: PackageFormData) => void;
  onCancel: () => void;
}

export default function PackageForm({ onPublish, onCancel }: PackageFormProps) {
  const [form, setForm] = useState<PackageFormData>({
    name: "",
    deliveryTime: "",
    photos: "50",
    videos: "6",
    equipment: "iPhone",
    droneIncluded: "yes",
    headshotCount: "50",
    price: "$399",
    rushDelivery: true,
    addOns: [
      { id: 1, name: "", price: "$199", description: "" },
      { id: 2, name: "", price: "$199", description: "" },
    ],
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [nextId, setNextId] = useState(3);

  const updateField = (key: keyof PackageFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddOn = (id: number, key: keyof AddOnItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.map((a) => (a.id === id ? { ...a, [key]: value } : a)),
    }));
  };

  const addAddOn = () => {
    setForm((prev) => ({
      ...prev,
      addOns: [...prev.addOns, { id: nextId, name: "", price: "$199", description: "" }],
    }));
    setNextId((n) => n + 1);
  };

  const removeAddOn = (id: number) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((a) => a.id !== id),
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    setThumbnailFile(file);
    const url = URL.createObjectURL(file);
    setThumbnailPreview(url);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast.error("Package name is required.");
      return;
    }
    onPublish(form);
    toast.success("Package published successfully!");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Add new package
        </h1>
        <div className="flex items-center gap-3 bg-white pl-2.5 pr-4 py-1.5 rounded-full border border-slate-100/80 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
            AU
          </div>
          <span className="text-xs font-bold text-slate-700">Admin User</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-5">
        {/* Package Name */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Package Name</Label>
          <Input
            placeholder="Enter your package name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="h-10 border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Thumbnail image */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Thumbnail image</Label>
          <label
            htmlFor="thumbnail-upload"
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors relative overflow-hidden"
          >
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-slate-300 mb-2" />
                <span className="text-xs text-blue-500 font-bold underline">Click to upload</span>
                <span className="text-[10px] text-slate-400 mt-0.5">or drag and drop</span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, JPEG, PNG less than 5MB</span>
              </>
            )}
            <input
              id="thumbnail-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Delivery Time */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Delivery Time</Label>
          <Input
            placeholder="Write your expected time for the package"
            value={form.deliveryTime}
            onChange={(e) => updateField("deliveryTime", e.target.value)}
            className="h-10 border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Photos + Videos side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold text-slate-700">Photos</Label>
            <Input
              placeholder="50"
              value={form.photos}
              onChange={(e) => updateField("photos", e.target.value)}
              className="h-10 border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold text-slate-700">Videos</Label>
            <Input
              placeholder="6"
              value={form.videos}
              onChange={(e) => updateField("videos", e.target.value)}
              className="h-10 border-slate-200 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Equipment */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Equipment</Label>
          <Select value={form.equipment} onValueChange={(v) => updateField("equipment", v)}>
            <SelectTrigger className="h-10 border-slate-200 rounded-lg text-sm">
              <SelectValue placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iPhone">iPhone</SelectItem>
              <SelectItem value="Canon DSLR">Canon DSLR</SelectItem>
              <SelectItem value="Sony A7">Sony A7</SelectItem>
              <SelectItem value="RED Camera">RED Camera</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Drone included */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Drone included</Label>
          <Select value={form.droneIncluded} onValueChange={(v) => updateField("droneIncluded", v)}>
            <SelectTrigger className="h-10 border-slate-200 rounded-lg text-sm">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Headshot count */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Headshot count</Label>
          <Input
            placeholder="50"
            value={form.headshotCount}
            onChange={(e) => updateField("headshotCount", e.target.value)}
            className="h-10 border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold text-slate-700">Price</Label>
          <Input
            placeholder="$399"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            className="h-10 border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Rush delivery toggle */}
        <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-slate-700">Rush delivery available</span>
            <span className="text-xs text-slate-400 font-medium">(2-5 day delivery timelines)</span>
          </div>
          {/* Native toggle switch */}
          <button
            type="button"
            role="switch"
            aria-checked={form.rushDelivery}
            onClick={() => updateField("rushDelivery", !form.rushDelivery)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              form.rushDelivery ? "bg-blue-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                form.rushDelivery ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Add-ons */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              Add on ({form.addOns.length})
            </span>
            <button
              onClick={addAddOn}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {form.addOns.map((addon) => (
            <div
              key={addon.id}
              className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col gap-3"
            >
              <button
                onClick={() => removeAddOn(addon.id)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-slate-600">Item Name</Label>
                <Input
                  placeholder="Write the name of service name"
                  value={addon.name}
                  onChange={(e) => updateAddOn(addon.id, "name", e.target.value)}
                  className="h-9 border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-slate-600">Item Price</Label>
                <Input
                  placeholder="$199"
                  value={addon.price}
                  onChange={(e) => updateAddOn(addon.id, "price", e.target.value)}
                  className="h-9 border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-slate-600">Item Description</Label>
                <textarea
                  placeholder="Describe what provides in this item"
                  value={addon.description}
                  onChange={(e) => updateAddOn(addon.id, "description", e.target.value)}
                  className="min-h-20 w-full border border-slate-200 rounded-lg text-sm resize-none p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Publish button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm mt-2 cursor-pointer"
        >
          Publish Package
        </Button>
      </div>
    </div>
  );
}
