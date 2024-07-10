import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

import { useProduct } from "../Context/ProductContext";

function SeeMore() {
  const {
    filteredProductData,
    productSelected,
    desktopView,
    addToCart,
    likedProducts,
    handleLikes,
  } = useProduct();

  return (
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
                <span className="icon" onClick={() => handleLikes(product.id)}>
                  {likedProducts.includes(product.id) ? (
                    <IoIosHeart color=" #C61B1B" />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                </span>
                <span
                  className={`icon2 ${
                    productSelected.includes(product.id) ? "add-to-cart" : ""
                  }`}
                  onClick={() => addToCart(product, product.id)}
                >
                  <IoCartOutline />
                </span>
              </div>
              <div className="price">
                <span>₦{product.price.toLocaleString()}</span>
                <span>
                  {product.rating} <IoStar className="icon" />
                </span>
              </div>
              <p>{product.title.slice(0, 15)}...</p>
              <span className="tag">Men's Jersey</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SeeMore;
