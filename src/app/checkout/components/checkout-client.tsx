"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

type Props = {
  amount: number;
  children: ReactNode;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutClient({ amount, children }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount, currency: "pln" }}
    >
      {children}
    </Elements>
  );
}
