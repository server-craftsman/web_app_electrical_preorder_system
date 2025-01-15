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
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Link</Link>
          </li>
        </ul>
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
