import { db } from "@/db";
import { purchases, cartItems, purchaseItems } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";
import Stripe from "stripe";
import { releasePurchase } from "@/lib/checkout/release-purchase";

async function fulfill(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const purchaseId = session.metadata?.purchaseId;
  if (!purchaseId) {
    console.error("No purchaseId for session", session.id);
    return;
  }

  await db.transaction(async (tx) => {
    const [claimed] = await tx
      .update(purchases)
      .set({
        status: "paid",
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
      })
      .where(
        and(
          eq(purchases.id, purchaseId),
          eq(purchases.status, "pending"),
          eq(purchases.amount, session.amount_total ?? -1),
        ),
      )
      .returning({ userId: purchases.userId });

    if (!claimed) {
      console.warn("Purchase not claimed", purchaseId, session.id);
      return;
    }

    const items = await tx
      .select({ laptopId: purchaseItems.laptopId })
      .from(purchaseItems)
      .where(eq(purchaseItems.purchaseId, purchaseId));

    await tx.delete(cartItems).where(
      and(
        eq(cartItems.id, claimed.userId),
        inArray(
          cartItems.laptopId,
          items.map((i) => i.laptopId),
        ),
      ),
    );
  });
}

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

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await fulfill(event.data.object as Stripe.Checkout.Session);
        break;

      case "checkout.session.expired": {
        const s = event.data.object as Stripe.Checkout.Session;
        const purchaseId = s.metadata?.purchaseId;
        if (purchaseId) await releasePurchase(purchaseId, "expired");
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Webhook handler failed", event.id, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
