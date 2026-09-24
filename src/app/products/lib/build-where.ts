import { and, gte, inArray, lte, SQL } from "drizzle-orm";
import { ParsedFilters } from "./filters";
import { laptops } from "@/db/schema";
import { priceToCents } from "@/lib/utils/price-to-cents";

export function buildWhere(
  filters: ParsedFilters,
  excludeKey?: keyof ParsedFilters,
): SQL | undefined {
  const conditions: SQL[] = [];

  if (filters.processor?.length && excludeKey !== "processor") {
    conditions.push(inArray(laptops.cpuModel, filters.processor));
  }
  if (filters.ram?.length && excludeKey !== "ram") {
    conditions.push(inArray(laptops.ramGb, filters.ram));
  }
  if (filters.memory?.length && excludeKey !== "memory") {
    conditions.push(inArray(laptops.storageGb, filters.memory));
  }
  if (filters.graphics?.length && excludeKey !== "graphics") {
    conditions.push(inArray(laptops.gpuModel, filters.graphics));
  }
  if (filters.brand?.length && excludeKey !== "brand") {
    conditions.push(inArray(laptops.brand, filters.brand));
  }
  if (filters.os?.length && excludeKey !== "os") {
    conditions.push(inArray(laptops.os, filters.os));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(laptops.priceCents, priceToCents(filters.priceMin)));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(laptops.priceCents, priceToCents(filters.priceMax)));
  }

  return conditions.length ? and(...conditions) : undefined;
}
