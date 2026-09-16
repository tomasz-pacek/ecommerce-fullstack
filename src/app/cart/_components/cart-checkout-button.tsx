import { createCheckoutSession } from "@/actions/checkout";
import ActionButton from "@/components/shared/action-button";
import { CartItem } from "@/db/schema";

type Props = {
  isPending: boolean;
  cartItems: CartItem[];
};

export default function CartCheckoutButton({ isPending, cartItems }: Props) {
  return (
    <form action={() => createCheckoutSession(cartItems)}>
      <ActionButton
        type="submit"
        className="w-full rounded-lg py-5 text-sm"
        disabled={isPending || cartItems.length === 0}
      >
        Checkout
      </ActionButton>
    </form>
  );
}
