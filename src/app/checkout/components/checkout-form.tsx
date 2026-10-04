"use client";
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  return (
    <div>
      <LinkAuthenticationElement />
      <AddressElement options={{ mode: "billing" }} />
      <PaymentElement />
    </div>
  );
}
