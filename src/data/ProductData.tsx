import product1 from "../assets/product-image/product1.png";
import product2 from "../assets/product-image/product2.png";
import product3 from "../assets/product-image/product3.png";
import product4 from "../assets/product-image/product4.png";
import product5 from "../assets/product-image/product5.png";
import product6 from "../assets/product-image/product6.png";
import product7 from "../assets/product-image/product7.png";
import product8 from "../assets/product-image/product8.png";
import product9 from "../assets/product-image/product9.png";
import product10 from "../assets/product-image/product10.png";
import product11 from "../assets/product-image/product11.png";
import product12 from "../assets/product-image/product12.png";
import product13 from "../assets/product-image/product13.png";
import product14 from "../assets/product-image/product14.png";
import product15 from "../assets/product-image/product15.png";
import product16 from "../assets/product-image/product16.png";

export interface ProductDataProps {
  image: string;
  price: number;
  title: string;
  id: number;
  rating: string;
}

export const productData = [
  {
    id: 101,
    image: product1,
    price: 500000,
    title: "GERMANY 24 AWAY JERSEY",
    rating: "5",
  },
  {
    id: 201,
    image: product2,
    price: 240000,
    title: "MANCHESTER UNITED 24 HOME JERSEY",
    rating: "3.5",
  },
  {
    id: 301,
    image: product3,
    price: 450000,
    title: "ITALY  24 HOME JERSEY",
    rating: "3.2",
  },
  {
    id: 401,
    image: product4,
    price: 70000,
    title: "REAL MADRID 24/25 HOME AUTHENTIC JERSEY",
    rating: "3",
  },
  {
    id: 501,
    image: product5,
    price: 110000,
    title: "MESSI TRAINING JERSEY",
    rating: "3",
  },
  {
    id: 601,
    image: product6,
    price: 670000,
    title: "JUVENTUS 23/24 AWAY JERSEY",
    rating: "4.5",
  },
  {
    id: 701,
    image: product7,
    price: 75000,
    title: "ARSENAL TIRO 24 COTTON TEE",
    rating: "4",
  },
  {
    id: 801,
    image: product8,
    price: 95000,
    title: "ARSENAL 24/25 HOME JERSEY",
    rating: "3.6",
  },
  {
    id: 901,
    image: product9,
    price: 97000,
    title: "REAL MADRID TIRO 24 COMPETITION TRAINING JERSEY",
    rating: "4.3",
  },
  {
    id: 1011,
    image: product10,
    price: 780000,
    title: "REAL MADRID PRE-MATCH JERSEY",
    rating: "4.9",
  },
  {
    id: 1122,
    image: product11,
    price: 87000,
    title: "SPAIN 24 AWAY JERSEY",
    rating: "3",
  },
  {
    id: 1233,
    image: product12,
    price: 100000,
    title: "FC BAYERN 24/25 HOME AUTHENTIC JERSEY",
    rating: "4.7",
  },
  {
    id: 1332,
    image: product13,
    price: 130000,
    title: "FC BAYERN 23/24 AWAY JERSEY",
    rating: "4.7",
  },
  {
    id: 1452,
    image: product14,
    price: 88000,
    title: "MANCHESTER UNITED TIRO 24 TRAINING JERSEY",
    rating: "4",
  },
  {
    id: 1554,
    image: product15,
    price: 230000,
    title: "JUVENTUS 23/24 AWAY JERSEY",
    rating: "5",
  },
  {
    id: 1668,
    image: product16,
    price: 311000,
    title: "MANCHESTER UNITED PRE-MATCH JERSEY",
    rating: "4.4",
  },
];
