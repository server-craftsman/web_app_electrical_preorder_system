import React, { useState } from 'react';
import { GetAllCategoryResponseModel } from '../../../../models/api/response/product.res.model';
import { formatCurrency } from '../../../../utils/helper';

interface ProductCardProps {
  product: GetAllCategoryResponseModel;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const discountPercentage =
    product.quantity > 0
      ? Math.round(
          ((product.price - product.price * 0.9) / product.price) * 100
        )
      : null;

  const discountedPrice = product.price * 0.9;

  return (
    <div
      className="bg-white shadow-md rounded-md overflow-hidden w-[228px] h-[399px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div className="relative h-[160px]">
        <img
          src={
            product.imageProducts.length > 1 && isHovered
              ? product.imageProducts[1].imageUrl
              : product.imageProducts[0].imageUrl
          }
          alt={
            product.imageProducts.length > 1 && isHovered
              ? product.imageProducts[1].altText
              : product.imageProducts[0].altText
          }
          className="w-[160px] h-[160px] object-cover scale-95 mx-auto"
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            Giảm {discountPercentage}%
          </span>
        )}
        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
          Trả góp 0%
        </span>
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-sm mx-auto py-2 font-semibold text-left h-[65px]">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-red-500 font-bold text-base">
              {formatCurrency(discountedPrice)}
            </span>
            <span className="text-gray-500 line-through ml-2 text-base">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        <div className="bg-gray-100 p-2 mt-2 text-gray-700 text-xs rounded h-[50px]">
          {product.description.slice(0, 50)}...
        </div>
        <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
          <span>Số lượng: {product.quantity}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
          <span>Mã SP: {product.productCode}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
