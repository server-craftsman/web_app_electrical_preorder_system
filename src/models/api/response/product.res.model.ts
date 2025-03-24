export interface Category {
  id: string;
  name: string;
}

export interface ImageProduct {
  imageUrl: string;
  altText: string;
}

export interface CampaignStageResponseModel {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  quantitySold: number;
  targetQuantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignResponseModel {
  id: string; // UUID
  name: string;
  startDate: string; // LocalDateTime
  endDate: string; // LocalDateTime
  minQuantity: number; // Integer
  maxQuantity: number; // Integer
  totalAmount: number; // BigDecimal
  status: string; // CampaignStatus
  createdAt: string; // LocalDateTime
  updatedAt: string; // LocalDateTime
  stages: CampaignStageResponseModel[];
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
  campaigns?: CampaignResponseModel[];
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
