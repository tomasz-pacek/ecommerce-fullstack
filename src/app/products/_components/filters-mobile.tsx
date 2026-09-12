"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Facets } from "@/types/facets";
import { ParsedFilters } from "../lib/filters";
import FiltersContent from "./filters-content";
import { useRouter } from "next/navigation";

type Props = {
  facets: Facets;
  activeFilters: ParsedFilters;
};

export default function FiltersMobile({ facets, activeFilters }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <p className="xs:block hidden">Filters</p>
          </Button>
        }
      />
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="p-3">
          {/* todo: add filter count next to filters title*/}
          <DrawerTitle className="flex items-center justify-between text-lg">
            Filters
            <Button onClick={() => router.push("/products")} variant="ghost">
              Clear all
            </Button>
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          <FiltersContent facets={facets} activeFilters={activeFilters} />
        </div>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Show results</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
