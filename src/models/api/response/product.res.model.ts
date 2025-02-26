 
export interface Category {
  id: string;
  name: string;
}

export interface ImageProduct {
  imageUrl: string;
  altText: string;
}

export interface GetAllProductResponseModel {
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


export interface CreateProductResponseModel {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  quantity: number;
  description: string;
  price: number;
  position: number;
  status: string;
  isDeleted: boolean;
  category: Category;
  imageProducts: ImageProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProductResponseModel {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  quantity: number;
  description: string;
  price: number;
  position: number;
  status: string;
  isDeleted: boolean;
  category: Category;
  imageProducts: ImageProduct[];
  createdAt: string;
  updatedAt: string;
}