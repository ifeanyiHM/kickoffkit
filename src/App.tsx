import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext";
import { PrevTopPage } from "./Utilities/PrevToTop";

import Header from "./components/Header/Header";
import FooterPage from "./components/Footer/FooterPage";
import Nav from "./components/Header/Nav";
import HeaderBody from "./components/Header/HeaderBody";
import SeeMore from "./Pages/SeeMore";
import CartSummary from "./Pages/CartSummary";
import CheckOutForm from "./Pages/CheckOutForm";
import SuccessModal from "./Utilities/SuccessModal";
import PaymentSuccessful from "./Utilities/PaymentSuccessful";
import LazyLoadingSpinner from "./Utilities/LazyLoadingSpinner";

const MainPage = lazy(() => import("./components/Main/MainPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const CheckOutPage = lazy(() => import("./Pages/CheckOutPage"));
const ProductPage = lazy(() => import("./Utilities/ProductPage"));

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Suspense fallback={<LazyLoadingSpinner />}>
          <PrevTopPage />
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
            <Route path="product" element={<ProductPage />}></Route>
          </Routes>
          <FooterPage />
          <SuccessModal />
          <PaymentSuccessful />
        </Suspense>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
