"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import usePriceSection from "../hooks/usePriceSection";

export default function PriceSection() {
  const {
    priceMin,
    priceMax,
    handlePriceMinChange,
    handlePriceMaxChange,
    isInvalid,
  } = usePriceSection();

  return (
    <div className="flex flex-col gap-2">
      <p>Price</p>
      <div className="flex items-center gap-2">
        <Input
          value={priceMin}
          onChange={(e) => handlePriceMinChange(e.target.value)}
          placeholder="Min"
          className={cn(
            isInvalid && "border-red-500 focus-visible:ring-red-500",
          )}
        />
        -
        <Input
          value={priceMax}
          onChange={(e) => handlePriceMaxChange(e.target.value)}
          placeholder="Max"
          className={cn(
            isInvalid && "border-red-500 focus-visible:ring-red-500",
          )}
        />
      </div>
    </div>
  );
}
