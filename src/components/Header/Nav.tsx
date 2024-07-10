import logo from "../../assets/Kickoff-Logo.svg";

import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoCartSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { ProductDataProps } from "../../data/ProductData";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

// interface NavProps {
//   openMenu: boolean;
//   setOpenMenu: (type: boolean) => void;
//   productCart: ProductDataProps[];
//   desktopView: boolean;
//   query: string;
//   setQuery: (type: string) => void;
// }

function Nav() {
  const { openMenu, setOpenMenu, productCart, desktopView, query, setQuery } =
    useContext(ProductContext);

  const navigate = useNavigate();

  const numOfProductCart = productCart.length;

  //navigate to either the home or cart page when logo or cart icon is clicked
  function goToCart(url: string) {
    navigate(url);

    if (!desktopView) {
      setOpenMenu(false);
    }
  }

  return (
    <nav>
      <div className="mobile">
        <div className="logo" onClick={() => goToCart("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="search-cart">
          <CiSearch className="icon-search" />
          <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
            {numOfProductCart > 0 ? <span>{numOfProductCart}</span> : ""}
            {openMenu ? (
              <IoCloseSharp className="icon" />
            ) : (
              <IoMdMenu className="icon" />
            )}
          </div>
        </div>
      </div>
      <ul className={openMenu ? "collapse" : ""}>
        <li>
          <IoMdMenu />
          Menu
        </li>
        <li>
          <input
            type="text"
            placeholder="Search for anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CiSearch className="icon-search" />
        </li>
        <li>Track Order</li>
        <li>Help</li>
        <li>
          <GoPerson /> Account
        </li>
        <li onClick={() => goToCart("/cart")}>
          <IoCartSharp />
          <span>cart</span>
          <span
            style={{ visibility: numOfProductCart > 0 ? "visible" : "hidden" }}
          >
            {numOfProductCart}
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
