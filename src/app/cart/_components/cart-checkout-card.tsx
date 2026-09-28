"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/format-price";
import { cn } from "@/lib/utils";
import { useCart } from "../_contexts/cart-provider";
import CartCheckoutButton from "./cart-checkout-button";

export default function CartCheckoutCard() {
  const { items, isPending } = useCart();

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.cart_items.quantity,
    0,
  );
  const totalPrice = items.reduce(
    (sum, item) => sum + item.laptops.priceCents * item.cart_items.quantity,
    0,
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-3">
        <div className="flex w-full flex-wrap items-center justify-between gap-1">
          <span className="text-muted-foreground text-sm sm:text-base">
            Subtotal ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
          </span>
          <span
            className={cn(
              "text-foreground text-sm transition-opacity sm:text-base",
              isPending && "opacity-50",
            )}
          >
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Separator />
        <div className="text-foreground flex w-full justify-between text-base font-bold sm:text-lg">
          <span>Total</span>
          <span className={cn("transition-opacity", isPending && "opacity-50")}>
            {formatPrice(totalPrice)}
          </span>
        </div>
        <CartCheckoutButton isPending={isPending} itemCount={items.length} />
      </CardContent>
    </Card>
  );
}
