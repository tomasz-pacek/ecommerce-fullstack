"use client";

import { Laptop } from "@/db/schema";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useTransition } from "react";
import ActionButton from "./action-button";
import { toast } from "../ui/toast";
import { addToCart } from "@/actions/cart";
import { useRouter } from "next/navigation";

type Props = {
  laptop: Laptop;
};

export default function AddToCart({ laptop }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const soldOut = laptop.quantity <= 0;

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(laptop.id, quantity);
      if (result.success) {
        toast.add({
          title: "Product added to cart",
          type: "success",
          actionProps: {
            children: <ShoppingCart />,
            onClick() {
              router.push("/cart");
            },
          },
        });
      } else {
        toast.add({
          title: result.error,
          type: "error",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:flex-row">
      <div className="border-border flex items-center justify-between rounded-full border px-2 sm:justify-start">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-foreground hover:bg-accent grid size-10 place-items-center rounded-full transition-colors disabled:opacity-30"
          disabled={soldOut}
          aria-label="Decrease quantity"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-10 text-center font-mono text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(laptop.quantity, q + 1))}
          className="text-foreground hover:bg-accent grid size-10 place-items-center rounded-full transition-colors disabled:opacity-30"
          disabled={soldOut || quantity >= laptop.quantity}
          aria-label="Increase quantity"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <ActionButton
        className="rounded-full p-5.5"
        onClick={handleAddToCart}
        isPending={isPending}
        disabled={isPending || soldOut}
      >
        Add to Cart
      </ActionButton>
    </div>
  );
}
