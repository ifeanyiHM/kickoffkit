import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import FooterPage from "./components/Footer/FooterPage";
import Nav from "./components/Header/Nav";
import HeaderBody from "./components/Header/HeaderBody";
import CartPage from "./Pages/CartPage";
import { ProductDataProps, productData } from "./data/ProductData";
import SeeMore from "./Pages/SeeMore";
import CartSummary from "./Pages/CartSummary";
import CheckOutPage from "./Pages/CheckOutPage";
import CheckOutForm from "./Pages/CheckOutForm";
import SuccessModal from "./Utilities/SuccessModal";

function App() {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [productCart, setProductCart] = useState<ProductDataProps[]>([]);
  const [productSelected, setProductSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);

  //search product by title
  const searchedProducts = productData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
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

  //display in the see more section products that is not in the cart
  const filteredProductData = searchedProducts.filter(
    (product) => !productCart.some((cart) => cart.id === product.id)
  );

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
    <>
      <BrowserRouter>
        <Nav
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          productCart={productCart}
          desktopView={desktopView}
          query={query}
          setQuery={setQuery}
        />
        <Routes>
          <Route
            index
            element={
              <>
                <Header>
                  <HeaderBody desktopView={desktopView} />
                </Header>
                <MainPage
                  desktopView={desktopView}
                  productSelected={productSelected}
                  addToCart={addToCart}
                  searchedProducts={searchedProducts}
                />
              </>
            }
          ></Route>
          <Route
            path="cart"
            element={
              <>
                {/* <Nav
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  productCart={productCart}
                  desktopView={desktopView}
                  query={query}
                  setQuery={setQuery}
                /> */}
                <CartPage>
                  <CartSummary
                    productCart={productCart}
                    setProductCart={setProductCart}
                    setProductSelected={setProductSelected}
                    title={15}
                  />
                  <SeeMore
                    filteredProductData={filteredProductData}
                    desktopView={desktopView}
                    productSelected={productSelected}
                    addToCart={addToCart}
                  />
                </CartPage>
              </>
            }
          ></Route>
          <Route
            path="checkout"
            element={
              <>
                <Nav
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  productCart={productCart}
                  desktopView={desktopView}
                  query={query}
                  setQuery={setQuery}
                />
                <CheckOutPage>
                  <CheckOutForm>
                    <CartSummary
                      productCart={productCart}
                      setProductCart={setProductCart}
                      setProductSelected={setProductSelected}
                      title={15}
                    />
                  </CheckOutForm>
                  <SeeMore
                    filteredProductData={filteredProductData}
                    desktopView={desktopView}
                    productSelected={productSelected}
                    addToCart={addToCart}
                  />
                </CheckOutPage>
              </>
            }
          ></Route>
        </Routes>
        <FooterPage />
        {isSelected && <SuccessModal />}
      </BrowserRouter>
    </>
  );
}

export default App;
