// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Header = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/">Link</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };
import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from "../../assets/Elecee_logo.jpg";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src={logo1} alt="Eureka Logo" className="w-8 h-8 rounded-full" />
        <span className="text-2xl font-bold text-black">Elecee</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-black hover:text-blue-600 transition">
          Home Page
        </Link>
        <Link to="/about" className="text-black hover:text-blue-600 transition">
          Introduction
        </Link>
        <Link to="/products" className="text-black hover:text-blue-600 transition">
          Products
        </Link>
        <Link to="/review" className="text-black hover:text-blue-600 transition">
          Review
        </Link>
        <Link to="/guide" className="text-black hover:text-blue-600 transition">
          Instructions for use
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
