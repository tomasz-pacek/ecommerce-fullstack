import { laptops } from "@/db/schema";

export const FACET_COLUMNS = {
  ram: laptops.ramGb,
  graphics: laptops.gpuModel,
  processor: laptops.cpuModel,
  brand: laptops.brand,
  os: laptops.os,
  memory: laptops.storageGb,
};

export type FacetKey = keyof typeof FACET_COLUMNS;
