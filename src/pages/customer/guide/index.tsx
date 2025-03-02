import React from 'react';

const GuidePage: React.FC = () => {
  // Danh sách các bước với hình ảnh mới
  const steps = [
    {
      img: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
      title: "Bước 1: Tạo Tài Khoản",
      desc: "Nhấp vào 'Đăng ký' ở góc trên bên phải, điền thông tin cần thiết và xác nhận email của bạn.",
    },
    {
      img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      title: "Bước 2: Chọn Sản Phẩm",
      desc: "Sử dụng thanh tìm kiếm hoặc duyệt danh mục để tìm sản phẩm phù hợp với nhu cầu của bạn.",
    },
    {
      img: "https://images.pexels.com/photos/4386323/pexels-photo-4386323.jpeg",
      title: "Bước 3: Đặt Hàng Trước",
      desc: "Nhấp vào nút 'Đặt hàng trước', điền thông tin giao hàng và chọn phương thức thanh toán.",
    },
    {
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      title: "Bước 4: Tiến Hành Thanh Toán",
      desc: (
        <>
          Thanh toán trước <span className="font-semibold">50% giá trị sản phẩm</span> qua cổng 
          <span className="text-blue-600 font-semibold"> VN Pay</span>.  
          <br />
          <span className="text-red-600 font-bold hidden group-hover:block">
            Vì đây là sản phẩm đặt trước, để hạn chế đơn hàng ảo, quý khách vui lòng đặt cọc trước 50% giá trị sản phẩm.
          </span>
        </>
      ),
    },
    {
      img: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg",
      title: "Bước 5: Xác Nhận Đơn Hàng",
      desc: "Sau khi thanh toán, bạn sẽ nhận được email xác nhận đơn hàng. Vui lòng kiểm tra email và nhấp vào nút xác nhận để hoàn tất quá trình đặt hàng.",
    },
    {
      img: "https://images.pexels.com/photos/3184457/pexels-photo-3184457.jpeg",
      title: "Bước 6: Theo Dõi Đơn Hàng",
      desc: "Vào 'Tài khoản của tôi' để theo dõi đơn hàng và nhận thông báo khi sản phẩm sẵn sàng.",
    },
  ];

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Hướng Dẫn Sử Dụng <span className="text-blue-600">Elecee</span>
      </h1>
      
      {/* Mô tả ngắn */}
      <p className="text-lg text-gray-600 text-center mb-10">
        Chào mừng bạn đến với nền tảng Pre-Order của chúng tôi! Dưới đây là hướng dẫn chi tiết giúp bạn dễ dàng đặt hàng sản phẩm yêu thích.
      </p>

      {/* Danh sách các bước */}
      <div className="grid md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="group p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
            <img 
              src={step.img} 
              alt={step.title} 
              className="w-40 h-40 rounded-xl object-cover mb-4 shadow-md"
            />
            <h2 className="text-2xl font-semibold text-blue-600">{step.title}</h2>
            <p className="text-gray-600 text-base mt-2">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Kết thúc với phần hỗ trợ */}
      <section className="mt-12 p-6 bg-blue-50 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold text-blue-600">Cần hỗ trợ?</h2>
        <p className="text-lg text-gray-700 mt-2">
          Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua <span className="text-blue-600">email</span> hoặc <span className="text-blue-600">số điện thoại</span>.
        </p>
      </section>
    </div>
  );
};

export default GuidePage;
