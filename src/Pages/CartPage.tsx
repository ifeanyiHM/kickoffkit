import { ReactNode } from "react";

interface CartPageProps {
  children: ReactNode;
}

function CartPage({ children }: CartPageProps) {
  return <div className="cart-page">{children}</div>;
}

export default CartPage;
