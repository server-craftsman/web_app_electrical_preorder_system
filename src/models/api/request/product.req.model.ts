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

export interface ImageProduct {
  imageUrl: string;
  altText: string;
}

export interface UpdateProductRequestModel {
  productCode: string;
  name: string;
  quantity: number; // Assuming @Min(0) means non-negative
  description: string;
  price: number; // Assuming BigDecimal is used for precise decimal values
  position: number; // Assuming @PositiveOrZero means non-negative
  category: Category;
  oldImageProducts: ImageProduct[],
}
