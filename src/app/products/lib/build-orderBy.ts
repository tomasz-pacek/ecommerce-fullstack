import { asc, desc, SQL } from "drizzle-orm";
import { ParsedFilters } from "./filters";
import { laptops } from "@/db/schema";

export function buildOrderBy(filters: ParsedFilters): SQL {
  switch (filters.sort) {
    case "price_asc":
      return asc(laptops.priceCents);
    case "price_desc":
      return desc(laptops.priceCents);
    case "newest":
      return desc(laptops.createdAt);
    default:
      return desc(laptops.createdAt);
  }
}
