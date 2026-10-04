import ActionButton from "@/components/shared/action-button";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useCart } from "../_contexts/cart-provider";

type Props = {
  isPending: boolean;
  itemCount: number;
};

export default function CartCheckoutButton({ isPending, itemCount }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useCart();
  return (
    <ActionButton
      onClick={() => {
        if (!isAuthenticated) {
          router.push(
            `/register?callbackurl=${encodeURIComponent("/checkout")}`,
          );
          return;
        }
        router.push("/checkout" as Route);
      }}
      type="submit"
      className="w-full rounded-lg py-5 text-sm"
      disabled={isPending || itemCount === 0}
    >
      Checkout
    </ActionButton>
  );
}
