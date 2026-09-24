"use server";

import { db } from "@/db";
import { cartItems } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const mergeGuestCartIntoUser = async (
  guestId: string,
  userId: string,
) => {
  const guestItems = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.guestId, guestId));

  for (const item of guestItems) {
    await db
      .insert(cartItems)
      .values({
        userId,
        laptopId: item.laptopId,
        quantity: item.quantity,
      })
      .onConflictDoUpdate({
        target: [cartItems.userId, cartItems.laptopId],
        set: { quantity: sql`${cartItems.quantity} + ${item.quantity}` },
      });
  }

  await db.delete(cartItems).where(eq(cartItems.guestId, guestId));
};
