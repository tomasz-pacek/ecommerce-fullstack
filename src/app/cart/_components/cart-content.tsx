import Reveal from "@/components/shared/reveal";
import { getUserCartItems } from "@/db/queries";

export default async function CartContent() {
  const cartItems = await getUserCartItems();
  return (
    <Reveal className="container mx-auto mt-42">
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>laptop id:{item.laptopId}</p>
          <p>cena: {item.priceCents}</p>
          <p>quantity: {item.quantity}</p>
        </div>
      ))}
    </Reveal>
  );
}
