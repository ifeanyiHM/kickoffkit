import logo from "../../assets/Kickoff-Logo.svg";

import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoCartSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ProductDataProps } from "../../data/ProductData";

interface NavProps {
  openMenu: boolean;
  setOpenMenu: (type: boolean) => void;
  productCart: ProductDataProps[];
}

function Nav({ openMenu, setOpenMenu, productCart }: NavProps) {
  const navigate = useNavigate();

  const numOfProductCart = productCart.length;

  return (
    <nav>
      <div className="mobile">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
          {numOfProductCart > 0 ? <span>{numOfProductCart}</span> : ""}
          {openMenu ? (
            <IoCloseSharp className="icon" />
          ) : (
            <IoMdMenu className="icon" />
          )}
        </div>
      </div>
      <ul className={openMenu ? "collapse" : ""}>
        <li>
          <IoMdMenu />
          Menu
        </li>
        <li>
          <input type="text" placeholder="Search for anything" />
          <CiSearch className="icon-search" />
        </li>
        <li>Track Order</li>
        <li>Help</li>
        <li>
          <GoPerson /> Account
        </li>
        <li onClick={() => navigate("/cart")}>
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
