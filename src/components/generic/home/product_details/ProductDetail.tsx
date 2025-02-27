import { useState, useEffect } from 'react';
import productImage from '../../../../assets/Carousel_4.jpg';
import thumb1 from '../../../../assets/Elecee_logo.jpg';
import thumb2 from '../../../../assets/Carousel_2.jpg';
import thumb3 from '../../../../assets/imageuilogin.jpg';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';
// import { Product } from '../../../../models/modules/Product';
interface ProductDetailProps {
  product: GetAllProductResponseModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => { 
  const thumbnails = [thumb1, thumb2, thumb3];
  const [mainImage, setMainImage] = useState(productImage);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 11, minutes: 25, seconds: 7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        else clearInterval(timer);
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumb ${index + 1}`}
              className={`w-16 h-16 rounded-md cursor-pointer transition-all duration-200 ${
                mainImage === thumb ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-300'
              }`}
              onClick={() => setMainImage(thumb)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="space-y-4">
        
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-gray-600">(1 đánh giá)</span>
        </div>
        <div className="text-red-500 text-2xl font-bold">
          {product.price}đ
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Sạc 3 thiết bị cùng lúc</li>
          <li>Có thể gập lại thành 1 khối vuông</li>
          <li>Vỏ nhôm gia công tỉ mỉ</li>
        </ul>
        <div className="bg-yellow-100 p-3 rounded-md text-yellow-700">
          <strong>Lưu ý:</strong> Sản phẩm Pre-Order không hoàn cọc, thời gian lấy hàng lâu hơn bình thường.
        </div>
        <div className="bg-red-100 p-3 rounded-md text-red-700">
          <strong>Khuyến mãi kết thúc sau:</strong> {timeLeft.days}D : {timeLeft.hours}H : {timeLeft.minutes}M : {timeLeft.seconds}S
        </div>
        <div className="text-gray-700">
          <strong>Số lượng:</strong>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
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
              const newValue = e.target.value.replace(/\D/g, ""); 
              setQuantity(newValue === "" ? 1 : Math.max(1, parseInt(newValue, 10))); 
            }}
          />
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-red-600 text-white rounded-md">Mua ngay</button>
          <button className="px-6 py-3 border bg-yellow-500 text-white rounded-md">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
};


export default ProductDetail;
