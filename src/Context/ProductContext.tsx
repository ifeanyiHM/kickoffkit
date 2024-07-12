import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProductProps, defaultProductProps } from "../Utilities/ProductProps";
import { ProductDataProps, productData } from "../data/ProductData";

const ProductContext = createContext<ProductProps>(defaultProductProps);

interface ProductProviderProps {
  children: ReactNode;
}

function ProductProvider({ children }: ProductProviderProps) {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [productCart, setProductCart] = useState<ProductDataProps[]>([]);
  const [productSelected, setProductSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isInCart, setIsInCart] = useState<boolean>(false);

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
    // If the product is already in the cart, do nothing
    if (productCart.some((cartItem) => cartItem.id === product.id)) {
      setIsInCart(true);
      return;
    }

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
        productPageRef: productPageRef,

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

function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct was used outside a ProductProvider");
  }
  return context;
}

export { ProductProvider, useProduct };
