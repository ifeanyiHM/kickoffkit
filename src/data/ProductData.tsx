export interface ProductDataProps {
  photos: { url: string }[];
  current_price: { NGN: number[] }[];
  name: string;
  unique_id: string;
  available_quantity: number;
}
