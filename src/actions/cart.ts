"use server";

import {
  getCartIdentity,
  getOrCreateCartIdentity,
} from "@/app/cart/lib/cart-identity";
import { db } from "@/db";
import { cartItems, laptops } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const identityWhere = (userId: string | null, guestId: string | null) => {
  return userId
    ? eq(cartItems.userId, userId)
    : eq(cartItems.guestId, guestId!);
};

export const addToCart = async (laptopId: string, quantity: number = 1) => {
  const { userId, guestId } = await getOrCreateCartIdentity();

  try {
    await db
      .insert(cartItems)
      .values({ userId, guestId, laptopId, quantity })
      .onConflictDoUpdate({
        target: userId
          ? [cartItems.userId, cartItems.laptopId]
          : [cartItems.guestId, cartItems.laptopId],
        set: { quantity: sql`${cartItems.quantity} + ${quantity}` },
      });
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};

export const updateCartItemQuantity = async (
  laptopId: string,
  quantity: number,
) => {
  try {
    const { userId, guestId } = await getCartIdentity();

    if (quantity < 1) {
      await db
        .delete(cartItems)
        .where(
          and(identityWhere(userId, guestId), eq(cartItems.laptopId, laptopId)),
        );
    } else {
      await db
        .update(cartItems)
        .set({ quantity })
        .where(
          and(identityWhere(userId, guestId), eq(cartItems.laptopId, laptopId)),
        );
    }
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("update quantity error", error);
    return { success: false, error: "Something went wrong" };
  }
};

export const removeFromCart = async (laptopId: string) => {
  const { userId, guestId } = await getCartIdentity();

  await db
    .delete(cartItems)
    .where(
      and(identityWhere(userId, guestId), eq(cartItems.laptopId, laptopId)),
    );

  revalidatePath("/cart");
};

export const getCart = async () => {
  const { userId, guestId } = await getCartIdentity();

  if (!userId && !guestId) return [];

  return db
    .select()
    .from(cartItems)
    .innerJoin(laptops, eq(cartItems.laptopId, laptops.id))
    .where(identityWhere(userId, guestId))
    .orderBy(cartItems.createdAt);
};
