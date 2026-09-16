import { db } from "@/db";
import { purchases, cartItems, purchaseItems, laptops } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchaseId = session.metadata?.purchaseId;

      if (!purchaseId) {
        console.error("No purchaseId in metadata for session", session.id);
        break;
      }

      const [purchase] = await db
        .select()
        .from(purchases)
        .where(eq(purchases.id, purchaseId))
        .limit(1);

      if (!purchase) {
        console.error("Purchase not found", purchaseId);
        break;
      }

      if (purchase.status === "paid") break;

      await db
        .update(purchases)
        .set({
          status: "paid",
          stripePaymentIntentId: session.payment_intent as string,
        })
        .where(eq(purchases.id, purchaseId));

      const items = await db
        .select()
        .from(purchaseItems)
        .where(eq(purchaseItems.id, purchaseId));

      for (const item of items) {
        await db
          .update(laptops)
          .set({ quantity: sql`${laptops.quantity} - ${item.quantity}` })
          .where(eq(laptops.id, item.laptopId));
      }

      await db.delete(cartItems).where(eq(cartItems.userId, purchase.userId));

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchaseId = session.metadata?.purchaseId;

      if (purchaseId) {
        await db
          .update(purchases)
          .set({ status: "expired" })
          .where(eq(purchases.id, purchaseId));
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
