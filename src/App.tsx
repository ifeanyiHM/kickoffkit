import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext";

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
import PaymentSuccessful from "./Utilities/PaymentSuccessful";
import ProductModal from "./Utilities/ProductModal";

// 69f5ec29c88d4f9f8e73cb33b62b279220240712125941210635

//https://api.timbu.cloud/products?organization_id=ad5291da29e04fb48ad03cf4fbdb0533&reverse_sort=false&page=2&size=10&Appid=YER5YP0BRIJRI5U&Apikey=69f5ec29c88d4f9f8e73cb33b62b279220240712125941210635

// YER5YP0BRIJRI5U

function App() {
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
          <Route path="product" element={<ProductModal />}></Route>
        </Routes>
        <FooterPage />
        <SuccessModal />
        <PaymentSuccessful />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
