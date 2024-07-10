import { ReactNode, createContext, useEffect, useRef, useState } from "react";
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

export { ProductProvider, ProductContext };
