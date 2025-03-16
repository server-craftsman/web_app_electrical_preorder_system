import { Link } from 'react-router-dom';
import logo1 from '../../assets/Elecee_logo.jpg';
import { ROUTER_URL } from '../../const/router.path';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { UserRole } from '../../app/enums';
import { useCart } from '../../contexts/CartContext';
import { Avatar, Dropdown, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../models/modules/User';
import { UserService } from '../../services/user/user.service';

export const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [showSearch, setShowSearch] = useState(false);
  const { getCurrentUser, logout, role } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Use a ref to track if the profile has been fetched
  const profileFetchedRef = useRef(false);

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

  const userInfo = getCurrentUser();
  const isLoggedIn = !!userInfo;
  const userId = userInfo?.id;

  // Fetch user profile only once when component mounts or userId changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Skip if already fetched or no userId
      if (!userId || profileFetchedRef.current) return;

      setLoading(true);
      try {
        const response = await UserService.getById(userId);
        if (response && response.data) {
          const userData = response.data?.data || response.data;
          setUserProfile(userData);
          // Mark as fetched
          profileFetchedRef.current = true;
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    // Reset the ref when userId changes
    return () => {
      if (userId !== userInfo?.id) {
        profileFetchedRef.current = false;
      }
    };
  }, [userId]); // Only depend on userId

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

  // Get the appropriate profile link based on user role
  const getProfileLink = () => {
    switch (role) {
      case UserRole.ADMIN:
        return ROUTER_URL.ADMIN.PROFILE;
      case UserRole.STAFF:
        return ROUTER_URL.STAFF.PROFILE;
      case UserRole.CUSTOMER:
        return ROUTER_URL.CUSTOMER.PROFILE;
      default:
        return '/profile';
    }
  };

  const getAvatar = () => {
    return userProfile?.avatar || null;
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
          <Link to={ROUTER_URL.COMMON.HOME} className="tab-custom">
            TRANG CHỦ
          </Link>
          <Link to={ROUTER_URL.COMMON.ABOUT} className="tab-custom">
            GIỚI THIỆU
          </Link>
          <Link to={ROUTER_URL.COMMON.PRODUCT} className="tab-custom">
            SẢN PHẨM
          </Link>
          <Link to={ROUTER_URL.COMMON.GUIDE} className="tab-custom">
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
            <Link
              to={ROUTER_URL.COMMON.ADD_TO_CART}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center justify-center space-x-1">
            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'userInfo',
                      label: (
                        <div className="px-4 py-3 flex items-center space-x-3 border-b border-gray-100">
                          <Avatar
                            src={getAvatar()}
                            icon={<UserOutlined />}
                            size={40}
                            className="border border-gray-200"
                          />
                          <div>
                            <div className="font-medium">
                              {userProfile?.fullname || userInfo?.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {userProfile?.phoneNumber || '0869872830'}
                            </div>
                          </div>
                        </div>
                      ),
                      style: { padding: 0 },
                    },
                    {
                      key: 'overview',
                      label: (
                        <Link
                          to={getOverviewLink()}
                          className="flex items-center space-x-3"
                        >
                          <span className="text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </span>
                          <span>Tổng quan</span>
                        </Link>
                      ),
                    },
                    {
                      key: 'profile',
                      label: (
                        <Link
                          to={getProfileLink()}
                          className="flex items-center space-x-3"
                        >
                          <span className="text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>Thông tin tài khoản</span>
                        </Link>
                      ),
                    },
                    {
                      key: 'logout',
                      label: (
                        <button
                          onClick={logout}
                          className="w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors rounded"
                        >
                          Đăng xuất
                        </button>
                      ),
                      style: { padding: '0 16px', marginTop: '8px' },
                    },
                  ],
                }}
                placement="bottomRight"
                arrow={true}
                open={isDropdownOpen}
                onOpenChange={toggleDropdown}
                trigger={['click']}
              >
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full transition-all duration-200">
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <Avatar
                      src={getAvatar()}
                      icon={<UserOutlined />}
                      size="default"
                      className="border border-gray-200"
                    />
                  )}
                  <span className="font-medium text-gray-800">
                    {userProfile?.fullname || userInfo?.fullName}
                  </span>
                </div>
              </Dropdown>
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
