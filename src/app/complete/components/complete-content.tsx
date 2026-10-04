import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function CompleteContent({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string }>;
}) {
  const { payment_intent } = await searchParams;
  if (!payment_intent) return <p>No paymemt</p>;

  const pi = await stripe.paymentIntents.retrieve(payment_intent);

  return pi.status === "succeeded" ? (
    <h1>Purchase succeeded</h1>
  ) : (
    <h1>Payment status{pi.status}</h1>
  );
}
