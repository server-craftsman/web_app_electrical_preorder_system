import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  instruction1,
  instruction2,
  instruction3,
} from '../../../assets/instruction';

const featureItems = [
  {
    img: instruction1,
    title: 'Sản phẩm chính hãng',
    desc: 'Chúng tôi cam kết cung cấp sản phẩm công nghệ từ các thương hiệu uy tín như Apple, Samsung, Razer...',
  },
  {
    img: instruction2,
    title: 'Đặt hàng trước, giá tốt',
    desc: 'Mô hình Pre-Order giúp bạn tiếp cận sản phẩm công nghệ mới nhất với giá cạnh tranh hơn.',
  },
  {
    img: instruction3,
    title: 'Hỗ trợ nhanh chóng',
    desc: 'Đội ngũ hỗ trợ 24/7 giúp bạn giải đáp mọi thắc mắc và đảm bảo trải nghiệm mua sắm tốt nhất.',
  },
];

const FeatureCard = memo(
  ({ img, title, desc }: { img: string; title: string; desc: string }) => (
    <div className="p-10 bg-white shadow-lg rounded-3xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center text-center border border-gray-200">
      <img
        src={img}
        alt={title}
        className="mb-4 rounded-full w-28 h-28 object-cover border-4 border-gray-200"
        loading="lazy"
      />
      <h2 className="text-2xl font-semibold text-blue-600 mb-2">{title}</h2>
      <p className="text-gray-600 text-base">{desc}</p>
    </div>
  )
);

FeatureCard.displayName = 'FeatureCard';

const AboutPage: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-50"></div>

      <div className="relative z-10 p-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Chào mừng đến với <span className="text-red-600">Elecee</span>
        </h1>
        <p className="text-xl font-bold text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
          Elecee là nền tảng mua sắm đồ công nghệ theo hình thức
          <span className="text-green-500 font-semibold">
            {' '}
            <strong>Pre-Order</strong>
          </span>
          . Chúng tôi kết nối bạn với những sản phẩm công nghệ mới nhất với mức
          giá{' '}
          <span className="text-green-500 font-semibold">
            <strong>ưu đãi nhất</strong>
          </span>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full">
          {featureItems.map((item, index) => (
            <FeatureCard
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
            />
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

export default memo(AboutPage);
