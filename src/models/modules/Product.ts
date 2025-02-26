import { ImageProduct } from "../api/response/product.res.model";

export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageProducts: ImageProduct[];
  
  // Add other product fields as needed
}

