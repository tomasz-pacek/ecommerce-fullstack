"use client";
import { useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/checkout";
import ActionButton from "@/components/shared/action-button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message ?? "Check payment data");
        return;
      }
      const result = await createPaymentIntent();
      if ("error" in result) {
        //todo: fix
        setError(result.error);
        return;
      }
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: result.clientSecret,
        confirmParams: { return_url: `${window.location.origin}/complete` },
      });

      setError(confirmError.message ?? "Something went wrong");
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      <AddressElement options={{ mode: "billing" }} />
      <PaymentElement />
      <ActionButton type="submit" disabled={!stripe || loading}>
        {loading ? "Processibg" : "Pay"}
      </ActionButton>
      {error && <div>{error}</div>}
    </form>
  );
}
