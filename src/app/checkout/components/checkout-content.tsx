import { getCart } from "@/actions/cart";
import CheckoutClient from "./checkout-client";
import CheckoutSummary from "./checkout-summary";
import CheckoutForm from "./checkout-form";
import PayButton from "./pay-button";
import { redirect } from "next/navigation";
import { Route } from "next";

export default async function CheckoutContent() {
  const cartItems = await getCart();

  if (cartItems.length === 0) {
    redirect("/cart" as Route);
  }

  const total = cartItems.reduce(
    (sum, i) => sum + i.laptops.priceCents * i.cart_items.quantity,
    0,
  );

  return (
    <CheckoutClient amount={total}>
      <div className="container mx-auto mt-48 flex flex-row justify-center gap-20 px-4">
        <div className="w-3/5">
          <CheckoutForm />
        </div>

        <div className="w-2/5">
          <CheckoutSummary items={cartItems} total={total}>
            <PayButton total={total} />
          </CheckoutSummary>
        </div>
      </div>
    </CheckoutClient>
  );
}
