import { BrandType } from "@/db/schema";

type FacetCount = {
  value: string | null;
  count: number;
};

export type Facets = {
  brand: { value: BrandType; count: number }[];
  processor: FacetCount[];
  graphics: FacetCount[];
  ram: { value: number; count: number }[];
  memory: { value: number; count: number }[];
};
