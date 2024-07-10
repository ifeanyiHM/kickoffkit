import { useContext, useEffect } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";

// interface CartSummaryProps {
//   productCart: ProductDataProps[];
//   setProductCart: React.Dispatch<React.SetStateAction<ProductDataProps[]>>;
//   setProductSelected: React.Dispatch<React.SetStateAction<number[]>>;
//   title: number;
//   likedProducts: number[];
//   handleLikes: (id: number) => void;
// }

function CartSummary() {
  const {
    productCart,
    setProductCart,
    setProductSelected,
    title,
    likedProducts,
    handleLikes,
  } = useContext(ProductContext);
  const numOfProductCart = productCart.length;

  const navigate = useNavigate();

  const totalPrice = productCart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  //delete product from the cart
  function clearProduct(id: number) {
    setProductCart((prod) => prod.filter((prod) => prod.id !== id));

    //remove deleted product id from product selected array
    setProductSelected((selected) =>
      selected.filter((productId: number) => productId !== id)
    );
  }
  //ensure product selected is updated whenever a product in the cart is removed
  useEffect(() => {
    setProductSelected((selected) =>
      selected.filter((id: number) =>
        productCart.some((product) => product.id === id)
      )
    );
  }, [productCart, setProductSelected]);

  return (
    <div className="cart-page-container">
      <div className="cart">
        <h1>Your item</h1>
        <div className="container">
          {productCart.map((product, index: number) => (
            <div className="item-container" key={index}>
              <div className="product-img">
                <img src={product.image} alt="product" />
              </div>
              <div className="details">
                <div className="dt">
                  <div>
                    <p>
                      {product.title.length > 20
                        ? `${product.title.slice(0, title)}...`
                        : product.title}
                    </p>
                    <span>Men's Jersey</span>
                  </div>
                  <p className="price">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="button">
                  <button>
                    Size M <FaAngleDown />
                  </button>
                  <button>
                    Quantity 1 <FaAngleDown />
                  </button>
                </div>
                <div className="rate">
                  <RiDeleteBin6Line
                    className="icon1"
                    onClick={() => clearProduct(product.id)}
                  />
                  <span
                    className="icon"
                    onClick={() => handleLikes(product.id)}
                  >
                    {likedProducts.includes(product.id) ? (
                      <IoIosHeart className="icon2" color=" #C61B1B" />
                    ) : (
                      <IoIosHeartEmpty className="icon2" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="summary">
        <h2>Order Summary</h2>
        <div className="order">
          <div>
            <span>items</span>
            <span>{numOfProductCart}</span>
          </div>
          <div>
            <span>delivery</span>
            <span>5,000</span>
          </div>
          <div>
            <span>Services</span>
            <span>3,500</span>
          </div>
          <div>
            <span>Total</span>
            <span>{totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <div className="coupon">
          <p>Do you have a coupon code?</p>
          <div className="input">
            <input type="text" placeholder="Enter a couponn code" />
            <button>Apply</button>
          </div>
        </div>
        <div className="line"></div>
        <button className="proceed" onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
