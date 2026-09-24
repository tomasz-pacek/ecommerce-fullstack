"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../_contexts/cart-provider";

type Props = {
  laptopId: string;
  maxAvailableLaptops: number;
};

export default function CartItemQuantity({
  laptopId,
  maxAvailableLaptops,
}: Props) {
  const { items, updateQuantity } = useCart();

  const quantity =
    items.find((item) => item.laptops.id === laptopId)?.cart_items.quantity ??
    0;

  const handleChange = (delta: number) => {
    const next = quantity + delta;
    if (next < 1) return;
    updateQuantity(laptopId, next);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="icon"
        variant="outline"
        disabled={quantity <= 1}
        onClick={() => handleChange(-1)}
      >
        <Minus className="size-4" />
      </Button>
      <span className="w-6 text-center">{quantity}</span>
      <Button
        size="icon"
        variant="outline"
        disabled={quantity >= maxAvailableLaptops}
        onClick={() => handleChange(1)}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
