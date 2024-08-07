import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../Context/useProduct";
import { ProductDataProps } from "../data/ProductData";

import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { IoCartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

function SeeMore() {
  const [curIndex, setCurIndex] = useState<number>(0);

  const navigate = useNavigate();

  const {
    addToCart,
    likedProducts,
    handleLikes,
    setProductDetails,
    searchedProducts,
    // filteredProductData,
    newCartItems,
  } = useProduct();

  function handleClick(details: ProductDataProps) {
    setProductDetails(details);
    navigate("/product");
  }

  const totalProducts = searchedProducts.length;

  function prevSlide() {
    setCurIndex((prevIndex) =>
      prevIndex === 0 ? totalProducts - 1 : prevIndex - 1
    );
  }

  function nextSlide() {
    setCurIndex((prevIndex) =>
      prevIndex === totalProducts - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div className="see-more">
      <div className="head">
        <h3>You might also like</h3>
        <div className="button">
          <TfiArrowCircleLeft className="icon" onClick={prevSlide} />
          <TfiArrowCircleRight className="icon" onClick={nextSlide} />
        </div>
      </div>
      <div className="product">
        {searchedProducts
          .slice(
            curIndex,
            window.innerWidth < 1024 ? curIndex + 2 : curIndex + 4
          )
          .map((product, index) => {
            const originalIndex = curIndex + index;
            const {
              unique_id: id,
              name,
              photos,
              available_quantity: rating,
              current_price: cost,
            } = product;
            const image = photos[0].url;
            const price = cost[0].NGN[0];
            return (
              <div key={id} className="product-container">
                <div className="img-container">
                  <img
                    src={`https://api.timbu.cloud/images/${image}`}
                    alt="product"
                    onClick={() => handleClick(product)}
                  />
                  <span className="icon" onClick={() => handleLikes(id)}>
                    {likedProducts.includes(id) ? (
                      <IoIosHeart color=" #C61B1B" />
                    ) : (
                      <IoIosHeartEmpty />
                    )}
                  </span>
                  <span
                    className={`icon2 ${
                      newCartItems.has(originalIndex) ? "add-to-cart" : ""
                    }`}
                    onClick={() => addToCart(originalIndex)}
                  >
                    <IoCartOutline />
                  </span>
                </div>
                <div className="price">
                  <span>₦{price.toLocaleString()}</span>
                  <span>
                    {rating} <IoStar className="icon" />
                  </span>
                </div>
                <p>{name.slice(0, 15)}...</p>
                <span className="tag">Men's Jersey</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SeeMore;
