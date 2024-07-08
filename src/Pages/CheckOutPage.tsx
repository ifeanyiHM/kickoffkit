import { ReactNode } from "react";

interface CheckOutPageProps {
  children: ReactNode;
}

function CheckOutPage({ children }: CheckOutPageProps) {
  return <div>{children}</div>;
}

export default CheckOutPage;
