import HeaderServer from "../_components/header-server";
import { Suspense } from "react";
import CheckoutContent from "./components/checkout-content";

export default async function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <HeaderServer />
      <CheckoutContent />
    </Suspense>
  );
}
