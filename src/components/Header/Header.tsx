import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return <header className="header">{children}</header>;
}

export default Header;
