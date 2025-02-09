import { Carousel } from 'antd';
import products from '../../../data/product.json';

const cover = () => {
  // Sort products by quantity sold in descending order and take the top 4
  const topSellingProducts = products
    .sort((a, b) => b.quantity_sold - a.quantity_sold)
    .slice(0, 4);

  return (
    <div className="w-full mt-2 max-w-10xl mx-auto border-2 border-gray-500 shadow-md rounded-b-lg">
      <Carousel
        autoplay
        dots={false}
        className="rounded-b-lg group"
        arrows
        draggable
      >
        {topSellingProducts.map((product) => (
          <div key={product.id} className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col justify-center items-center p-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-lg">{product.description}</p>
              <span className="text-lg font-bold mt-2">Giá chỉ từ {product.price_vnd} đ</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default cover;
