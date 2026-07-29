"use client";

interface PaymentMetricsProps {
  grossVolume: number;
  pendingPayouts: number;
  marketplaceRevenue: number;
}

export default function PaymentMetrics({
  grossVolume,
  pendingPayouts,
  marketplaceRevenue,
}: PaymentMetricsProps) {
  const formatCurrency = (val: number) => {
    return `CFA ${val.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Total Gross Volume */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-center h-[120px] hover:shadow-md transition-all duration-300">
        <span className="text-[14px] font-medium text-slate-500 mb-1">
          Total Gross Volume
        </span>
        <span className="text-[28px] font-semibold text-[#1f2937] tracking-tight">
          {formatCurrency(grossVolume)}
        </span>
      </div>

      {/* Pending Payouts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-center h-[120px] hover:shadow-md transition-all duration-300">
        <span className="text-[14px] font-medium text-slate-500 mb-1">
          Pending Payouts
        </span>
        <span className="text-[28px] font-semibold text-[#1f2937] tracking-tight">
          {formatCurrency(pendingPayouts)}
        </span>
      </div>

      {/* Marketplace Revenue */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-center h-[120px] hover:shadow-md transition-all duration-300">
        <span className="text-[14px] font-medium text-slate-500 mb-1">
          Marketplace Revenue
        </span>
        <span className="text-[28px] font-semibold text-[#1f2937] tracking-tight">
          {formatCurrency(marketplaceRevenue)}
        </span>
      </div>
    </div>
  );
}
