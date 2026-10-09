import { count, desc, eq, sql } from "drizzle-orm";
import { db } from ".";
import { account, cartItems, laptops, user } from "./schema";
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

// /admin/catalog/page.tsx
export const getLaptopsForAdminPanel = async () => {
  "use cache";
  cacheTag("admin-laptops");
  cacheLife("hours");

  const rows = await db.select().from(laptops).orderBy(desc(laptops.updatedAt));

  return rows;
};

// /admin/customers/_components/customers-content.tsx
export const getCustomersForAdminPanel = async () => {
  "use cache";
  cacheTag("admin-customers");
  cacheLife("minutes");

  const rows = await db.select().from(user).orderBy(desc(user.createdAt));

  return rows;
};

// /admin/customers/_components/customers-stats.tsx
export const getTotalUsersCount = async () => {
  "use cache";
  cacheTag("total-users");
  cacheLife("minutes");

  const [result] = await db.select({ totalUsers: count() }).from(account);

  return result.totalUsers;
};

export const getTotalVerifiedUsers = async () => {
  "use cache";
  cacheTag("total-verified-users");
  cacheLife("minutes");

  const [result] = await db
    .select({ totalVerifiedUsers: count() })
    .from(user)
    .where(eq(user.emailVerified, true));

  return result.totalVerifiedUsers;
};

//temp
export const getLaptops = async () => {
  "use cache";
  cacheTag(`laptops`);
  cacheLife("days");
  const rows = await db.select().from(laptops).limit(16);

  return rows;
};
