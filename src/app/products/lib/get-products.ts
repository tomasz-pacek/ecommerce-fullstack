import { buildWhere } from "./build-where";
import { ParsedFilters } from "./filters";
import { db } from "@/db";
import { laptops } from "@/db/schema";
import { count } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { buildOrderBy } from "./build-orderBy";
import { getFacet } from "./get-facet";
import { Facets } from "@/types/facets";

export async function getProducts(filters: ParsedFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const offset = (filters.page - 1) * filters.perPage;

  const [products, totalResult, ram, graphics, processor, brand, os, memory] =
    await Promise.all([
      db
        .select()
        .from(laptops)
        .where(where)
        .limit(filters.perPage)
        .offset(offset)
        .orderBy(orderBy),

      db.select({ count: count() }).from(laptops).where(where),

      getFacet("ram", filters),
      getFacet("graphics", filters),
      getFacet("processor", filters),
      getFacet("brand", filters),
      getFacet("os", filters),
      getFacet("memory", filters),
    ]);

  const facets: Facets = { ram, graphics, processor, brand, os, memory };

  return {
    products,
    total: totalResult[0].count,
    totalPages: Math.ceil(totalResult[0].count / filters.perPage),
    facets: facets,
  };
}
