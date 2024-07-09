import { forwardRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { PiMaskSadLight } from "react-icons/pi";
import { IoIosHeart } from "react-icons/io";

import { ProductDataProps } from "../../data/ProductData";

interface MainPageProps {
  desktopView: boolean;
  productSelected: number[];
  searchedProducts: ProductDataProps[];
  addToCart: (product: ProductDataProps, index: number) => void;
  likedProducts: number[];
  handleLikes: (id: number) => void;
}

const MainPage = forwardRef<HTMLDivElement, MainPageProps>(
  (
    {
      desktopView,
      productSelected,
      addToCart,
      searchedProducts,
      likedProducts,
      handleLikes,
    },
    ref
  ) => {
    const [productList, setProductList] = useState<string>("arrival");

    //return not found if no products
    if (searchedProducts.length < 1)
      return (
        <div className="product-not-found">
          <PiMaskSadLight className="icon" />
          <h1>
            We couldn't find any product that match your search criteria. <br />
            Please try a different product....
          </h1>
        </div>
      );

    //display main page
    return (
      <main ref={ref}>
        <div className="nav">
          <button
            className={productList === "all" ? "active" : ""}
            onClick={() => setProductList("all")}
          >
            All
          </button>
          <button
            className={productList === "arrival" ? "active" : ""}
            onClick={() => setProductList("arrival")}
          >
            New Arrival
          </button>
          <button
            className={productList === "top" ? "active" : ""}
            onClick={() => setProductList("top")}
          >
            Top Seller
          </button>
        </div>
        <div className="sort">
          <button className="filter">
            <IoFilter /> <span>filter and sort 3</span>
          </button>
          <button className="close">
            Men
            <IoIosCloseCircleOutline className="icon" />
          </button>
          <button className="close">
            Club Teams
            <IoIosCloseCircleOutline className="icon" />
          </button>
          <button className="close">
            National Teams
            <IoIosCloseCircleOutline className="icon" />
          </button>
        </div>
        <div className="product">
          {searchedProducts.map((product, index) => (
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
              <p>
                {desktopView
                  ? product.title.length > 30
                    ? `${product.title.slice(0, 30)}...`
                    : product.title
                  : product.title.length > 15
                  ? `${product.title.slice(0, 15)}...`
                  : product.title}
              </p>

              <span className="tag">Men's Jersey</span>
            </div>
          ))}
        </div>
        <div className="nav-item-btn">
          <FaAnglesLeft className="icon" />
          <FaAngleLeft className="icon" />
          <span className="first">1</span>
          <span>2</span>
          {!desktopView ? (
            <span>...</span>
          ) : (
            <>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
            </>
          )}
          <span>9</span>
          <FaAnglesRight className="icon" />
          <FaAngleRight className="icon" />
        </div>
      </main>
    );
  }
);

export default MainPage;
