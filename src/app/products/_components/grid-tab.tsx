import { Card, CardContent } from "@/components/ui/card";
import SelectSort from "./select-sort";
import FiltersMobile from "./filters-mobile";
import { Facets } from "@/types/facets";
import { ParsedFilters } from "../lib/filters";

type Props = {
  total: number;
  facets: Facets;
  filters: ParsedFilters;
};

export default function GridTab({ total, facets, filters }: Props) {
  return (
    <Card className="p-2 text-sm">
      <CardContent className="flex flex-row items-center justify-between px-4">
        <div>
          <p>Products ({total}) </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-2 sm:justify-end">
          <div className="block lg:hidden">
            <FiltersMobile facets={facets} activeFilters={filters} />
          </div>

          <SelectSort />
        </div>
      </CardContent>
    </Card>
  );
}
