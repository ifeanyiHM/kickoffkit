import { LiaCheckCircle } from "react-icons/lia";
import { GoBlocked } from "react-icons/go";
import useProduct from "../Context/useProduct";

function SuccessModal() {
  const { isSelected, isInCart } = useProduct();

  if (isInCart)
    return (
      <div className="success">
        <GoBlocked className="icon" color="#C61B1B" />
        <span>Item already added to shopping cart</span>
      </div>
    );

  if (isSelected)
    return (
      <div className="success">
        <LiaCheckCircle className="icon" />
        <span>Successfully Added to Cart</span>
      </div>
    );
}

export default SuccessModal;
