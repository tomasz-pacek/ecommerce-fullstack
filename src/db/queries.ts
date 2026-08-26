import { eq } from "drizzle-orm";
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

export const getUserCartItems = async () => {
  const session = await getCurrentSession();
  if (!session) throw new Error("Unathorized");
  const userId = session.user.id;

  const items = await db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      laptopId: cartItems.laptopId,
      priceCents: laptops.priceCents,
    })
    .from(cartItems)
    .innerJoin(laptops, eq(cartItems.laptopId, laptops.id))
    .where(eq(cartItems.userId, userId));

  return items;
};
