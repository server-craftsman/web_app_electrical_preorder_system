import { useState, useEffect } from 'react';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';
import { formatCurrency } from '../../../../utils/helper';
import { useCart } from '../../../../contexts/CartContext';
import { notification } from 'antd';
import { ProductService } from '../../../../services/product/product.service';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<GetAllProductResponseModel | null>(
    null
  );
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (slug) {
          const response = await ProductService.getBySlug(slug);
          const productData = response.data.data
            .product as GetAllProductResponseModel;
          setProduct(productData);
          // Set main image only if product has images
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
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const productImages =
    product?.imageProducts?.length > 0
      ? product.imageProducts.map((img) => img.imageUrl)
      : ['https://via.placeholder.com/500'];

  // const [mainImage, setMainImage] = useState(productImages[0]);
  // const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
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

  return (
    <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-xl shadow-sm">
      {/* Left: Product Images */}
      <div className="flex flex-col items-center">
        <div className="w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden flex justify-center items-center border border-gray-100">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-all duration-300"
          />
        </div>
        <div className="flex mt-6 space-x-4 justify-center">
          {productImages.map((thumb, index) => (
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
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
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
            <strong>Lưu ý:</strong> Sản phẩm Pre-Order không hoàn cọc, thời gian
            lấy hàng lâu hơn bình thường.
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
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
            Mua ngay
          </button>
          <button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
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
      </div>
    </div>
  );
};

export default ProductDetail;
