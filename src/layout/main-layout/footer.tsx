import React from 'react';
import logo1 from "../../assets/Elecee_logo.jpg";
export const Footer = () => {
  return (
    <footer className="bg-yellow-400">
      {/* Top Section */}
      <div className="text-center py-8">
        <p className="text-lg font-bold text-white">
          SALE UPTO 20%
        </p>
        <p className="text-2xl font-bold text-white">
          Đăng ký email để nhận voucher ưu đãi
        </p>
        <div className="mt-4 flex justify-center items-center">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="w-80 p-2 rounded-l-md border-none focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-r-md">
            Đăng ký
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo1} alt="Eureka Logo" className="w-8 h-8 rounded-full" />
              <span className="text-2xl font-bold text-black">Eureka</span>
            </div>
            <p className="text-gray-600">
              Elecee - Sản phẩm đột phá sáng tạo trên bàn làm việc của bạn
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Promotions */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">
              Thông tin khuyến mãi
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Lofree Flow Lite</li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Theo dõi đơn hàng</li>
              <li className="text-gray-600">Review sản phẩm</li>
              <li className="text-gray-600">Hướng dẫn sử dụng</li>
              <li className="text-gray-600">Tin công nghệ</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">
              Liên hệ
            </h4>
            <p className="text-gray-600">
              Gọi ngay: <span className="font-bold">0977936223</span>
            </p>
            <p className="text-gray-600">
              Email: eurekavn.2023@gmail.com
            </p>
            <p className="text-gray-600">
              Địa chỉ: 15/84 Ngô Xuân Quảng, Thị Trấn Trâu Quỳ, Gia Lâm, Hà Nội
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
