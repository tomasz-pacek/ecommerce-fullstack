import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const sanitizePrice = (value: string) => value.replace(/[^0-9]/g, "");

const usePriceSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceMin, setPriceMin] = useState(
    sanitizePrice(searchParams.get("priceMin") ?? ""),
  );
  const [priceMax, setPriceMax] = useState(
    sanitizePrice(searchParams.get("priceMax") ?? ""),
  );

  const isInvalid =
    priceMin !== "" && priceMax !== "" && Number(priceMin) > Number(priceMax);

  const updateParams = useDebouncedCallback((min: string, max: string) => {
    if (min !== "" && max !== "" && Number(min) > Number(max)) return;
    const params = new URLSearchParams(searchParams.toString());

    if (min) {
      params.set("priceMin", min);
    } else {
      params.delete("priceMin");
    }

    if (max) {
      params.set("priceMax", max);
    } else {
      params.delete("priceMax");
    }

    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }, 500);

  const handlePriceMinChange = (value: string) => {
    const clean = sanitizePrice(value);
    setPriceMin(clean);
    updateParams(clean, priceMax);
  };

  const handlePriceMaxChange = (value: string) => {
    const clean = sanitizePrice(value);
    setPriceMax(clean);
    updateParams(priceMin, clean);
  };

  return {
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    handlePriceMinChange,
    isInvalid,
    handlePriceMaxChange,
  };
};

export default usePriceSection;
