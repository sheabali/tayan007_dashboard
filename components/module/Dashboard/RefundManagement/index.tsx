"use client";

import { useState } from "react";
import RefundsHeader from "./RefundsHeader";
import RefundsTable from "./RefundsTable";
import { useGetRefundsQuery } from "@/redux/api/dashboardApi";

export interface RefundItem {
  id: string;
  requestId: string;
  clientId: string;
  workerId: string;
  packageSubtotal: number;
  commission: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  client: {
    fullName: string;
    profileImage: string;
  };
  worker: {
    fullName: string;
    profileImage: string;
  };
}

export default function RefundManagement() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useGetRefundsQuery({ page, limit });

  const refunds: RefundItem[] = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, limit: 10, totalPage: 1 };

  return (
    <div className="flex flex-col gap-6 w-full max-w-full mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen rounded-3xl border border-slate-100/50 shadow-xs mb-20">
      <RefundsHeader />

      <div className="w-full">
        <RefundsTable
          refunds={refunds}
          meta={meta}
          isLoading={isLoading || isFetching}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
