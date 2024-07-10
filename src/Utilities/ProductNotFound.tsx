import { ReactNode } from "react";

interface ProductNotFoundProps {
  children: ReactNode;
}

function ProductNotFound({ children }: ProductNotFoundProps) {
  return <div className="product-not-found">{children}</div>;
}

export default ProductNotFound;
