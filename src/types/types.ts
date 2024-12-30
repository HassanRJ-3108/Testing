export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  price: number;
  quantity?: number;
}

export interface CategoryProducts {
  [key: string]: {
    id: string;
    name: string;
    products: Product[];
  };
}

