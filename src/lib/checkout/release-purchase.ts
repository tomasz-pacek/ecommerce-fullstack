import { db } from "@/db";
import { laptops, purchaseItems, purchases } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function releasePurchase(
  purchaseId: string,
  status: "expired" | "failed",
) {
  const slugs = await db.transaction(async (tx) => {
    const [claimed] = await tx
      .update(purchases)
      .set({ status })
      .where(and(eq(purchases.id, purchaseId), eq(purchases.status, "pending")))
      .returning({ id: purchases.id });

    if (!claimed) return [];

    const items = await tx
      .select()
      .from(purchaseItems)
      .where(eq(purchaseItems.purchaseId, purchaseId));

    const result: string[] = [];

    for (const item of items) {
      const [l] = await tx
        .update(laptops)
        .set({ quantity: sql`${laptops.quantity}+ ${item.quantity}` })
        .where(eq(laptops.id, item.laptopId))
        .returning({ slug: laptops.slug });
      if (l) result.push(l.slug);
    }
    return result;
  });
  for (const slug of slugs) revalidateTag(`product-${slug}`, { expire: 0 });
}
