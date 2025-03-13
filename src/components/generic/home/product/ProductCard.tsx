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
    <div className="bg-white shadow-md rounded-md overflow-hidden w-[258px] h-auto">
      {/* Hình ảnh sản phẩm */}
      <div
        className="relative h-[240px] flex justify-center items-center overflow-hidden object-cover cursor-pointer"
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
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
        {/* Thêm vào giỏ hàng */}
        <div
          className={`font-semibold absolute bottom-0 left-0 w-full bg-black text-white text-center py-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer ${
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
      <div className="flex flex-col p-4 space-y-4 py-6">
        <h3
          onClick={() =>
            navigate(`${ROUTER_URL.COMMON.PRODUCT}/${product.slug}`)
          }
          className="text-lg font-semibold text-left cursor-pointer hover:text-red-500 -mt-3 truncate w-full"
        >
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-red-500 font-bold text-base">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Đếm ngược khuyến mãi */}
        {campaign && (
          <div className="text-black-800 p-2 rounded-md text-xs">
            <div className="font-semibold text-center flex items-center justify-center gap-2 -mt-3">
              <CalendarOutlined className="text-xl text-black-600" />
              <span>Dự kiến ra mắt:</span>
            </div>

            <div className="flex flex-col mt-2 text-center text-base">
              <p>{new Date(campaign.startDate).toLocaleTimeString()}</p>
            </div>
            <div className="flex flex-col mt-2 text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xl">
              <p>{new Date(campaign.startDate).toLocaleDateString()}</p>
            </div>
            {/* Đếm ngược dạng cột dọc */}
            {countdown ? (
              <div className="flex items-center justify-center space-x-2 text-center font-bold text-lg mt-2">
                <div className="flex flex-col">
                  <span>{countdown.days}</span>
                  <p className="text-sm font-normal">Ngày</p>
                </div>
                <span className="text-xl">:</span>
                <div className="flex flex-col">
                  <span>{countdown.hours}</span>
                  <p className="text-sm font-normal">Giờ</p>
                </div>
                <span className="text-xl">:</span>
                <div className="flex flex-col">
                  <span>{countdown.minutes}</span>
                  <p className="text-sm font-normal">Phút</p>
                </div>
                <span className="text-xl">:</span>
                <div className="flex flex-col">
                  <span>{countdown.seconds}</span>
                  <p className="text-sm font-normal">Giây</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm mt-2 font-bold">
                Đã ra mắt
              </div>
            )}
          </div>
        )}

        <p className="text-gray-700 text-xs h-[50px] overflow-hidden">
          {product.description.slice(0, 50)}...
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
