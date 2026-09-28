// import { db } from "@/db";
// import { purchases, cartItems, purchaseItems } from "@/db/schema";
// import { stripe } from "@/lib/stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import { and, eq, inArray } from "drizzle-orm";
// import Stripe from "stripe";
// import { releasePurchase } from "@/lib/checkout/release-purchase";

// async function fulfill(session: Stripe.Checkout.Session) {
//   if (session.payment_status !== "paid") return;

//   const purchaseId = session.metadata?.purchaseId;
//   if (!purchaseId) {
//     console.error("No purchaseId for session", session.id);
//     return;
//   }

//   await db.transaction(async (tx) => {
//     const [claimed] = await tx
//       .update(purchases)
//       .set({
//         status: "paid",
//         stripePaymentIntentId:
//           typeof session.payment_intent === "string"
//             ? session.payment_intent
//             : session.payment_intent?.id,
//       })
//       .where(
//         and(
//           eq(purchases.id, purchaseId),
//           eq(purchases.status, "pending"),
//           eq(purchases.amount, session.amount_total ?? -1),
//         ),
//       )
//       .returning({ userId: purchases.userId });

//     if (!claimed) {
//       console.warn("Purchase not claimed", purchaseId, session.id);
//       return;
//     }

//     const items = await tx
//       .select({ laptopId: purchaseItems.laptopId })
//       .from(purchaseItems)
//       .where(eq(purchaseItems.purchaseId, purchaseId));

//     await tx.delete(cartItems).where(
//       and(
//         eq(cartItems.userId, claimed.userId),
//         inArray(
//           cartItems.laptopId,
//           items.map((i) => i.laptopId),
//         ),
//       ),
//     );
//   });
// }

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = (await headers()).get("stripe-signature");

//   if (!sig) {
//     return NextResponse.json({ error: "No signature" }, { status: 400 });
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!,
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed", err);
//     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//   }

//   try {
//     switch (event.type) {
//       case "checkout.session.completed":
//       case "checkout.session.async_payment_succeeded":
//         await fulfill(event.data.object as Stripe.Checkout.Session);
//         break;

//       case "checkout.session.expired": {
//         const s = event.data.object as Stripe.Checkout.Session;
//         const purchaseId = s.metadata?.purchaseId;
//         if (purchaseId) await releasePurchase(purchaseId, "expired");
//         break;
//       }

//       default:
//         break;
//     }
//   } catch (err) {
//     console.error("Webhook handler failed", event.id, err);
//     return NextResponse.json({ error: "Handler failed" }, { status: 500 });
//   }

//   return NextResponse.json({ received: true });
// }

import { db } from "@/db";
import { cartItems, laptops, purchaseItems, purchases } from "@/db/schema";
import { and, eq, sql, gte } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handleSucceeded(event.data.object as Stripe.PaymentIntent);
      case "payment_intent.payment_failed":
        await handleFailed(event.data.object as Stripe.PaymentIntent);
    }
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleSucceeded(pi: Stripe.PaymentIntent) {
  await db.transaction(async (tx) => {
    const [purchase] = await tx
      .update(purchases)
      .set({
        status: "paid",
        metadata: {
          shipping: pi.shipping ?? null,
          receiptEmail: pi.receipt_email,
        },
      })
      .where(
        and(
          eq(purchases.stripePaymentIntentId, pi.id),
          eq(purchases.status, "pending"),
        ),
      )
      .returning();

    if (!purchase) return;

    const items = await tx
      .select()
      .from(purchaseItems)
      .where(eq(purchaseItems.purchaseId, purchase.id));

    for (const item of items) {
      const updated = await tx
        .update(laptops)
        .set({ quantity: sql`${laptops.quantity}-${item.quantity}` })
        .where(
          and(
            eq(laptops.id, item.laptopId),
            gte(laptops.quantity, item.quantity),
          ),
        )
        .returning({ id: laptops.id });

      if (updated.length === 0) {
        console.error(
          `Laptop isnt in stock ${item.laptopId}, purchase ${purchase.id}`,
        );
        await tx
          .update(purchases)
          .set({ status: "paid_needs_review" })
          .where(eq(purchases.id, purchase.id));
      }

      const [cart] = await tx
        .select()
        .from(cartItems)
        .where(eq(cartItems.userId, purchase.userId))
        .limit(1);

      if (cart) {
        await tx.delete(cartItems).where(eq(cartItems.id, cart.id));
      }
    }
  });
}

async function handleFailed(pi: Stripe.PaymentIntent) {
  await db
    .update(purchases)
    .set({ status: "failed" })
    .where(
      and(
        eq(purchases.stripePaymentIntentId, pi.id),
        eq(purchases.status, "pending"),
      ),
    );
}
