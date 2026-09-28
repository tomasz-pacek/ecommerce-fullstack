import { getCart } from "@/actions/cart";
import CheckoutClient from "./checkout-client";

export default async function CheckoutContent() {
  const cart = await getCart();

  const total = cart.reduce(
    (sum, i) => sum + i.laptops.priceCents * i.cart_items.quantity,
    0,
  );

  return (
    <div className="container mx-auto mt-48">
      <h1>Summary</h1>
      <ul>
        {cart.map((i) => (
          <li key={i.laptops.id}>
            {i.laptops.title} * {i.cart_items.quantity} ={" "}
            {((i.laptops.priceCents * i.cart_items.quantity) / 100).toFixed(2)}{" "}
            zł
          </li>
        ))}
      </ul>
      <p>
        <strong>{(total / 100).toFixed(2)} zł</strong>
      </p>

      <CheckoutClient amount={total} />
    </div>
  );
}
