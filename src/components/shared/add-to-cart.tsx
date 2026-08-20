"use client";

import { Laptop } from "@/db/schema";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import ActionButton from "./action-button";
import { addToCart } from "@/actions/cart";
import { toast } from "../ui/toast";

type Props = {
  laptop: Laptop;
};

export default function AddToCart({ laptop }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const soldOut = laptop.quantity <= 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    addToCart(laptop.id, quantity)
      .then((result) => {
        if (!result.success) {
          toast.add({ title: result.error, type: "error" });
        } else {
          toast.add({ title: "Product added to cart", type: "success" });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.add({ title: "Something went wrong", type: "error" });
      })
      .finally(() => {
        setIsLoading(false);
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
        isPending={isLoading}
        disabled={isLoading}
      >
        Add to Cart
      </ActionButton>
    </div>
  );
}
