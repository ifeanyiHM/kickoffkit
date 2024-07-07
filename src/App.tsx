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

  function handleCart(product: ProductDataProps) {
    setProductCart((products) => [...products, product]);
  }

  useEffect(
    function () {
      const mq = window.matchMedia("(min-width: 1440px)");
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
                <MainPage desktopView={desktopView} onAddCart={handleCart} />
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
                <CartPage desktopView={desktopView} productCart={productCart} />
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
