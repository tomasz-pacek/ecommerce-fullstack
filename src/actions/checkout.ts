"use server";
import { db } from "@/db";
import { CartItem, laptops, purchaseItems, purchases, user } from "@/db/schema";
import { requireAuth } from "@/lib/auth-session";
import { stripe } from "@/lib/stripe";
import { eq, inArray } from "drizzle-orm";
import { Route } from "next";
import { redirect } from "next/navigation";

async function getOrCreateStripeCustomers(userId: string, email: string) {
  const [db_user] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (db_user.stripeCustomerId) return db_user.stripeCustomerId;

  const customer = await stripe.customers.create({ email });

  await db
    .update(user)
    .set({ stripeCustomerId: customer.id })
    .where(eq(user.id, userId));

  return customer.id;
}

export async function createCheckoutSession(cart: CartItem[]) {
  const session = await requireAuth();

  const userId = session.user.id;
  const email = session.user.email;

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const customerId = await getOrCreateStripeCustomers(userId, email);

  const productsId = cart.map((item) => item.laptopId);

  const dbProducts = await db
    .select()
    .from(laptops)
    .where(inArray(laptops.id, productsId));

  const missing = cart.find(
    (item) => !dbProducts.some((p) => p.id === item.laptopId),
  );

  if (missing) {
    throw new Error("One of the products is no longer available");
  }

  const totalAmount = cart.reduce((sum, item) => {
    const product = dbProducts.find((p) => p.id === item.laptopId)!;
    return sum + product.priceCents * item.quantity;
  }, 0);

  const purchaseId = crypto.randomUUID();

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
      cart.map((item) => {
        const product = dbProducts.find((p) => p.id === item.laptopId)!;
        return {
          id: crypto.randomUUID(),
          purchaseId,
          laptopId: item.laptopId,
          quantity: item.quantity,
          unitPriceCents: product.priceCents,
          titleSnapshot: product.title,
        };
      }),
    );
  });

  const lineItems = cart.map((item) => {
    const product = dbProducts.find((p) => p.id === item.laptopId)!;

    return {
      price_data: {
        currency: "pln",
        product_data: { name: product.title },
        unit_amount: product.priceCents,
      },
      quantity: item.quantity,
    };
  });

  const checkout = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: userId,
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: { purchaseId },
  });

  if (!checkout.url) {
    throw new Error("Couldnt create checkout session");
  }

  await db
    .update(purchases)
    .set({ stripeCheckoutSessionId: checkout.id })
    .where(eq(purchases.id, purchaseId));

  redirect(checkout.url as Route);
}
