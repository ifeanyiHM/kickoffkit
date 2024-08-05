import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { ProductDataProps } from "../data/ProductData";
import { API_KEY, APP_ID, ID, PAGE } from "./const Constant";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";
import {
  ProductProps,
  defaultProductDetails,
  defaultProductProps,
} from "../Utilities/ProductProps";

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductProps>(defaultProductProps);

function ProductProvider({ children }: ProductProviderProps) {
  const [desktopView, setDesktopView] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
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
  const [cartItem, setCartItem] = useState<{ [key: number]: number }>({});
  const [newCartItems, setNewCartItems] = useState<Set<number>>(new Set());

  const productPageRef = useRef<HTMLDivElement>(null);
  const [productDetails, setProductDetails] =
    useBrowserStorageState<ProductDataProps>(
      defaultProductDetails,
      "productDetails"
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

  useEffect(() => {
    function getDefaultCart() {
      const cart: { [key: number]: number } = {};
      for (let index = 0; index < productData.length + 1; index++) {
        cart[index] = 0;
      }
      return cart;
    }

    if (productData.length > 0) {
      setCartItem(getDefaultCart());
    }
  }, [productData]);

  const handleAddToCart = (itemId: number) => {
    // Check if the item is already in the cart
    if (cartItem[itemId] > 0) {
      setIsInCart(true);
      return;
    }

    // Add the item to the cart
    setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    // Check if the product exists in productData
    if (productData.some((_, index) => index === itemId)) {
      setIsSelected(true);
      return;
    }
  };

  const addToCart = (itemId: number) => {
    handleAddToCart(itemId);
    setNewCartItems((prevCartItems) => new Set(prevCartItems).add(itemId));
  };

  const increaseCartQuantity = (itemId: number) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const decreaseCartQuantity = (itemId: number) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  function clearProductInCart(itemId: number) {
    setCartItem((prev) => ({ ...prev, [itemId]: 0 }));

    setNewCartItems((prevItems) => {
      const updatedItems = new Set(prevItems);
      updatedItems.delete(itemId);
      return updatedItems;
    });
  }

  function clearAllItems() {
    setCartItem({});
    setNewCartItems(new Set());
  }

  //get total number of items in cart
  const totalItemsInCart = Object.values(cartItem).reduce(
    (total, quantity) => total + quantity,
    0
  );

  //calculate the sum of all prouct in cart
  function getTotalAmount() {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = productData.find((_, index) => index === Number(item));
        if (itemInfo && typeof itemInfo.current_price[0].NGN[0] === "number") {
          totalAmount += itemInfo.current_price[0].NGN[0] * cartItem[item];
        }
      }
    }
    return totalAmount;
  }

  //search product by title
  const searchedProducts = productData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // display in the see more section products that is not in the cart
  // const filteredProductData = searchedProducts.filter(
  //   (_, index) => !cartItem[index] || cartItem[index] === 0
  // );

  //to like products
  function handleLikes(id: string) {
    setLikedProducts((likes) =>
      likes.includes(id) ? likes.filter((id) => id !== id) : [...likes, id]
    );
  }

  //smooth scrolling
  const scrollToProductPage = () => {
    if (productPageRef.current) {
      productPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        query,
        setQuery,
        productSelected,
        setProductSelected,
        desktopView,
        isSelected,
        isInCart,
        isPaymentMade,
        setIsPaymentMade,
        productPageRef,
        isLoading: isLoading,
        error: error,
        pagination,
        setPagination,
        productDetails,
        setProductDetails,
        increaseCartQuantity,
        decreaseCartQuantity,
        getTotalAmount,
        cartItem,
        clearProductInCart,
        clearAllItems,
        totalItemsInCart,
        scrollToProductPage,
        title: 15,
        addToCart: addToCart,
        handleAddToCart,
        searchedProducts,
        likedProducts,
        handleLikes,
        // filteredProductData,
        productData,
        newCartItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider, ProductContext };
