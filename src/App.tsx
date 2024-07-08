import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import FooterPage from "./components/Footer/FooterPage";
import Nav from "./components/Header/Nav";
import HeaderBody from "./components/Header/HeaderBody";
import CartPage from "./Pages/CartPage";
import { ProductDataProps } from "./data/ProductData";

function App() {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [productCart, setProductCart] = useState<ProductDataProps[]>([]);
  const [productSelected, setProductSelected] = useState<number[]>([]);

  function handleCart(product: ProductDataProps) {
    setProductCart((products) => [...products, product]);
  }

  function addToCart(product: ProductDataProps, index: number) {
    handleCart(product);

    setProductSelected((selected) =>
      selected.includes(index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );
  }

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
        <Routes>
          <Route
            index
            element={
              <>
                <Header>
                  <Nav
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    productCart={productCart}
                  />
                  <HeaderBody desktopView={desktopView} />
                </Header>
                <MainPage
                  desktopView={desktopView}
                  productSelected={productSelected}
                  addToCart={addToCart}
                />
              </>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <>
                <Nav
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  productCart={productCart}
                />
                <CartPage
                  desktopView={desktopView}
                  productCart={productCart}
                  setProductCart={setProductCart}
                  productSelected={productSelected}
                  addToCart={addToCart}
                />
              </>
            }
          ></Route>
        </Routes>
        <FooterPage />
      </BrowserRouter>
    </>
  );
}

export default App;
