import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

import { ProductDataProps, productData } from "../data/ProductData";

interface CartPageProps {
  desktopView: boolean;
  productCart: ProductDataProps[];
  setProductCart: React.Dispatch<React.SetStateAction<ProductDataProps[]>>;
}

function CartPage({ desktopView, productCart, setProductCart }: CartPageProps) {
  const numOfProductCart = productCart.length;

  const totalPrice = productCart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  //delete product from the cart
  function clearProduct(id: number) {
    setProductCart((prod) => prod.filter((_, index) => index !== id));
  }

  //display in the see mor section products that is not in the cart
  const filteredProductData = productData.filter(
    (_, productId) => !productCart.some((_, cartId) => cartId === productId)
  );

  return (
    <div className="cart-page">
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
                          ? `${product.title.slice(0, 15)}...`
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
                      onClick={() => clearProduct(index)}
                    />
                    <IoIosHeartEmpty className="icon2" />
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
          <button className="proceed">Proceed to checkout</button>
        </div>
      </div>
      <div className="see-more">
        <div className="head">
          <h3>You might also like</h3>
          <div className="button">
            <TfiArrowCircleLeft className="icon" />
            <TfiArrowCircleRight className="icon" />
          </div>
        </div>
        <div className="product">
          {filteredProductData
            .slice(0, desktopView ? 4 : 2)
            .map((product, index) => (
              <div key={index} className="product-container">
                <div className="img-container">
                  <img src={product.image} alt="product" />
                  <span className="icon">
                    <IoIosHeartEmpty />
                  </span>
                  <span className="icon2">
                    <IoCartOutline />
                  </span>
                </div>
                <div className="price">
                  <span>₦{product.price.toLocaleString()}</span>
                  <span>
                    4.5 <IoStar className="icon" />
                  </span>
                </div>
                <p>{product.title.slice(0, 15)}...</p>
                <span className="tag">Men's Jersey</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
