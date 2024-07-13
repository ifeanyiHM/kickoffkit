import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PrevTopPage() {
  const { pathname } = useLocation();

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname]
  );

  return null;
}
