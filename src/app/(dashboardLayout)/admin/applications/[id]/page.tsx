"use client";

import { use } from "react";
import ApplicationReviewDetailsView from "@/components/module/Dashboard/Applications/ApplicationReviewDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationReviewPage({ params }: PageProps) {
  const { id } = use(params);

  return <ApplicationReviewDetailsView id={id} />;
}
