import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from "../../assets/Elecee_logo.jpg";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src={logo1} alt="Eureka Logo" className="w-8 h-8 rounded-full" />
        <span className="text-2xl font-bold text-black">Eureka</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-black hover:text-blue-600 transition">
          Trang chủ
        </Link>
        <Link to="/about" className="text-black hover:text-blue-600 transition">
          Giới thiệu
        </Link>
        <Link to="/products" className="text-black hover:text-blue-600 transition">
          Sản phẩm
        </Link>
        <Link to="/review" className="text-black hover:text-blue-600 transition">
          Review
        </Link>
        <Link to="/guide" className="text-black hover:text-blue-600 transition">
          Hướng dẫn sử dụng
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-xl text-gray-600 hover:text-gray-800 transition">
          🔍
        </button>
        <button className="text-xl text-gray-600 hover:text-gray-800 transition">
          ⬆️
        </button>
        <button className="text-xl text-gray-600 hover:text-gray-800 transition">
          ⬇️
        </button>
        <button className="flex items-center justify-center w-6 h-6 bg-yellow-400 text-black font-bold rounded-full">
          0
        </button>
        <button className="text-xl text-gray-600 hover:text-gray-800 transition">
          🛒
        </button>
      </div>
    </header>
  );
};
