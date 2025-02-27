import { Link } from 'react-router-dom';
import logo1 from '../../assets/Elecee_logo.jpg';
import { ROUTER_URL } from '../../const/router.path';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { UserRole } from '../../app/enums';

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { getCurrentUser, logout, role } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const isLoggedIn = !!getCurrentUser();
  const userInfo = getCurrentUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getOverviewLink = () => {
    switch (role) {
      case UserRole.ADMIN:
        return ROUTER_URL.ADMIN.BASE;
      case UserRole.STAFF:
        return ROUTER_URL.STAFF.BASE;
      case UserRole.CUSTOMER:
        return ROUTER_URL.CUSTOMER.BASE;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };

  const getAvatar = () => {
    return 'https://res.cloudinary.com/dsqbxgh88/image/upload/v1732626514/j8kpw2s84uwmoyxdokgq.jpg';
  };

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
          <div className="flex items-center justify-center space-x-1">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <img
                    src={getAvatar()}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-600">{userInfo?.fullName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-md p-4">
                    <div className="flex items-center space-x-2 px-3 mb-2">
                      <img
                        src={getAvatar()}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {userInfo?.fullName}
                        </div>
                        <div className="text-sm text-gray-500">0869872830</div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 mt-4">
                      <Link
                        to={getOverviewLink()}
                        className="flex items-center text-base font-medium text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        <svg
                          data-slot="icon"
                          fill="none"
                          stroke-width="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-7 h-7 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                          ></path>
                        </svg>
                        Tổng quan
                      </Link>
                      <Link
                        to={ROUTER_URL.PROFILE}
                        className="flex items-center text-base font-medium text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Thông tin tài khoản
                      </Link>
                    </div>
                    <button
                      className="w-full mt-2 text-center text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors px-3 py-2 rounded-md"
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to={ROUTER_URL.LOGIN} className="btn-custom-secondary">
                  ĐĂNG NHẬP
                </Link>
                <Link to={ROUTER_URL.REGISTER} className="btn-custom">
                  ĐĂNG KÝ
                </Link>
              </>
            )}
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
