
export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  images: string[]; // carousel-friendly
  productUrl: string; // for redirecting to the store
}
