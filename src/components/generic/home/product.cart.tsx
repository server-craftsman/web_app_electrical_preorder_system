import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  quantity_sold: number;
  created_at: string;
  updated_at: string;
  description: string;
  status: string;
  is_deleted: boolean;
  categories_id: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercentage =
    product.quantity_sold > 0
      ? Math.round(
          ((product.price - product.price * 0.9) / product.price) * 100
        )
      : null;

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
            -{discountPercentage}%
          </span>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center mt-2 text-yellow-500 text-sm">
          <span>⭐ ({product.quantity_sold} đánh giá)</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-red-500 font-bold text-lg">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.quantity_sold > 0 && (
              <span className="text-gray-500 line-through text-sm ml-2">
                {(product.price * 1.2).toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-gray-500">
          <span>Số lượng: {product.quantity}</span>
          <span>Đã bán: {product.quantity_sold}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
