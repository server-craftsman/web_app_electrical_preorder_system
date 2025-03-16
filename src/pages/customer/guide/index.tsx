import React, { memo, lazy, Suspense } from 'react';
import {
  guide1,
  guide2,
  guide3,
  guide4,
  guide5,
  guide6,
} from '../../../assets/guide';

const optimizeImage = (src: string): string => {
  return src;
};

const Step = memo(
  ({
    img,
    title,
    desc,
    index,
  }: {
    img: string;
    title: string;
    desc: React.ReactNode;
    index: number;
  }) => (
    <div className="group p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
      <img
        src={optimizeImage(img)}
        alt={title}
        className="w-40 h-40 rounded-xl object-cover mb-4 shadow-md"
        loading={index < 2 ? 'eager' : 'lazy'} // Load first two images eagerly, lazy load the rest
        width={160}
        height={160}
        decoding="async"
      />
      <h2 className="text-2xl font-semibold text-blue-600">{title}</h2>
      <p className="text-gray-600 text-base mt-2">{desc}</p>
    </div>
  )
);

Step.displayName = 'Step';

// Memoize steps array to prevent recreation on re-renders
const steps = [
  {
    img: guide1,
    title: 'Bước 1: Tạo Tài Khoản',
    desc: "Nhấp vào 'Đăng ký' ở góc trên bên phải, điền thông tin cần thiết và xác nhận email của bạn.",
  },
  {
    img: guide2,
    title: 'Bước 2: Chọn Sản Phẩm',
    desc: 'Sử dụng thanh tìm kiếm hoặc duyệt danh mục để tìm sản phẩm phù hợp với nhu cầu của bạn.',
  },
  {
    img: guide3,
    title: 'Bước 3: Đặt Hàng Trước',
    desc: "Nhấp vào nút 'Đặt hàng trước', điền thông tin giao hàng và chọn phương thức thanh toán.",
  },
  {
    img: guide4,
    title: 'Bước 4: Tiến Hành Thanh Toán',
    desc: (
      <>
        Thanh toán trước{' '}
        <span className="font-semibold">50% giá trị sản phẩm</span> qua cổng
        <span className="text-blue-600 font-semibold"> VN Pay</span>.
        <br />
        <span className="text-red-600 font-bold hidden group-hover:block">
          Vì đây là sản phẩm đặt trước, để hạn chế đơn hàng ảo, quý khách vui
          lòng đặt cọc trước 50% giá trị sản phẩm.
        </span>
      </>
    ),
  },
  {
    img: guide5,
    title: 'Bước 5: Xác Nhận Đơn Hàng',
    desc: 'Sau khi thanh toán, bạn sẽ nhận được email xác nhận đơn hàng. Vui lòng kiểm tra email và nhấp vào nút xác nhận để hoàn tất quá trình đặt hàng.',
  },
  {
    img: guide6,
    title: 'Bước 6: Theo Dõi Đơn Hàng',
    desc: "Vào 'Tài khoản của tôi' để theo dõi đơn hàng và nhận thông báo khi sản phẩm sẵn sàng.",
  },
];

const SupportSection = lazy(() =>
  import('./SupportSection').catch(() => ({
    default: () => (
      <section className="mt-12 p-6 bg-blue-50 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold text-blue-600">Cần hỗ trợ?</h2>
        <p className="text-lg text-gray-700 mt-2">
          Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua{' '}
          <span className="text-blue-600">email</span> hoặc{' '}
          <span className="text-blue-600">số điện thoại</span>.
        </p>
      </section>
    ),
  }))
);

const GuidePage: React.FC = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Use preconnect for critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Hướng Dẫn Sử Dụng <span className="text-blue-600">Elecee</span>
      </h1>

      <p className="text-lg text-gray-600 text-center mb-10">
        Chào mừng bạn đến với nền tảng Pre-Order của chúng tôi! Dưới đây là
        hướng dẫn chi tiết giúp bạn dễ dàng đặt hàng sản phẩm yêu thích.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            img={step.img}
            title={step.title}
            desc={step.desc}
            index={index}
          />
        ))}
      </div>

      <Suspense
        fallback={
          <div className="mt-12 p-6 bg-gray-100 rounded-xl animate-pulse h-40"></div>
        }
      >
        <SupportSection />
      </Suspense>
    </div>
  );
};

// Use React.memo for the entire component to prevent unnecessary re-renders
export default memo(GuidePage);
