export interface Category {
    id: string;
    name: string;
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
    imageProducts: string[];
    createdAt: string;
    updatedAt: string;
    deleted: boolean;   
};
  
  
  