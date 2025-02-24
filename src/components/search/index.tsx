import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Tìm kiếm...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(); // Trigger search on Enter key press
    }
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm); // Immediate search on button click
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        value={searchTerm}
        className="w-64 h-12 rounded-l-full border-2 border-[#db4040] bg-transparent px-6 text-gray-700 focus:outline-none focus:border-[#1a237e] transition-all"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      />
      <button
        onClick={handleSearchSubmit}
        className="h-12 px-4 bg-red-500 text-white rounded-r-full flex items-center justify-center"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <SearchOutlined className="text-xl" />
      </button>
    </div>
  );
};

export default Search;