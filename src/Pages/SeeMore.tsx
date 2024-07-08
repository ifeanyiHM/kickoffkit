import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";

import { ProductDataProps } from "../data/ProductData";

interface SeeMoreProps {
  filteredProductData: ProductDataProps[];
  desktopView: boolean;
  productSelected: number[];
  addToCart: (product: ProductDataProps, index: number) => void;
}

function SeeMore({
  filteredProductData,
  productSelected,
  desktopView,
  addToCart,
}: SeeMoreProps) {
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
                <span className="icon">
                  <IoIosHeartEmpty />
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
                  4.5 <IoStar className="icon" />
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