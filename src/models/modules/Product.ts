import { Category, ImageProduct } from "../api/response/product.res.model";

export interface Product {
  id: string;
  productCode: string;
  name: string;
  quantity: number;
  description: string;
  price: number;
  position: number;
  status: string;
  category: Category;
  imageProducts: ImageProduct[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  slug: string;
}

