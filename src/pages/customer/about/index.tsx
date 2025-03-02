import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Ảnh BG */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-50"></div>

      {/* Container */}
      <div className="relative z-10 p-10 max-w-5xl mx-auto text-center">
        {/* Tiêu đề chính */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Chào mừng đến với <span className="text-red-600">Elecee</span>
        </h1>
        <p className="text-xl font-bold text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
          Elecee là nền tảng mua sắm đồ công nghệ theo hình thức
          <span className="text-blue-500 font-semibold"> Pre-Order</span>. Chúng
          tôi kết nối bạn với những sản phẩm công nghệ mới nhất với mức giá{' '}
          <span className="text-green-500 font-semibold">ưu đãi nhất</span>.
        </p>

        {/* {Trang chính} */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full">
          {[
            {
              img: 'https://images.pexels.com/photos/3945666/pexels-photo-3945666.jpeg',
              title: 'Sản phẩm chính hãng',
              desc: 'Chúng tôi cam kết cung cấp sản phẩm công nghệ từ các thương hiệu uy tín như Apple, Samsung, Razer...',
            },
            {
              img: 'https://images.pexels.com/photos/4386323/pexels-photo-4386323.jpeg',
              title: 'Đặt hàng trước, giá tốt',
              desc: 'Mô hình Pre-Order giúp bạn tiếp cận sản phẩm công nghệ mới nhất với giá cạnh tranh hơn.',
            },
            {
              img: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
              title: 'Hỗ trợ nhanh chóng',
              desc: 'Đội ngũ hỗ trợ 24/7 giúp bạn giải đáp mọi thắc mắc và đảm bảo trải nghiệm mua sắm tốt nhất.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 bg-white shadow-lg rounded-3xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center text-center border border-gray-200"
            >
              <img
                src={item.img}
                alt={item.title}
                className="mb-4 rounded-full w-28 h-28 object-cover border-4 border-gray-200"
              />
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center relative z-20">
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition-transform"
          style={{ pointerEvents: 'auto' }}
        >
          Khám phá sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
