import { eq } from "drizzle-orm";
import { db } from ".";
import { laptops } from "./schema";
import { cacheLife, cacheTag } from "next/cache";

export const getLaptopBySlug = async (slug: string) => {
  "use cache";
  cacheTag(`product-${slug}`);
  cacheLife("days");

  const [product] = await db
    .select()
    .from(laptops)
    .where(eq(laptops.slug, slug))
    .limit(1);

  return product;
};
