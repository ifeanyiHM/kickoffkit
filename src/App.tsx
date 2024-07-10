import { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProductProps, defaultProductProps } from "./Utilities/ProductProps";
import { ProductDataProps, productData } from "./data/ProductData";

import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import FooterPage from "./components/Footer/FooterPage";
import Nav from "./components/Header/Nav";
import HeaderBody from "./components/Header/HeaderBody";
import CartPage from "./Pages/CartPage";
import SeeMore from "./Pages/SeeMore";
import CartSummary from "./Pages/CartSummary";
import CheckOutPage from "./Pages/CheckOutPage";
import CheckOutForm from "./Pages/CheckOutForm";
import SuccessModal from "./Utilities/SuccessModal";

export const ProductContext = createContext<ProductProps>(defaultProductProps);

function App() {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [productCart, setProductCart] = useState<ProductDataProps[]>([]);
  const [productSelected, setProductSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const productPageRef = useRef<HTMLDivElement>(null);

  //search product by title
  const searchedProducts = productData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  //display in the see more section products that is not in the cart
  const filteredProductData = searchedProducts.filter(
    (product) => !productCart.some((cart) => cart.id === product.id)
  );

  //add product to array of selected product
  function handleCart(product: ProductDataProps) {
    setProductCart((products) => [...products, product]);
  }

  //display selected product on the cart page when clicked
  function addToCart(product: ProductDataProps) {
    handleCart(product);
    setIsSelected(true);

    setProductSelected((selected) =>
      selected.includes(product.id)
        ? selected.filter((id) => id !== product.id)
        : [...selected, product.id]
    );
  }

  //to like products
  function handleLikes(id: number) {
    setLikedProducts((likes) =>
      likes.includes(id) ? likes.filter((id) => id !== id) : [...likes, id]
    );
  }

  const scrollToProductPage = () => {
    if (productPageRef.current) {
      productPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //clear notification
  useEffect(
    function () {
      if (isSelected) {
        const timeout = setTimeout(() => {
          setIsSelected(false);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    },
    [isSelected]
  );

  //change certain things when navigating desktop and mobile
  useEffect(
    function () {
      const mq = window.matchMedia("(min-width: 1100px)");
      if (mq.matches) {
        setOpenMenu(true);
        setDesktopView(true);
      }
    },
    [setDesktopView]
  );
  return (
    <ProductContext.Provider
      value={{
        //states
        openMenu: openMenu,
        setOpenMenu: setOpenMenu,
        productCart: productCart,
        setProductCart: setProductCart,
        query: query,
        setQuery: setQuery,
        productSelected: productSelected,
        setProductSelected: setProductSelected,
        desktopView: desktopView,

        //functions
        scrollToProductPage: scrollToProductPage,
        title: 15,
        addToCart: addToCart,
        searchedProducts: searchedProducts,
        likedProducts: likedProducts,
        handleLikes: handleLikes,
        filteredProductData: filteredProductData,
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            index
            element={
              <>
                <Header>
                  <HeaderBody />
                </Header>
                <MainPage ref={productPageRef} />
              </>
            }
          ></Route>
          <Route
            path="cart"
            element={
              <>
                <CartPage>
                  <CartSummary />
                  <SeeMore />
                </CartPage>
              </>
            }
          ></Route>
          <Route
            path="checkout"
            element={
              <>
                <Nav />
                <CheckOutPage>
                  <CheckOutForm>
                    <CartSummary />
                  </CheckOutForm>
                  <SeeMore />
                </CheckOutPage>
              </>
            }
          ></Route>
        </Routes>
        <FooterPage />
        {isSelected && <SuccessModal />}
      </BrowserRouter>
    </ProductContext.Provider>
  );
}

export default App;
