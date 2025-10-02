import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  amount: number | undefined;
  className?: string;
}

export default function PriceFormatter({ amount, className }: Props) {
  // Corrected the formatting logic
  const formattedPrice = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0, // Allow no decimal places
    maximumFractionDigits: 2,
  }).format(amount || 0); // Added fallback for undefined amount

  return (
    <span className={cn("text-sm font-semibold text-black", className)}>
      {formattedPrice}
    </span>
  );
}
