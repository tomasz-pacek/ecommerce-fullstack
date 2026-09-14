import { buildWhere } from "./build-where";
import { ParsedFilters } from "./filters";
import { db } from "@/db";
import { laptops } from "@/db/schema";
import { count } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { buildOrderBy } from "./build-orderBy";
import { FacetKey } from "@/types/facet-colums";
import { getFacet } from "./get-facet";

const facetKeys: FacetKey[] = [
  "ram",
  "graphics",
  "processor",
  "brand",
  "os",
  "memory",
];

export async function getProducts(filters: ParsedFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const offset = (filters.page - 1) * filters.perPage;

  const [products, totalResult, ...facetResults] = await Promise.all([
    db
      .select()
      .from(laptops)
      .where(where)
      .limit(filters.perPage)
      .offset(offset)
      .orderBy(orderBy),

    db.select({ count: count() }).from(laptops).where(where),

    ...facetKeys.map((key) => getFacet(key, filters)),
  ]);

  const facets = Object.fromEntries(
    facetKeys.map((key, i) => [key, facetResults[i]]),
  );

  return {
    products,
    total: totalResult[0].count,
    totalPages: Math.ceil(totalResult[0].count / filters.perPage),
    facets: facets,
  };
}
