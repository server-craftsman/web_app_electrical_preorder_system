export interface Category {
  id: string;
  name: string;
}

export interface CreateProductRequestModel {
  productCode: string;
  name: string;
  quantity: number;
  description: string;
  price: number;
  position?: number;
  category: Category;
}
