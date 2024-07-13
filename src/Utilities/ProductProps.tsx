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
  addToCart: (product: ProductDataProps, index: string) => void;
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
  addToCart: () => {},
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
};
