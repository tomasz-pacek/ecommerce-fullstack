import { Suspense } from "react";
import HeaderServer from "../_components/header-server";
import CartContent from "./_components/cart-content";

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <HeaderServer />
      <CartContent />
    </Suspense>
  );
}
