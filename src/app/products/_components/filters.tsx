"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facets } from "@/types/facets";
import { ParsedFilters } from "../lib/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Route } from "next";

type FacetConfig = {
  key: keyof Facets;
  label: string;
};

const FACET_CONFIG: FacetConfig[] = [
  { key: "brand", label: "Brand " },
  { key: "processor", label: "Processor " },
  { key: "graphics", label: "Graphics" },
  { key: "ram", label: "RAM " },
];

type Props = {
  facets: Facets;
  activeFilters: ParsedFilters;
};

export default function Filters({ facets, activeFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const current = params.get(key)?.split(",").filter(Boolean) ?? [];

    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (next.length > 0) {
      params.set(key, next.join(","));
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">Filters</CardTitle>
        <Button onClick={() => router.push("/products")} variant="ghost">
          Clear all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Accordion>
            {FACET_CONFIG.map(({ key, label }) => {
              const options = facets[key];
              if (!options?.length) return null;

              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{label}</AccordionTrigger>
                  <AccordionContent className="flex flex-col">
                    {options.map(({ value, count }) => {
                      const stringValue = String(value);
                      const filterValue = activeFilters[key];
                      const checked = Array.isArray(filterValue)
                        ? filterValue.some((x) => x === value)
                        : false;

                      return (
                        <label key={value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFilter(key, stringValue)}
                          />
                          {value} ({count})
                        </label>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
