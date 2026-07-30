"use client";

import { use } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { mockApplicants } from "@/components/module/Dashboard/Applications/mockData";
import { Button } from "@/components/ui/button";
import ApplicationReviewDetailsView from "@/components/module/Dashboard/Applications/ApplicationReviewDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationReviewPage({ params }: PageProps) {
  const { id } = use(params);
  const applicant = mockApplicants.find((a) => a.id === id);

  if (!applicant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />
        <h2 className="text-xl font-bold text-slate-800">Application Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          The application with ID <span className="font-mono text-slate-800 font-bold">{id}</span> does not exist or has been processed.
        </p>
        <Link href="/admin/applications" className="mt-2">
          <Button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow hover:bg-slate-700 transition-colors active:scale-95 cursor-pointer">
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  return <ApplicationReviewDetailsView applicant={applicant} />;
}
