"use client";

import { Input } from "@/components/ui/input";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function PriceSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") ?? "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") ?? "");

  const updateParams = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }, 500);

  const handlePriceMinChange = (value: string) => {
    setPriceMin(value);
    updateParams("priceMin", value);
  };

  const handlePriceMaxChange = (value: string) => {
    setPriceMax(value);
    updateParams("priceMax", value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Price</p>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={priceMin}
          onChange={(e) => handlePriceMinChange(e.target.value)}
          placeholder="Min"
        />
        -
        <Input
          type="number"
          value={priceMax}
          onChange={(e) => handlePriceMaxChange(e.target.value)}
          placeholder="Max"
        />
      </div>
    </div>
  );
}
