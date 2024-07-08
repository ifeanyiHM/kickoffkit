import { ReactNode } from "react";

interface CheckOutPageProps {
  children: ReactNode;
}

function CheckOutPage({ children }: CheckOutPageProps) {
  return <div className="check-out-pages">{children}</div>;
}

export default CheckOutPage;
