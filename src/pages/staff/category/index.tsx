import { useState } from 'react'
import DisplayCategory from '../../../components/staff/category/DisplayCategory';
import Search from '../../../components/search';

const Category = () => {  
  const [refreshCategories, _setRefreshCategories] = useState(false); // state to trigger refresh
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} />
      </div>
      <DisplayCategory 
      refresh={refreshCategories}
      searchTerm={searchTerm}
      refreshKey={refreshKey}
      />
    </div>
  )
}

export default Category;
