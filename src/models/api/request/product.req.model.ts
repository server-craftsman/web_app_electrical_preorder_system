export interface Category {
  id: string;
  name: string;
}

export interface CreateProductRequestModel {
  name: string;
  quantity: number;
  description: string;
  productCode: string;
  price: number;
  position: number;
  category: Category;
}
