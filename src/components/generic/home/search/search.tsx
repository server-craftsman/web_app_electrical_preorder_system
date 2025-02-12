import React, { useState, useMemo } from 'react';
import { SearchOutlined } from '@ant-design/icons';
interface SearchProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
}
const Search: React.FC<SearchProps> = ({onSearch ,placeholder = "Search..."}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    }
    const memoizedPlaceholder = useMemo(() => `🔍 ${placeholder}`, [placeholder]);

    return (
        <div>
            <input
                type="text"
                placeholder={memoizedPlaceholder}
                onChange={handleInputChange}
                value={searchTerm}
                className="w-64 rounded-l-lg border-2 border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-[#1a237e] focus:outline-none"
                style={{
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  height: "40px"
                }}
            />
            <button
                onClick={handleSearchSubmit}
                className="px-4 py-2 bg-[#1a237e] text-white rounded-r-lg"
                style={{
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  height: "40px"
                }}
            >
                <SearchOutlined className="text-xl" />
            </button>
        </div>
    );
};

export default Search;
