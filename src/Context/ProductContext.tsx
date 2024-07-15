import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { ProductDataProps } from "../data/ProductData";
import { API_KEY, APP_ID, ID, PAGE } from "./const Constant";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";
import {
  ProductProps,
  defaultProductDetails,
  defaultProductProps,
} from "../Utilities/ProductProps";

const ProductContext = createContext<ProductProps>(defaultProductProps);

interface ProductProviderProps {
  children: ReactNode;
}

function ProductProvider({ children }: ProductProviderProps) {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [productCart, setProductCart] = useState<ProductDataProps[]>([]);
  const [productSelected, setProductSelected] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isPaymentMade, setIsPaymentMade] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState<number>(PAGE);
  const [productDetails, setProductDetails] =
    useBrowserStorageState<ProductDataProps>(
      defaultProductDetails,
      "productDetails"
    );

  const productPageRef = useRef<HTMLDivElement>(null);

  //fetch products from timbu api
  useEffect(
    function () {
      async function fetchProducts() {
        try {
          setIsLoading(true);
          setError("");

          const url = `https://api.timbu.cloud/products?organization_id=${ID}&reverse_sort=false&page=${pagination}&size=10&Appid=${APP_ID}&Apikey=${API_KEY}`;

          const res = await fetch(url);
          if (!res.ok)
            throw new Error("Something went wrong with fetching products");

          const data = await res.json();
          if (data.response === false) throw new Error("Product not found");

          setProductData(data.items);
          setError("");
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchProducts();
    },
    [pagination]
  );

  //clear notification
  useEffect(
    function () {
      if (isSelected || isInCart) {
        const timeout = setTimeout(() => {
          setIsSelected(false);
          setIsInCart(false);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    },
    [isSelected, isInCart]
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

  //search product by title
  const searchedProducts = productData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  //display in the see more section products that is not in the cart
  const filteredProductData = searchedProducts.filter(
    (product) =>
      !productCart.some((cart) => cart.unique_id === product.unique_id)
  );

  //add product to array of selected product
  function handleCart(product: ProductDataProps) {
    setProductCart((products) => [...products, product]);
  }

  //display selected product on the cart page when clicked
  function addToCart(product: ProductDataProps) {
    // If the product is already in the cart, do nothing
    if (
      productCart.some((cartItem) => cartItem.unique_id === product.unique_id)
    ) {
      setIsInCart(true);
      return;
    }

    handleCart(product);
    setIsSelected(true);

    setProductSelected((selected) =>
      selected.includes(product.unique_id)
        ? selected.filter((id) => id !== product.unique_id)
        : [...selected, product.unique_id]
    );
  }

  //to like products
  function handleLikes(id: string) {
    setLikedProducts((likes) =>
      likes.includes(id) ? likes.filter((id) => id !== id) : [...likes, id]
    );
  }

  const scrollToProductPage = () => {
    if (productPageRef.current) {
      productPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        //hooks
        openMenu: openMenu,
        setOpenMenu: setOpenMenu,
        productCart: productCart,
        setProductCart: setProductCart,
        query: query,
        setQuery: setQuery,
        productSelected: productSelected,
        setProductSelected: setProductSelected,
        desktopView: desktopView,
        isSelected: isSelected,
        isInCart: isInCart,
        isPaymentMade: isPaymentMade,
        setIsPaymentMade: setIsPaymentMade,
        productPageRef: productPageRef,
        isLoading: isLoading,
        error: error,
        pagination,
        setPagination,
        productDetails,
        setProductDetails,

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
      {children}
    </ProductContext.Provider>
  );
}

// function useProduct() {
//   const context = useContext(ProductContext);
//   if (context === undefined) {
//     throw new Error("useProduct was used outside a ProductProvider");
//   }
//   return context;
// }

// export { ProductProvider, useProduct };

export { ProductProvider, ProductContext };
