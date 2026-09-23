"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facets } from "@/types/facets";
import { ParsedFilters } from "../lib/filters";
import { useRouter } from "next/navigation";

import FiltersContent from "./filters-content";

type Props = {
  facets: Facets;
  activeFilters: ParsedFilters;
};

export default function Filters({ facets, activeFilters }: Props) {
  const router = useRouter();

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">Filters</CardTitle>
        <Button onClick={() => router.push("/products")} variant="ghost">
          Clear all
        </Button>
      </CardHeader>
      <CardContent>
        <FiltersContent facets={facets} activeFilters={activeFilters} />
      </CardContent>
    </Card>
  );
}
