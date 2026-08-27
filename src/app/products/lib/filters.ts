import { brandEnum, osEnum } from "@/db/schema";
import { z } from "zod";

const csvStrings = z.preprocess(
  (v) => (typeof v === "string" ? v.split(",").filter(Boolean) : v),
  z.array(z.string().min(1).max(100)).max(20).optional(),
);

const csvNumbers = z.preprocess(
  (v) =>
    typeof v === "string"
      ? v
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n))
      : v,
  z.array(z.number().positive()).max(20).optional(),
);

const csvEnum = <T extends [string, ...string[]]>(values: T) =>
  z.preprocess(
    (v) => (typeof v === "string" ? v.split(",").filter(Boolean) : v),
    z.array(z.enum(values)).max(20).optional(),
  );

export const filtersSchema = z.object({
  processor: csvStrings,
  graphics: csvStrings,
  brand: csvEnum(brandEnum.enumValues),
  os: csvEnum(osEnum.enumValues),
  ram: csvNumbers,
  memory: csvNumbers,
  priceMin: z.coerce.number().nonnegative().optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(12),
  sort: z.enum(["price_asc", "price_desc", "newest"]).default("newest"),
});

export type ParsedFilters = z.infer<typeof filtersSchema>;

export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): ParsedFilters {
  const result = filtersSchema.safeParse(params);
  return result.success ? result.data : filtersSchema.parse({});
}
