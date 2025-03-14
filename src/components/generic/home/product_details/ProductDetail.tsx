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
    <div className="max-w-full mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Product Images */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl h-[500px] flex justify-center items-center overflow-hidden">
          <img
            src={mainImage}
            alt="Product"
            className="w-full max-w-xl h-[500px] flex justify-center items-center overflow-hidden"
          />
        </div>
        <div className="flex mt-4 space-x-5">
          {productImages.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumb ${index + 1}`}
              className={`w-16 h-16 rounded-md cursor-pointer transition-all duration-200 ${
                mainImage === thumb
                  ? 'border-2 border-blue-500 shadow-lg'
                  : 'border border-gray-300'
              }`}
              onClick={() => setMainImage(thumb)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-gray-600">(1 đánh giá)</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-red-500 font-bold text-3xl">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {product.description}
        </ul>

        <div className="bg-yellow-100 p-3 rounded-md text-yellow-700">
          <strong>Lưu ý:</strong> Sản phẩm Pre-Order không hoàn cọc, thời gian
          lấy hàng lâu hơn bình thường.
        </div>

        <div className="text-gray-700">
          <strong>Số lượng:</strong>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-16 px-2 py-2 border rounded text-center"
            value={quantity}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, '');
              setQuantity(
                newValue === '' ? 1 : Math.max(1, parseInt(newValue, 10))
              );
            }}
          />
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-red-600 text-white rounded-md">
            Mua ngay
          </button>
          <button
            className="px-6 py-3 border bg-yellow-500 text-white rounded-md"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
