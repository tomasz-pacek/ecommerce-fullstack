"use server";

import { db } from "@/db";
import { cartItems } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addToCart = async (laptopId: string, quantity: number = 1) => {
  const session = await getCurrentSession();
  if (!session) return { success: false, error: "Unauthorized" };
  const userId = session.user.id;

  try {
    await db
      .insert(cartItems)
      .values({
        userId,
        laptopId,
        quantity,
      })
      .onConflictDoUpdate({
        target: [cartItems.userId, cartItems.laptopId],
        set: { quantity: sql`${cartItems.quantity} + ${quantity}` },
      });
    // revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error adding items to cart" };
  }
};
