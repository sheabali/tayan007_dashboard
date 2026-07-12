"use client";

import { useState } from "react";
import PackagesList from "./PackagesList";
import PackageForm from "./PackageForm";
import PackageDetails, { PackageData } from "./PackageDetails";
import { toast } from "sonner";

type View = "list" | "form" | "detail";

const initialPackages: PackageData[] = [
  {
    id: 1,
    name: "Custom Agency Consultation",
    status: "Active",
    activeSubscriptions: 118,
    totalRevenue: 11375,
    basePrice: 4500,
    description:
      "Premium content for large corporations including high-end video production and strategy.",
    videos: 10,
    photography: 12,
    equipment: "iPhone only",
    droneIncluded: true,
    rushDelivery: true,
    needsApproval: false,
    purchases: [
      { id: "p1", client: "Nexus Dynamics", purchaseDate: "Oct 24, 2023", status: "Completed" },
      { id: "p2", client: "OmniCorp Global", purchaseDate: "Oct 18, 2023", status: "Completed" },
      { id: "p3", client: "Vanguard Systems", purchaseDate: "Oct 12, 2023", status: "Pending" },
      { id: "p4", client: "Skyline Media", purchaseDate: "Oct 05, 2023", status: "Completed" },
      { id: "p5", client: "Elevate Fintech", purchaseDate: "Sep 28, 2023", status: "Completed" },
    ],
  },
  {
    id: 2,
    name: "Starter Brand Shoot",
    status: "Active",
    activeSubscriptions: 42,
    totalRevenue: 5040,
    basePrice: 399,
    description: "Essential brand photography package with lifestyle and product shots for emerging brands.",
    videos: 2,
    photography: 30,
    equipment: "Canon DSLR",
    droneIncluded: false,
    rushDelivery: false,
    needsApproval: false,
    purchases: [
      { id: "p6", client: "Bloom Studio", purchaseDate: "Oct 20, 2023", status: "Completed" },
      { id: "p7", client: "Peak Founders", purchaseDate: "Oct 14, 2023", status: "Completed" },
    ],
  },
  {
    id: 3,
    name: "Creator Growth Bundle",
    status: "Pending",
    activeSubscriptions: 0,
    totalRevenue: 0,
    basePrice: 1200,
    description:
      "Full-service content creation including video reels, photography, and social strategy for creators.",
    videos: 6,
    photography: 50,
    equipment: "Sony A7",
    droneIncluded: true,
    rushDelivery: true,
    needsApproval: true,
    purchases: [],
  },
];

export default function PackagesPage() {
  const [view, setView] = useState<View>("list");
  const [packages, setPackages] = useState<PackageData[]>(initialPackages);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [nextId, setNextId] = useState(4);

  const handleViewPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setView("detail");
  };

  const handleDeletePackage = (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    if (selectedPackage?.id === id) {
      setView("list");
      setSelectedPackage(null);
    }
  };

  const handlePublish = (formData: any) => {
    const newPkg: PackageData = {
      id: nextId,
      name: formData.name || "New Package",
      status: "Pending",
      activeSubscriptions: 0,
      totalRevenue: 0,
      basePrice: parseFloat(formData.price?.replace(/[^0-9.]/g, "") || "0"),
      description: formData.deliveryTime
        ? `Delivery in ${formData.deliveryTime}. Photos: ${formData.photos}. Videos: ${formData.videos}.`
        : "New package configuration.",
      videos: parseInt(formData.videos || "0"),
      photography: parseInt(formData.photos || "0"),
      equipment: formData.equipment || "iPhone",
      droneIncluded: formData.droneIncluded === "yes",
      rushDelivery: formData.rushDelivery,
      needsApproval: false,
      purchases: [],
    };
    setPackages((prev) => [newPkg, ...prev]);
    setNextId((n) => n + 1);
    setView("list");
    toast.success("Package published successfully!");
  };

  const handleEditPackage = (pkg: PackageData) => {
    toast.info(`Editing package: ${pkg.name}`);
  };

  const handleApprove = (id: number) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Active", needsApproval: false } : p
      )
    );
    setSelectedPackage((prev) =>
      prev?.id === id ? { ...prev, status: "Active", needsApproval: false } : prev
    );
  };

  const handleReject = (id: number) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Inactive", needsApproval: false } : p
      )
    );
    setView("list");
    setSelectedPackage(null);
  };

  return (
    <>
      {view === "list" && (
        <PackagesList
          packages={packages}
          onViewPackage={handleViewPackage}
          onDeletePackage={handleDeletePackage}
          onAddPackage={() => setView("form")}
        />
      )}

      {view === "form" && (
        <PackageForm
          onPublish={handlePublish}
          onCancel={() => setView("list")}
        />
      )}

      {view === "detail" && selectedPackage && (
        <PackageDetails
          pkg={selectedPackage}
          onBack={() => {
            setView("list");
            setSelectedPackage(null);
          }}
          onEditPackage={handleEditPackage}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </>
  );
}