export interface Category {
  id: string;
  name: string;
}

export interface ImageProduct {
  imageUrl: string;
  altText: string;
}

export interface GetAllCategoryResponseModel {
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
}
