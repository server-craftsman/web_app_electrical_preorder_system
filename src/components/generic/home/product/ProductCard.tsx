import React, { useState } from 'react';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';
import { formatCurrency } from '../../../../utils/helper';

interface ProductCardProps {
  product: GetAllProductResponseModel;
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
    <div className="bg-white shadow-md rounded-md overflow-hidden w-[228px] h-[410px]">
      {/* Image Section */}
      <div
        className="relative h-[160px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
        <h3 className="text-sm mx-auto py-2 font-semibold text-left h-[65px]">
          {product.name}
        </h3>
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
        <div className="flex justify-between items-center mt-1 text-yellow-500 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <span className="flex items-center text-red-500">
            Yêu thích
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 animate-zoomInOut hover:animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
