"use client";
import { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/checkout";
import ActionButton from "@/components/shared/action-button";

export default function PayButton({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) return;

      const result = await createPaymentIntent();
      if ("error" in result) {
        setError(result.error);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: result.clientSecret,
        confirmParams: { return_url: `${window.location.origin}/complete` },
      });
      if (confirmError)
        setError(confirmError.message ?? "Something went wrong");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ActionButton
        onClick={handlePay}
        disabled={!stripe || !elements || loading}
      >
        {loading ? "Processing..." : `Pay ${(total / 100).toFixed(2)} zł`}
      </ActionButton>
      {error && <div>{error}</div>}
    </>
  );
}
