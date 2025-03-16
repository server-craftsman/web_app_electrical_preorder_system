import React, { useState, useEffect } from 'react';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';
import { formatCurrency } from '../../../../utils/helper';
import { ROUTER_URL } from '../../../../const';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../../../../contexts/CartContext';
import { notification } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { CampaignResponseModel } from '../../../../models/api/response/campaign.res.model';
interface ProductCardProps {
  product: GetAllProductResponseModel;
  campaign?: CampaignResponseModel;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, campaign }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [campaign, setCampaign] = useState<CampaignResponseModel | null>(null);
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!campaign || !campaign.startDate || !campaign.endDate) return;

    const targetDate = new Date(campaign.startDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setCountdown(null);
        return;
      }

      setCountdown({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [campaign]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[258px] h-auto border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Hình ảnh sản phẩm - Fixed aspect ratio container */}
      <div
        className="relative w-full h-0 pb-[100%] overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          onClick={() =>
            navigate(`${ROUTER_URL.COMMON.PRODUCT}/${product.slug}`)
          }
          src={
            product.imageProducts.length > 1 && isHovered
              ? product.imageProducts[1].imageUrl
              : product.imageProducts[0].imageUrl
          }
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
        />
        {/* Thêm vào giỏ hàng */}
        <div
          className={`font-semibold absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm text-white text-center py-3 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full'
          } hover:bg-red-500`}
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageProducts[0].imageUrl,
              quantity: 1,
            });
            notification.success({
              message: 'Thêm vào giỏ hàng thành công',
              description: `Đã thêm "${product.name}" vào giỏ hàng 🛒`,
              placement: 'topRight',
              duration: 3,
            });
          }}
        >
          <ShoppingCartOutlined className="text-lg" /> Thêm vào giỏ hàng
        </div>
      </div>

      {/* Nội dung sản phẩm */}
      <div className="flex flex-col p-5 space-y-4">
        <h3
          onClick={() =>
            navigate(`${ROUTER_URL.COMMON.PRODUCT}/${product.slug}`)
          }
          className="text-lg font-semibold text-left cursor-pointer hover:text-red-500 truncate w-full"
        >
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-red-600 font-bold text-xl">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Đếm ngược khuyến mãi */}
        {campaign && (
          <div className="bg-gray-50 p-3 rounded-md text-xs border-l-4 border-blue-500">
            <div className="font-semibold text-center flex items-center justify-center gap-2">
              <CalendarOutlined className="text-xl text-blue-600" />
              <span className="text-gray-700">Dự kiến ra mắt:</span>
            </div>

            <div className="flex flex-col mt-2 text-center text-base">
              <p className="text-gray-700">
                {new Date(campaign.startDate).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex flex-col mt-2 text-center bg-gradient-to-r from-blue-600 to-blue-400 text-white px-3 py-2 rounded-md text-xl shadow-sm">
              <p>{new Date(campaign.startDate).toLocaleDateString()}</p>
            </div>
            {/* Đếm ngược dạng cột dọc */}
            {countdown ? (
              <div className="flex items-center justify-center space-x-2 text-center font-bold text-lg mt-3 bg-gray-100 rounded-md p-2">
                <div className="flex flex-col bg-white px-2 py-1 rounded shadow-sm">
                  <span>{countdown.days}</span>
                  <p className="text-sm font-normal text-gray-600">Ngày</p>
                </div>
                <span className="text-xl text-gray-400">:</span>
                <div className="flex flex-col bg-white px-2 py-1 rounded shadow-sm">
                  <span>{countdown.hours}</span>
                  <p className="text-sm font-normal text-gray-600">Giờ</p>
                </div>
                <span className="text-xl text-gray-400">:</span>
                <div className="flex flex-col bg-white px-2 py-1 rounded shadow-sm">
                  <span>{countdown.minutes}</span>
                  <p className="text-sm font-normal text-gray-600">Phút</p>
                </div>
                <span className="text-xl text-gray-400">:</span>
                <div className="flex flex-col bg-white px-2 py-1 rounded shadow-sm">
                  <span>{countdown.seconds}</span>
                  <p className="text-sm font-normal text-gray-600">Giây</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm mt-2 font-bold bg-green-100 text-green-700 py-2 rounded-md">
                Đã ra mắt
              </div>
            )}
          </div>
        )}

        <p className="text-gray-600 text-xs h-[50px] overflow-hidden border-l-2 border-gray-200 pl-2 italic">
          {product.description.slice(0, 50)}...
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
