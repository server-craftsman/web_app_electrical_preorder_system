import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Elecee_logo.jpg';
import { ROUTER_URL } from '../../const';

const menuItems = [
  {
    label: 'Biểu đồ doanh thu',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
    key: 'overview',
    path: ROUTER_URL.STAFF.BASE,
  },
  {
    label: 'Danh mục',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    key: 'category',
    path: ROUTER_URL.STAFF.CATEGORY,
  },
  {
    label: 'Sản Phẩm',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    key: 'product',
    path: ROUTER_URL.STAFF.PRODUCT,
  },
  {
    label: 'Pre-order',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    key: 'pre-order',
    path: ROUTER_URL.STAFF.PREORDER,
  },
  {
    label: 'Đơn Hàng',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
    key: 'Order',
    path: ROUTER_URL.STAFF.ORDERS,
  },
  {
    label: 'Lịch Sử',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    key: 'history',
    path: ROUTER_URL.STAFF.HISTORY,
  },
  {
    label: 'Thông tin cá nhân',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
    key: 'profile',
    path: ROUTER_URL.STAFF.PROFILE,
  },
];

const StaffNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div
      className={`min-h-screen flex ${collapsed ? 'w-20' : 'w-[200px]'} transition-all bg-gray-900`}
    >
      <div className="flex flex-col items-center p-4 w-full relative">
        <div className="text-white text-lg font-bold mb-4">
          <Link to="/">
            {collapsed ? (
              <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
            ) : (
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="w-12 h-12 rounded-full object-cover mr-2"
                />
                <h1 className="hover:text-red-500">Elecee</h1>
              </div>
            )}
          </Link>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path}>
              <button
                className={`text-white flex items-center justify-start space-x-3 hover:bg-gray-700 p-3 rounded-md w-full ${selectedItem === item.key ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedItem(item.key)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 w-10 h-10 flex items-center justify-center"
        >
          {collapsed ? '>' : '<'}
        </button>
      </div>
    </div>
  );
};

export default StaffNavbar;
