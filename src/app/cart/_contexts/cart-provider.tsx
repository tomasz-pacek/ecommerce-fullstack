"use client";

import { updateCartItemQuantity } from "@/actions/cart";
import { toast } from "@/components/ui/toast";
import { CartItem, Laptop } from "@/db/schema";
import { createContext, useContext, useOptimistic, useTransition } from "react";

type CartEntry = { cart_items: CartItem; laptops: Laptop };

type CartContextValue = {
  items: CartEntry[];
  isPending: boolean;
  updateQuantity: (laptopId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type Props = {
  cartItems: CartEntry[];
  children: React.ReactNode;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within the CartProvider");
  return ctx;
};

export default function CartProvider({ cartItems, children }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    cartItems,
    (state, { laptopId, quantity }: { laptopId: string; quantity: number }) =>
      state.map((item) =>
        item.laptops.id === laptopId
          ? { ...item, cart_items: { ...item.cart_items, quantity } }
          : item,
      ),
  );

  const updateQuantity = (laptopId: string, quantity: number) => {
    startTransition(async () => {
      setOptimisticItems({ laptopId, quantity });

      try {
        const result = await updateCartItemQuantity(laptopId, quantity);
        if (!result.success) {
          toast.add({
            title: "Couldn't update quantity",
            type: "error",
          });
        }
      } catch {
        toast.add({
          title: "Couldn't update quantity",
          type: "error",
        });
      }
    });
  };

  return (
    <CartContext.Provider
      value={{ items: optimisticItems, isPending, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
