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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Total Gross Volume */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-[130px] hover:shadow-md transition-all duration-300">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Total Gross Volume
        </span>
        <span className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {formatCurrency(grossVolume)}
        </span>
      </div>

      {/* Pending Payouts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-[130px] hover:shadow-md transition-all duration-300">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Pending Payouts
        </span>
        <span className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {formatCurrency(pendingPayouts)}
        </span>
      </div>

      {/* Marketplace Revenue */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between h-[130px] hover:shadow-md transition-all duration-300">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Marketplace Revenue
        </span>
        <span className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {formatCurrency(marketplaceRevenue)}
        </span>
      </div>
    </div>
  );
}
