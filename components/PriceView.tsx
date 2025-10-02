import React from "react";
import PriceFormatter from "./PriceFormatter";
import { cn } from "@/lib/utils";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

export default function PriceView({ price, discount, className }: Props) {
  return (
    <div>
      <div className="flex items-center  gap-5">
        <PriceFormatter amount={price} className={className} />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={cn("line-through  font-medium text-zinc-500")}
          />
        )}
      </div>
    </div>
  );
}
