"use client";

import { removeFromCart } from "@/actions/cart";
import ActionButton from "@/components/shared/action-button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

type Props = {
  cartItemId: string;
};

export default function RemoveCartItemButton({ cartItemId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleRemoveItem = (id: string) => {
    startTransition(async () => {
      removeFromCart(id);
    });
  };

  return (
    <ActionButton
      className="rounded-full"
      size="icon"
      loadingSpinner
      pendingText=""
      isPending={isPending}
      disabled={isPending}
      onClick={() => handleRemoveItem(cartItemId)}
    >
      <Trash2 />
    </ActionButton>
  );
}
