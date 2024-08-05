import { ProductDataProps } from "../data/ProductData";

export interface ProductProps {
  openMenu: boolean;
  setOpenMenu: (type: boolean) => void;
  productCart: ProductDataProps[];
  desktopView: boolean;
  query: string;
  setQuery: (type: string) => void;
  scrollToProductPage: () => void;
  productSelected: string[];
  searchedProducts: ProductDataProps[];
  likedProducts: string[];
  handleLikes: (id: string) => void;
  setProductCart: React.Dispatch<React.SetStateAction<ProductDataProps[]>>;
  setProductSelected: React.Dispatch<React.SetStateAction<string[]>>;
  title: number;
  filteredProductData: ProductDataProps[];
  isSelected: boolean;
  isInCart: boolean;
  isPaymentMade: boolean;
  setIsPaymentMade: (type: boolean) => void;
  productPageRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  error: string;
  pagination: number;
  setPagination: (type: number) => void;
  productDetails: ProductDataProps;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDataProps>>;
  productData: ProductDataProps[];
  addToCart: (itemId: number) => void;
  handleAddToCart: (itemId: number) => void;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  getTotalAmount: () => number;
  cartItem: { [key: number]: number };
  clearProductInCart: (itemId: number) => void;
  clearAllItems: () => void;
  totalItemsInCart: number;
  newCartItems: Set<number>;
  setNewCartItems: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export const defaultProductDetails: ProductDataProps = {
  photos: [],
  current_price: [{ NGN: [0] }],
  name: "",
  unique_id: "",
  available_quantity: 0,
};

export const defaultProductProps: ProductProps = {
  openMenu: false,
  setOpenMenu: () => {},
  productCart: [],
  desktopView: false,
  query: "",
  setQuery: () => {},
  scrollToProductPage: () => {},
  productSelected: [],
  searchedProducts: [],
  likedProducts: [],
  handleLikes: () => {},
  setProductCart: () => {},
  setProductSelected: () => {},
  title: 0,
  filteredProductData: [],
  isSelected: false,
  isInCart: false,
  isPaymentMade: false,
  setIsPaymentMade: () => {},
  productPageRef: { current: null },
  isLoading: false,
  error: "",
  pagination: 1,
  setPagination: () => {},
  productDetails: defaultProductDetails,
  setProductDetails: () => {},
  productData: [],
  addToCart: () => {},
  handleAddToCart: () => {},
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  getTotalAmount: () => 0,
  cartItem: {},
  clearProductInCart: () => {},
  clearAllItems: () => {},
  totalItemsInCart: 0,
  newCartItems: new Set(),
  setNewCartItems: () => {},
};
