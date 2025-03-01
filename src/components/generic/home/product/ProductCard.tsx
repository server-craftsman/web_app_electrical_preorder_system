import React, { useState } from "react";
import { GetAllProductResponseModel } from "../../../../models/api/response/product.res.model";
import { formatCurrency } from "../../../../utils/helper";
import { ROUTER_URL } from "../../../../const";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../../../contexts/CartContext";
import { notification } from "antd";
interface ProductCardProps {
  product: GetAllProductResponseModel;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Tính phần trăm giảm giá
  const discountPercentage =
    product.quantity > 0
      ? Math.round(((product.price - product.price * 0.9) / product.price) * 100)
      : null;

  const discountedPrice = product.price * 0.9;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageProducts[0].imageUrl,
      quantity: 1,
    });

    notification.config({
      top: 73, 
    });
    notification.success({
      message: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm "${product.name}" vào giỏ hàng 🛒`,
      placement: "topRight",
      duration: 3,

    });
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-[258px] h-auto">
      {/* Image Section */}
      <div
        className="relative h-[200px] flex justify-center items-center overflow-hidden object-cover cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          onClick={() => navigate(`${ROUTER_URL.COMMON.PRODUCT}/${product.slug}`)}
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
          className="w-full h-full object-position transition-transform duration-300 ease-in-out hover:scale-110"
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            Giảm {discountPercentage}%
          </span>
        )}
        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
          Trả góp 0%
        </span>
        {/* ✅ Nút thêm vào giỏ hàng */}
        <div
          className={`font-semibold absolute bottom-0 left-0 w-full bg-black text-white text-center py-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
            hover:bg-red-500
          `}
          onClick={handleAddToCart}
        >
          <ShoppingCartOutlined className="text-lg" /> Thêm vào giỏ hàng
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 space-y-4 py-6">
        <h3
          onClick={() => navigate(`${ROUTER_URL.COMMON.PRODUCT}/${product.slug}`)}
          className="text-lg font-semibold text-left cursor-pointer hover:text-red-500 -mt-3 truncate w-full"
        >
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-red-500 font-bold text-base">
            {formatCurrency(discountedPrice)}
          </span>
          <span className="text-gray-500 line-through text-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="text-gray-700 text-xs h-[50px] overflow-hidden">
          {product.description.slice(0, 50)}...
        </p>
        <div className="flex justify-between items-center text-gray-500 text-xs">
          <span>Số lượng: {product.quantity}</span>
          <span>Mã SP: {product.productCode}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-yellow-500 text-xs p-4 -mt-6">
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

  );
};

export default ProductCard;
