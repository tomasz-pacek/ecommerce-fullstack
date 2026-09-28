"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form";

type Props = {
  amount: number;
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutClient({ amount }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount, currency: "pln" }}
    >
      <CheckoutForm />
    </Elements>
  );
}
