import { Suspense, ViewTransition } from "react";
import HeaderServer from "../_components/header-server";
import CartContent from "./_components/cart-content";

export default function CartPage() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <Suspense fallback={null}>
        <HeaderServer />
        <CartContent />
      </Suspense>
    </ViewTransition>
  );
}
