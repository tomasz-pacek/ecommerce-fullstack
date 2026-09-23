import { addToCart } from "@/actions/cart";
import { toast } from "@/components/ui/toast";
import { ShoppingCart } from "lucide-react";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const useAddToCart = (productId: string) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (quantity: number = 1) => {
    startTransition(async () => {
      const result = await addToCart(productId, quantity);
      if (result.success) {
        toast.add({
          title: "Product added to cart",
          type: "success",
          actionProps: {
            children: <ShoppingCart />,
            onClick() {
              router.push("/cart" as Route);
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
  return {
    isPending,
    handleAddToCart,
  };
};

export default useAddToCart;
