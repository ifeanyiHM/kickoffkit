import { useState } from "react";
import useProduct from "../../Context/useProduct";

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
import { TbError404Off } from "react-icons/tb";

import ProductNotFound from "../../Utilities/ProductNotFound";
import Spinner from "../../Utilities/Spinner";
import { ProductDataProps } from "../../data/ProductData";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const {
    desktopView,
    productSelected,
    addToCart,
    searchedProducts,
    likedProducts,
    handleLikes,
    productPageRef,
    error,
    isLoading,
    pagination,
    setPagination,
    setProductDetails,
  } = useProduct();

  const [productList, setProductList] = useState<string>("all");

  const navigate = useNavigate();

  const pages = [];
  for (let i = 1; i <= Math.ceil(30 / 10); i++) {
    pages.push(i);
  }

  function handleClick(details: ProductDataProps) {
    setProductDetails(details);
    navigate("product");
  }

  function shuffleArray(array: ProductDataProps[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const productCount =
    productList === "arrival" ? 5 : productList === "top" ? 2 : 10;

  // Shuffle and slice the products
  const randomProducts = shuffleArray([...searchedProducts]).slice(
    0,
    productCount
  );

  // return loading spinner when loading
  if (isLoading) return <Spinner />;

  //return if error fetching products
  if (error)
    return (
      <ProductNotFound>
        <TbError404Off className="icon" color="#077929" />
        <h1>{error}</h1>
      </ProductNotFound>
    );

  //return not found if no products
  if (searchedProducts.length < 1)
    return (
      <ProductNotFound>
        <PiMaskSadLight className="icon" />
        <h1>
          We couldn't find any product that match your search criteria. <br />
          Please try a different product....
        </h1>
      </ProductNotFound>
    );

  //display main page
  if (!isLoading && !error)
    return (
      <main ref={productPageRef}>
        <div className="nav">
          <button
            className={productList === "arrival" ? "active" : ""}
            onClick={() => setProductList("arrival")}
          >
            New Arrivals
          </button>
          <button
            className={productList === "all" ? "active" : ""}
            onClick={() => setProductList("all")}
          >
            All
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
          {randomProducts.map((product) => {
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
                      productSelected.includes(id) ? "add-to-cart" : ""
                    }`}
                    onClick={() => addToCart(product, id)}
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
                <p>
                  {desktopView
                    ? name.length > 30
                      ? `${name.slice(0, 23)}...`
                      : name
                    : name.length > 15
                    ? `${name.slice(0, 15)}...`
                    : name}
                </p>

                <span className="tag">Men's Jersey</span>
              </div>
            );
          })}
        </div>
        <div className="nav-item-btn">
          <FaAngleLeft
            className="icon"
            onClick={() => setPagination(Math.max(pagination - 1, 1))}
          />
          <FaAnglesLeft className="icon" onClick={() => setPagination(1)} />
          {pages.map((page, index) => (
            <span
              key={index}
              onClick={() => setPagination(page)}
              className={pagination === page ? "first" : ""}
            >
              {page}
            </span>
          ))}
          {/* <span className="first">1</span>
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
          <span>9</span> */}
          <FaAnglesRight
            className="icon"
            onClick={() => setPagination(Math.max(pagination + 1, 3))}
          />
          <FaAngleRight
            className="icon"
            onClick={() => setPagination(Math.max(pagination + 1, 1))}
          />
        </div>
      </main>
    );
};

export default MainPage;
