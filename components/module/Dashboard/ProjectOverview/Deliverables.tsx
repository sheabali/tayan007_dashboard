"use client";

import { useState } from "react";
import { Film, Play, Plus, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

interface Deliverable {
  id: number;
  title: string;
  type: "JPG" | "MP4";
  sizeOrStatus: string;
  url: string;
}

interface DeliverablesProps {
  deliverables: Deliverable[];
  onAddDeliverable: (deliverable: Omit<Deliverable, "id">) => void;
}

export default function Deliverables({
  deliverables,
  onAddDeliverable,
}: DeliverablesProps) {
  // Lightbox state
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Upload dialog state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"JPG" | "MP4">("JPG");
  const [newStatus, setNewStatus] = useState("Ready");
  const [newSize, setNewSize] = useState("10 MB");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter a deliverable title");
      return;
    }

    const sizeOrStatus = newType === "JPG" ? `${newSize} • ${newStatus}` : newStatus;

    onAddDeliverable({
      title: newTitle,
      type: newType,
      sizeOrStatus,
      url: newType === "JPG" ? "/images/latte_art.png" : "",
    });

    toast.success("Deliverable added successfully");
    setIsUploadOpen(false);

    // Reset form
    setNewTitle("");
    setNewType("JPG");
    setNewStatus("Ready");
    setNewSize("10 MB");
  };

  const handleCardClick = (item: Deliverable) => {
    if (item.type === "JPG" && item.url) {
      setLightboxUrl(item.url);
    } else {
      toast.info(`Opening preview for ${item.title} (${item.type})`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Deliverables & Assets
        </h2>
        <Button
          onClick={() => setIsUploadOpen(true)}
          variant="outline"
          size="sm"
          className="border-blue-100 hover:bg-blue-50 text-blue-600 font-semibold gap-1.5 rounded-lg text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Deliverable
        </Button>
      </div>

      {/* Grid of asset cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {deliverables.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="flex flex-col border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300 cursor-pointer group"
          >
            {/* Thumbnail Header Block */}
            <div className="relative h-36 w-full bg-slate-50 flex items-center justify-center overflow-hidden">
              {item.type === "JPG" && item.url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              ) : item.type === "MP4" ? (
                <div className="w-full h-full bg-[#EEF2F6] flex items-center justify-center text-blue-600 transition-colors group-hover:bg-[#E2E8F0]">
                  {/* Film icon or Play icon */}
                  {item.title.toLowerCase().includes("reels") ? (
                    <Film className="w-10 h-10 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Play className="w-10 h-10 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-[#F8FAFC] flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                </div>
              )}

              {/* Tag indicator on top right */}
              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider select-none">
                {item.type}
              </div>
            </div>

            {/* Info Footer Block */}
            <div className="p-4 flex flex-col gap-1 bg-white">
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                {item.title}
              </h3>
              <span className="text-[10px] font-medium text-slate-400">
                {item.sizeOrStatus}
              </span>
            </div>
          </div>
        ))}

        {/* Dash Upload Placeholder card */}
        <div
          onClick={() => setIsUploadOpen(true)}
          className="flex flex-col items-center justify-center h-52 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 rounded-xl transition-all duration-300 cursor-pointer group"
        >
          <div className="p-3 bg-slate-50 text-slate-400 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors duration-300">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors mt-3">
            Add New Asset
          </span>
          <span className="text-[10px] text-slate-400 mt-1">
            JPG or MP4 format
          </span>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors focus:outline-hidden"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={lightboxUrl}
              alt="Lightbox image preview"
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Add Deliverable Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-100 rounded-2xl shadow-lg p-6">
          <form onSubmit={handleUploadSubmit}>
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-bold text-slate-800">
                Add Deliverable
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Add a new photo or video file deliverable to the project checklist.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-xs font-bold text-slate-600">
                  Deliverable Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. 15 Edited Photos, 3 Reels (Vertical)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="h-10 text-xs border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-xs font-bold text-slate-600">
                    File Type
                  </Label>
                  <Select
                    value={newType}
                    onValueChange={(val: "JPG" | "MP4") => setNewType(val)}
                  >
                    <SelectTrigger className="h-10 text-xs border-slate-200 bg-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-100">
                      <SelectItem value="JPG" className="text-xs font-medium cursor-pointer">JPG (Image)</SelectItem>
                      <SelectItem value="MP4" className="text-xs font-medium cursor-pointer">MP4 (Video)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status" className="text-xs font-bold text-slate-600">
                    Status
                  </Label>
                  <Select
                    value={newStatus}
                    onValueChange={(val) => setNewStatus(val)}
                  >
                    <SelectTrigger className="h-10 text-xs border-slate-200 bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-100">
                      <SelectItem value="Ready" className="text-xs font-medium cursor-pointer">Ready</SelectItem>
                      <SelectItem value="In Review" className="text-xs font-medium cursor-pointer">In Review</SelectItem>
                      <SelectItem value="Pending Upload" className="text-xs font-medium cursor-pointer">Pending Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newType === "JPG" && (
                <div className="grid gap-2">
                  <Label htmlFor="size" className="text-xs font-bold text-slate-600">
                    File Size
                  </Label>
                  <Input
                    id="size"
                    placeholder="e.g. 24.5 MB"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="h-10 text-xs border-slate-200"
                  />
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-500 hover:bg-slate-50 border-slate-200 font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Deliverable
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
