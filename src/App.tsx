import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import { ProductContext, ProductProvider } from "./Context/ProductContext";

function App() {
  const { isSelected } = useContext(ProductContext);

  return (
    <ProductProvider>
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
                <MainPage />
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
    </ProductProvider>
  );
}

export default App;
