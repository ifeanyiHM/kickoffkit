import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductNotFound from "../Utilities/ProductNotFound";
import useProduct from "../Context/useProduct";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";

function CartSummary() {
  const {
    title,
    likedProducts,
    handleLikes,
    cartItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    getTotalAmount,
    productData,
    clearProductInCart,
    clearAllItems,
    totalItemsInCart,
  } = useProduct();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  //Reveal the inc and dec button
  const toggleCounterBtn = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  //Add shipping cost and tax to total amount
  const totalAmount = getTotalAmount() + 5000 + 3500;

  //check if cart is empty so as the send a different message to the ui
  const isCartEmpty = () => {
    return Object.values(cartItem).every((quantity) => quantity === 0);
  };

  //display this if cart is empty
  if (isCartEmpty())
    return (
      <ProductNotFound>
        <div style={{ marginBottom: "13rem" }}>
          <TiShoppingCart className="icon" />
          <h1 style={{ marginTop: "1rem" }}>
            Your cart is empty start shopping
          </h1>
        </div>
      </ProductNotFound>
    );

  return (
    <div className="cart-page-container">
      <div className="cart">
        {!isCartEmpty() ? (
          <div className="item-header">
            <h1>Your item</h1>
            <span className="cart-h" onClick={clearAllItems}>
              Clear All
            </span>
            <span className="check-h">Edit</span>
          </div>
        ) : (
          ""
        )}
        <div className="container">
          {productData.map((product, index: number) => {
            const {
              unique_id: id,
              name,
              photos,
              current_price: cost,
            } = product;
            const image = photos[0].url;
            const price = cost[0].NGN[0];

            if (cartItem[index] > 0) {
              return (
                <div className="item-container" key={id}>
                  <div className="product-img">
                    <img
                      src={`https://api.timbu.cloud/images/${image}`}
                      alt="product"
                    />
                  </div>
                  <div className="details">
                    <div className="dt">
                      <div>
                        <p>
                          {name.length > 20
                            ? `${name.slice(0, title)}...`
                            : name}
                        </p>
                        <span>Men's Jersey</span>
                      </div>
                      <p className="price">
                        ₦{(price * cartItem[index]).toLocaleString()}{" "}
                      </p>
                    </div>
                    <div className="button">
                      <button>
                        Size M <FaAngleDown />
                      </button>
                      <button>
                        Quantity {cartItem[index]}
                        <FaAngleDown onClick={() => toggleCounterBtn(index)} />
                        {activeIndex === index && (
                          <span className="inc">
                            <span onClick={() => increaseCartQuantity(index)}>
                              +
                            </span>
                            <span onClick={() => decreaseCartQuantity(index)}>
                              -
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="rate">
                      <RiDeleteBin6Line
                        className="icon1"
                        onClick={() => clearProductInCart(index)}
                      />
                      <span className="icon" onClick={() => handleLikes(id)}>
                        {likedProducts.includes(id) ? (
                          <IoIosHeart className="icon2" color=" #C61B1B" />
                        ) : (
                          <IoIosHeartEmpty className="icon2" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="summary">
        <h2>Order Summary</h2>
        <div className="order">
          <div>
            <span>items</span>
            <span>{totalItemsInCart}</span>
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
            <span>{totalAmount.toLocaleString()}</span>
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
