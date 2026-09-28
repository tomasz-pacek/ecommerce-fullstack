import ActionButton from "@/components/shared/action-button";
import { Route } from "next";
import { useRouter } from "next/navigation";

type Props = {
  isPending: boolean;
  itemCount: number;
};

export default function CartCheckoutButton({ isPending, itemCount }: Props) {
  const router = useRouter();
  return (
    <ActionButton
      onClick={() => {
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
