import { getCart } from "@/actions/cart";
import Reveal from "@/components/shared/reveal";
import CartItemWrapper from "./cart-item-wrapper";
import CartCheckoutCard from "./cart-checkout-card";
import EmptyCart from "./empty-cart";
import CartProvider from "../_contexts/cart-provider";

export default async function CartContent() {
  const cartItems = await getCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <CartProvider cartItems={cartItems}>
      <Reveal className="container mx-auto mt-42 flex flex-col items-start justify-center gap-8 px-4 lg:flex-row lg:gap-12">
        <div className="w-full flex-1 space-y-3">
          {cartItems.map((item) => (
            <CartItemWrapper key={item.cart_items.id} item={item} />
          ))}
        </div>
        <div className="w-full lg:sticky lg:top-24 lg:max-w-md">
          <CartCheckoutCard />
        </div>
      </Reveal>
    </CartProvider>
  );
}
