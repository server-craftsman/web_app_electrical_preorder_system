import { useState, useEffect } from 'react';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';
import { formatCurrency } from '../../../../utils/helper';
import { useCart } from '../../../../contexts/CartContext';
import { notification } from 'antd';
import { ProductService } from '../../../../services/product/product.service';
import { useParams } from 'react-router-dom';
import { Progress, Tag } from 'antd';
import { useLocation } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<GetAllProductResponseModel | null>(
    null
  );
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [originalQuantity, setOriginalQuantity] = useState<number>(0);

  const location = useLocation();
  const initialQuantityFromNav = location.state?.initialQuantity;
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (slug) {
          const response = await ProductService.getBySlug(slug);
          const productData = {
            ...response.data.data.product,
            campaigns: response.data.data.campaigns
          } as GetAllProductResponseModel;
          // Set original quantity from navigation state or fall back to product quantity
          const initialQty = initialQuantityFromNav;
          setOriginalQuantity(initialQty);
          setProduct(productData);

          if (productData?.imageProducts?.length > 0) {
            setMainImage(productData.imageProducts[0].imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        notification.error({
          message: 'Lỗi',
          description: 'Không thể tải thông tin sản phẩm',
        });
      }
    };

    fetchProductDetails();
  }, [slug, location.state]);
  
  if (!product) {
    return (
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
        </div>

        <div className="h-10 bg-gray-200 rounded w-1/3"></div>

        <div className="h-40 bg-gray-200 rounded w-full"></div>

        <div className="h-20 bg-gray-200 rounded w-full"></div>

        <div className="flex space-x-4">
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const productImages =
    product?.imageProducts?.length > 0
      ? product.imageProducts.map((img) => img.imageUrl)
      : ['https://via.placeholder.com/500'];

  const hasCampaign = product?.campaigns && product.campaigns.length > 0;
  const isPreview = !hasCampaign;

  const handleAddToCart = () => {
    if (!product || !product.imageProducts || product.imageProducts.length === 0 || isPreview) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageProducts[0].imageUrl,
      quantity: quantity,
    });

    notification.config({ top: 73 });
    notification.success({
      message: 'Thêm vào giỏ hàng thành công',
      description: `Đã thêm "${product.name}" vào giỏ hàng 🛒`,
      placement: 'topRight',
      duration: 3,
    });
  };

  const renderCampaignProgress = (campaign: any) => {
    const now = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const isActive = campaign.status === 'ACTIVE' && now >= startDate && now <= endDate;

// Calculate sold quantity and progress
    const soldQuantity = originalQuantity - (product?.quantity || 0);
    const totalProgress = (soldQuantity / originalQuantity) * 100;

    return (
      <div key={campaign.id} className="bg-blue-50 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-800">{campaign.name}</h3>
          <Tag color={isActive ? 'success' : 'default'}>
            {isActive ? 'Đang diễn ra' : 'Sắp diễn ra'}
          </Tag>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Tiến độ chiến dịch</span>
            <span className="text-blue-600 font-medium">
              {soldQuantity}/{originalQuantity} sản phẩm ({Math.round(totalProgress)}%)
            </span>
          </div>
          <Progress 
            percent={Math.round(totalProgress)}
            status={totalProgress >= 100 ? 'success' : 'active'}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{new Date(campaign.startDate).toLocaleDateString('vi-VN')}</span>
            <span>{new Date(campaign.endDate).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
        
        {campaign.stages.map((stage: any) => {
          const progress = (stage.quantitySold / stage.targetQuantity) * 100;
          return (
            <div key={stage.id} className="space-y-2 border-t pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{stage.name}</span>
                <span className="text-blue-600 font-medium">
                  {stage.quantitySold}/{stage.targetQuantity} suất
                </span>
              </div>
              <Progress 
                percent={Math.round(progress)}
                status={progress >= 100 ? 'success' : 'active'}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                size="small"
              />
            </div>
          );
        })}
        
        <div className="text-sm text-gray-600 space-y-2 border-t pt-4">
          <p>• Số lượng tối thiểu: {campaign.minQuantity} sản phẩm</p>
          <p>• Số lượng tối đa: {campaign.maxQuantity} sản phẩm</p>
          <p>• Số lượng còn lại: {product?.quantity || 0} sản phẩm</p>
        </div>
      </div>
    );
  };

  // Update the product quantity display in the main section
  return (
    <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col items-center">
        <div className="w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden flex justify-center items-center border border-gray-100">
          {product ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-all duration-300"
            />
          ) : (
            <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
              <div className="w-3/4 h-3/4 bg-gray-200 rounded-lg"></div>
              <div className="mt-4 w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          )}
        </div>
        <div className="flex mt-6 space-x-4 justify-center">
          {product ? (
            productImages.map((thumb, index) => (
              <div
                key={index}
                className={`p-1 rounded-lg cursor-pointer transition-all duration-200 ${
                  mainImage === thumb
                    ? 'border-2 border-blue-500 shadow-md bg-blue-50'
                    : 'border border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setMainImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-16 h-16 object-contain rounded-md"
                />
              </div>
            ))
          ) : (
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {product && (
          <>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-gray-500 text-sm">(1 đánh giá)</span>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-red-600 font-bold text-3xl">
                {formatCurrency(product.price)}
              </span>
              <span className="ml-3 text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                Giá tốt nhất
              </span>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-300">
              <div className="prose prose-sm max-w-none text-gray-700">
                {product.description}
              </div>
            </div>

            {/* Add campaign progress section */}
            {product.campaigns && product.campaigns.length > 0 && (
              <div className="space-y-4">
                {product.campaigns.map((campaign: any) => renderCampaignProgress(campaign))}
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-yellow-800 text-sm">
                <strong>Lưu ý:</strong> Sản phẩm Pre-Order không hoàn cọc, thời
                gian lấy hàng lâu hơn bình thường.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-gray-700 font-medium">
                <strong>Số lượng:</strong>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <span className="text-xl font-medium">-</span>
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-16 px-2 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={quantity}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, '');
                    setQuantity(
                      newValue === '' ? 1 : Math.max(1, parseInt(newValue, 10))
                    );
                  }}
                />
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <span className="text-xl font-medium">+</span>
                </button>
              </div>
            </div>

            <div className="pt-4 flex space-x-4">
              <button 
                className={`flex-1 px-6 py-3 ${
                  isPreview 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg'
                } text-white rounded-lg shadow-md transition-all duration-300 font-medium`}
                disabled={isPreview}
                onClick={() => {
                  if (isPreview) {
                    notification.info({
                      message: 'Sản phẩm xem trước',
                      description: 'Sản phẩm này hiện chưa có chiến dịch, chỉ có thể xem trước.',
                      placement: 'topRight',
                    });
                  }
                }}
              >
                {isPreview ? 'chưa có chiến dịch' : 'Đặt hàng ngày'}
              </button>
              <button
                className={`flex-1 px-6 py-3 ${
                  isPreview 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-400 hover:shadow-lg'
                } text-white rounded-lg shadow-md transition-all duration-300 font-medium`}
                onClick={() => {
                  if (isPreview) {
                    notification.info({
                      message: 'Sản phẩm xem trước',
                      description: 'Sản phẩm này hiện chưa có chiến dịch, chỉ có thể xem trước.',
                      placement: 'topRight',
                    });
                  } else {
                    handleAddToCart();
                  }
                }}
                disabled={isPreview}
              >
                {isPreview ? 'Chưa có chiến dịch' : 'Thêm vào giỏ hàng'}
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100 mt-6">
              <div className="flex items-center text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Giao hàng nhanh
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Bảo hành chính hãng
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
