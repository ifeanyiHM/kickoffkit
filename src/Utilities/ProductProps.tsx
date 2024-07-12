import { ProductDataProps } from "../data/ProductData";

export interface ProductProps {
  openMenu: boolean;
  setOpenMenu: (type: boolean) => void;
  productCart: ProductDataProps[];
  desktopView: boolean;
  query: string;
  setQuery: (type: string) => void;
  scrollToProductPage: () => void;
  productSelected: number[];
  searchedProducts: ProductDataProps[];
  addToCart: (product: ProductDataProps, index: number) => void;
  likedProducts: number[];
  handleLikes: (id: number) => void;
  setProductCart: React.Dispatch<React.SetStateAction<ProductDataProps[]>>;
  setProductSelected: React.Dispatch<React.SetStateAction<number[]>>;
  title: number;
  filteredProductData: ProductDataProps[];
  isSelected: boolean;
  isInCart: boolean;
  isPaymentMade: boolean;
  setIsPaymentMade: (type: boolean) => void;
  productPageRef: React.RefObject<HTMLDivElement>;
}

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
};
