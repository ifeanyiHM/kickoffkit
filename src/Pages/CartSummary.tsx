import { useEffect, useState } from "react";
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
    productCart,
    setProductCart,
    setProductSelected,
    title,
    likedProducts,
    handleLikes,
  } = useProduct();
  const [quantities, setQuantities] = useState(productCart.map(() => 1));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [counterBtn, setCounterBtn] = useState<boolean>(false);

  // Toggle counter button for the clicked product
  const toggleCounterBtn = (index: number) => {
    setActiveIndex(index);
    setCounterBtn((btn) => !btn);
  };

  const handleIncrease = (index: number) => {
    setQuantities((prevQt) =>
      prevQt.map((qt, i) => (i === index ? qt + 1 : qt))
    );
  };

  const handleDecrease = (index: number) => {
    setQuantities((prevQt) =>
      prevQt.map((qt, i) => (i === index && qt > 1 ? qt - 1 : qt))
    );
  };

  const numOfProductCart = productCart.length;

  const navigate = useNavigate();

  const totalPrice = productCart.reduce((sum, product, index) => {
    const priceInNGN = product.current_price[0].NGN[0];
    const quantity = quantities[index];
    return sum + priceInNGN * quantity;
  }, 0);

  const orderSummaryPrice = totalPrice + 5000 + 3500;

  //delete product from the cart
  function clearProduct(id: string) {
    setProductCart((prod) => prod.filter((prod) => prod.unique_id !== id));

    //remove deleted product id from product selected array
    setProductSelected((selected) =>
      selected.filter((productId: string) => productId !== id)
    );
  }

  //clear all items
  function clearAllItems() {
    setQuantities(productCart.map(() => 1));
    setProductCart([]);
    setProductSelected([]);
  }
  //ensure product selected is updated whenever a product in the cart is removed
  useEffect(() => {
    setProductSelected((selected) =>
      selected.filter((id: string) =>
        productCart.some((product) => product.unique_id === id)
      )
    );
  }, [productCart, setProductSelected]);

  if (productCart.length < 1)
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
        {productCart.length >= 1 ? (
          <div className="item-header">
            <h1>Your item</h1>
            <span onClick={clearAllItems}>clear all</span>
          </div>
        ) : (
          ""
        )}
        <div className="container">
          {productCart.map((product, index: number) => {
            const {
              unique_id: id,
              name,
              photos,
              current_price: cost,
            } = product;
            const image = photos[0].url;
            const basePrice = cost[0].NGN[0];
            const quantity = quantities[index];
            const price = basePrice * quantity;
            return (
              <div className="item-container" key={index}>
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
                        {name.length > 20 ? `${name.slice(0, title)}...` : name}
                      </p>
                      <span>Men's Jersey</span>
                    </div>
                    <p className="price">₦{price.toLocaleString()} </p>
                  </div>
                  <div className="button">
                    <button>
                      Size M <FaAngleDown />
                    </button>
                    <button>
                      Quantity {quantity}{" "}
                      <FaAngleDown onClick={() => toggleCounterBtn(index)} />
                      {counterBtn && activeIndex === index && (
                        <span className="inc">
                          <span onClick={() => handleIncrease(index)}>+</span>
                          <span onClick={() => handleDecrease(index)}>-</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <div className="rate">
                    <RiDeleteBin6Line
                      className="icon1"
                      onClick={() => clearProduct(id)}
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
          })}
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
            <span>{orderSummaryPrice.toLocaleString()}</span>
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
