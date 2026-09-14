import { db } from "@/db";
import { laptops } from "@/db/schema";
import { FACET_COLUMNS, FacetKey } from "@/types/facet-colums";
import { asc, count, desc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { buildWhere } from "./build-where";
import { ParsedFilters } from "./filters";

async function getFacetAllValues(key: FacetKey) {
  "use cache";
  cacheLife("hours");
  cacheTag(`facet-values-${key}`);

  const column = FACET_COLUMNS[key];

  return db
    .select({ value: column })
    .from(laptops)
    .groupBy(column)
    .orderBy(asc(column));
}

async function getFacetCounts(key: FacetKey, filters: ParsedFilters) {
  const column = FACET_COLUMNS[key];

  return db
    .select({ value: column, count: count() })
    .from(laptops)
    .where(buildWhere(filters, key))
    .groupBy(column)
    .orderBy(desc(count()));
}

function mergeFacet(
  allValues: { value: unknown }[],
  counts: { value: unknown; count: number }[],
) {
  const countMap = new Map(counts.map((c) => [String(c.value), c.count]));

  return allValues
    .filter((v) => v.value !== null)
    .map((v) => ({
      value: v.value,
      count: countMap.get(String(v.value)) ?? 0,
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getFacet(key: FacetKey, filters: ParsedFilters) {
  const [allValues, counts] = await Promise.all([
    getFacetAllValues(key),
    getFacetCounts(key, filters),
  ]);
  return mergeFacet(allValues, counts);
}
