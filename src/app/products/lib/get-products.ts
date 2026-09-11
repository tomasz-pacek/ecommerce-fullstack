import { buildWhere } from "./build-where";
import { ParsedFilters } from "./filters";
import { db } from "@/db";
import { laptops } from "@/db/schema";
import { asc, count } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { buildOrderBy } from "./build-orderBy";

export async function getProducts(filters: ParsedFilters) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters);
  const offset = (filters.page - 1) * filters.perPage;

  const [
    products,
    totalResult,
    ramFacets,
    graphicsFacets,
    processorFacets,
    brandFacets,
    osFacets,
    memoryFacets,
  ] = await Promise.all([
    db
      .select()
      .from(laptops)
      .where(where)
      .limit(filters.perPage)
      .offset(offset)
      .orderBy(orderBy),

    db.select({ count: count() }).from(laptops).where(where),

    db
      .select({ value: laptops.ramGb, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "ram"))
      .groupBy(laptops.ramGb)
      .orderBy(asc(laptops.ramGb)),

    db
      .select({ value: laptops.gpuModel, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "graphics"))
      .groupBy(laptops.gpuModel)
      .orderBy(asc(laptops.gpuModel)),

    db
      .select({ value: laptops.cpuModel, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "processor"))
      .groupBy(laptops.cpuModel)
      .orderBy(asc(laptops.cpuModel)),

    db
      .select({ value: laptops.brand, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "brand"))
      .groupBy(laptops.brand)
      .orderBy(asc(laptops.brand)),

    db
      .select({ value: laptops.os, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "os"))
      .groupBy(laptops.os)
      .orderBy(asc(laptops.os)),

    db
      .select({ value: laptops.storageGb, count: count() })
      .from(laptops)
      .where(buildWhere(filters, "memory"))
      .groupBy(laptops.storageGb)
      .orderBy(asc(laptops.storageGb)),
  ]);

  return {
    products,
    total: totalResult[0].count,
    totalPages: Math.ceil(totalResult[0].count / filters.perPage),
    facets: {
      ram: ramFacets,
      graphics: graphicsFacets,
      processor: processorFacets,
      brand: brandFacets,
      os: osFacets,
      memory: memoryFacets,
    },
  };
}
