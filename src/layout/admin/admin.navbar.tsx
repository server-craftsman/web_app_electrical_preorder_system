import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFire, FaUser, FaHistory, FaVideo, FaThumbsUp } from 'react-icons/fa';

const menuItems = [
  { label: 'Home', icon: <FaHome />, key: 'home', path: '/' },
  { label: 'Trending', icon: <FaFire />, key: 'trending', path: '/trending' },
  { label: 'Subscriptions', icon: <FaUser />, key: 'subscriptions', path: '/subscriptions' },
  { label: 'Library', icon: <FaVideo />, key: 'library', path: '/library' },
  { label: 'History', icon: <FaHistory />, key: 'history', path: '/history' },
  { label: 'Liked Videos', icon: <FaThumbsUp />, key: 'likedVideos', path: '/liked-videos' }
];

const AdminNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen flex ${collapsed ? 'w-16' : 'w-64'} transition-all bg-gray-800`}>
      <div className="flex flex-col items-center p-4 w-full relative">
        <div className="text-white text-lg font-bold mb-4">
          {collapsed ? 'E' : 'Elecee'}
        </div>
        <div className="flex flex-col space-y-4 w-full">
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path}>
              <button className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
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

export default AdminNavbar;
