"use server";
import { db } from "@/db";
import {
  cartItems,
  laptops,
  purchaseItems,
  purchases,
  user,
} from "@/db/schema";
import { requireAuth } from "@/lib/auth-session";
import { releasePurchase } from "@/lib/checkout/release-purchase";
import { stripe } from "@/lib/stripe";
import { and, eq, gte, sql } from "drizzle-orm";
import { Route } from "next";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

async function getOrCreateStripeCustomers(userId: string, email: string) {
  const [db_user] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (db_user.stripeCustomerId) return db_user.stripeCustomerId;

  const customer = await stripe.customers.create(
    { email },
    { idempotencyKey: `customer-${userId}` },
  );

  await db
    .update(user)
    .set({ stripeCustomerId: customer.id })
    .where(eq(user.id, userId));

  return customer.id;
}

export async function createCheckoutSession() {
  const session = await requireAuth();
  const userId = session.user.id;
  const email = session.user.email;

  const cart = await db
    .select({
      laptopId: cartItems.laptopId,
      quantity: cartItems.quantity,
      title: laptops.title,
      priceCents: laptops.priceCents,
    })
    .from(cartItems)
    .leftJoin(laptops, eq(laptops.id, cartItems.laptopId))
    .where(eq(cartItems.userId, userId));

  if (cart.length === 0) throw new Error("Cart is empty");

  for (const item of cart) {
    if (item.title === null || item.priceCents === null) {
      throw new Error("One of the products is no longer available");
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Invalid quantity");
    }
  }

  const items = cart.map((i) => ({
    ...i,
    priceCents: i.priceCents!,
    title: i.title!,
  }));

  const customerId = await getOrCreateStripeCustomers(userId, email);

  const totalAmount = items.reduce((s, i) => s + i.quantity * i.priceCents, 0);

  const purchaseId = crypto.randomUUID();

  const reservedSlugs: string[] = [];
  await db.transaction(async (tx) => {
    await tx.insert(purchases).values({
      id: purchaseId,
      userId,
      stripeCustomerId: customerId,
      stripeCheckoutSessionId: "",
      status: "pending",
      amount: totalAmount,
      currency: "pln",
    });

    await tx.insert(purchaseItems).values(
      items.map((i) => ({
        id: crypto.randomUUID(),
        purchaseId,
        laptopId: i.laptopId,
        quantity: i.quantity,
        unitPriceCents: i.priceCents,
        titleSnapshot: i.title,
      })),
    );

    for (const i of items) {
      const [reserved] = await tx
        .update(laptops)
        .set({ quantity: sql`${laptops.quantity} - ${i.quantity}` })
        .where(
          and(eq(laptops.id, i.laptopId), gte(laptops.quantity, i.quantity)),
        )
        .returning({ slug: laptops.slug });

      if (!reserved) throw new Error(`Not enough in stock for ${i.title}`);

      reservedSlugs.push(reserved.slug);
    }
  });

  reservedSlugs.forEach((s) => revalidateTag(`product-${s}`, { expire: 0 }));

  let checkout;
  try {
    checkout = await stripe.checkout.sessions.create(
      {
        customer: customerId,
        client_reference_id: userId,
        line_items: cart.map((i) => ({
          price_data: {
            currency: "pln",
            product_data: { name: i.title! },
            unit_amount: i.priceCents!,
          },
          quantity: i.quantity,
        })),
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
        metadata: { purchaseId },
      },
      { idempotencyKey: `checkout-${purchaseId}` },
    );
    if (!checkout.url) throw new Error("No checkout url");

    await db
      .update(purchases)
      .set({ stripeCheckoutSessionId: checkout.id })
      .where(eq(purchases.id, purchaseId));
  } catch (error) {
    await releasePurchase(purchaseId, "failed");
    throw error;
  }

  redirect(checkout.url as Route);
}
