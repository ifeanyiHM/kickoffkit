import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider, useProduct } from "./Context/ProductContext";

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

function App() {
  return (
    <ProductProvider>
      <AppContent />
    </ProductProvider>
  );
}

function AppContent() {
  const { isSelected } = useProduct();
  return (
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
  );
}

export default App;
