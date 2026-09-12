import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facets } from "@/types/facets";
import { ParsedFilters } from "../lib/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import PriceSection from "./price-section";

type FacetConfig = {
  key: keyof Facets;
  label: string;
  format?: (value: string | number) => string;
};

const FACET_CONFIG: FacetConfig[] = [
  { key: "brand", label: "Brand " },
  { key: "processor", label: "Processor " },
  { key: "graphics", label: "Graphics" },
  { key: "ram", label: "RAM ", format: (v) => `${v} GB` },
  { key: "memory", label: "Storage", format: (v) => `${v} GB` },
];

type Props = {
  facets: Facets;
  activeFilters: ParsedFilters;
};

export default function FiltersContent({ facets, activeFilters }: Props) {
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
      params.set("page", "1");
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}` as Route);
  }

  return (
    <div>
      <PriceSection />

      <Accordion multiple>
        {FACET_CONFIG.map(({ key, label, format }) => {
          const options = facets[key];
          if (!options?.length) return null;

          return (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="text-base">{label}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {options.map(({ value, count }) => {
                  const stringValue = String(value);
                  const displayValue = format
                    ? format(stringValue)
                    : stringValue;
                  const filterValue = activeFilters[key];
                  const checked = Array.isArray(filterValue)
                    ? filterValue.some((x) => String(x) === stringValue)
                    : false;

                  return (
                    <Label
                      key={displayValue}
                      className="flex cursor-pointer items-center gap-2 font-normal"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleFilter(key, stringValue)}
                      />
                      {displayValue} ({count})
                    </Label>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
