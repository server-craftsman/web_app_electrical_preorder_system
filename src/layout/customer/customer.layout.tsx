import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Footer } from '../main-layout/footer';
import { useAuth } from '../../contexts/AuthContexts';
import CustomerNavbar from './customer.navbar';
import logo1 from '../../assets/Elecee_logo.jpg';
const { Header, Content } = Layout;

const CustomerLayout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { getCurrentUser, logout } = useAuth();
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



  const getAvatar = () => {
    return 'https://res.cloudinary.com/dsqbxgh88/image/upload/v1732626514/j8kpw2s84uwmoyxdokgq.jpg';
  };
  return (
    <Layout className="min-h-screen flex flex-col">
      <Layout className="flex flex-row">
        <Layout className="flex-1">
          <Header className="bg-white flex justify-between items-center px-8 shadow-lg">
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
            <nav className="hidden md:flex space-x-8 font-medium">
              <Link to="/" className="relative hover:text-red-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
                TRANG CHỦ
              </Link>
              <Link to="/about" className="relative hover:text-red-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
                GIỚI THIỆU
              </Link>
              <Link to="/products" className="relative hover:text-red-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
                SẢN PHẨM
              </Link>
              <Link to="/guide" className="relative hover:text-red-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
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
                    <button className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
                      <img
                        src={getAvatar()}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-600">{userInfo?.fullName}</span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 -mt-4 w-60 bg-white border border-gray-200 rounded-md shadow-md p-4">
                        <div className="flex items-center space-x-2 px-3 mb-2 -mt-4">
                          <img
                            src={getAvatar()}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full mt-6"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{userInfo?.fullName}</div>
                            <div className="text-sm text-gray-500 -mt-5">0869872830</div>
                          </div>
                        </div>

                        <button className="w-full mt-2 text-center text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors px-3 py-2 rounded-md" onClick={logout}>
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>

                  </>
                )}
              </div>
            </div>
          </Header>

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

          <div className="flex flex-row py-16 ml-16">
            <CustomerNavbar />

            <Content className="bg-gray-100 p-10 flex-1">
              <Outlet />
            </Content>
          </div>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default CustomerLayout;
