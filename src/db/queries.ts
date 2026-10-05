import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { cartItems, laptops } from "./schema";
import { cacheLife, cacheTag } from "next/cache";
import { getCurrentSession } from "@/lib/auth-utils";

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

export const getHeroLaptops = async () => {
  "use cache";
  cacheTag(`hero-laptops`);
  cacheLife("days");
  const heroLaptops = await db.select().from(laptops).limit(3);

  return heroLaptops;
};

export const getLaptopsForAdminPanel = async () => {
  "use cache";
  cacheTag("admin-laptops");
  cacheLife("days");

  const rows = await db.select().from(laptops).orderBy(desc(laptops.updatedAt));

  return rows;
};

//temp
export const getLaptops = async () => {
  "use cache";
  cacheTag(`laptops`);
  cacheLife("days");
  const rows = await db.select().from(laptops).limit(16);

  return rows;
};
