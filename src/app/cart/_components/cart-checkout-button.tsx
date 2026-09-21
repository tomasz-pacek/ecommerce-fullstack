import { createCheckoutSession } from "@/actions/checkout";
import ActionButton from "@/components/shared/action-button";

type Props = {
  isPending: boolean;
  itemCount: number;
};

export default function CartCheckoutButton({ isPending, itemCount }: Props) {
  return (
    <form action={createCheckoutSession}>
      <ActionButton
        type="submit"
        className="w-full rounded-lg py-5 text-sm"
        disabled={isPending || itemCount === 0}
      >
        Checkout
      </ActionButton>
    </form>
  );
}
