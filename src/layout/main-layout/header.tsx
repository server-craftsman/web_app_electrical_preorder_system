import { Link } from 'react-router-dom';
import logo1 from '../../assets/Elecee_logo.jpg';
import { ROUTER_URL } from '../../const/router.path';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSearch]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 shadow-md">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img
            src={logo1}
            alt="Eureka Logo"
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text tracking-tight">
            Elecee
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-bold">
          <Link to="/" className="tab-custom">
            TRANG CHỦ
          </Link>
          <Link to="/about" className="tab-custom">
            GIỚI THIỆU
          </Link>
          <Link to="/products" className="tab-custom">
            SẢN PHẨM
          </Link>
          {/* <Link to="/review" className="tab-custom">
            REVIEW
          </Link> */}
          <Link to="/guide" className="tab-custom">
            HƯỚNG DẪN
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={handleSearchClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to={ROUTER_URL.LOGIN} className="btn-custom-secondary">
              ĐĂNG NHẬP
            </Link>
            <Link to={ROUTER_URL.REGISTER} className="btn-custom">
              ĐĂNG KÝ
            </Link>
          </div>
        </div>
      </header>
      <div className="h-[72px]"></div>

      {/* Search Component below the Header */}
      {showSearch && (
        <div className="fixed top-[72px] left-0 right-0 bg-white bg-opacity-90 flex justify-center items-center transition-opacity duration-500 ease-in-out">
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            onClick={handleCloseSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
