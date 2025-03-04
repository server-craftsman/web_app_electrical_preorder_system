import { useState } from 'react'
import DisplayProduct from '../../../components/staff/product/DisplayProduct';
import Search from '../../../components/search';

const Product = () => {
  const [refreshProducts, _setRefreshProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prev) => prev + 1); // Trigger re-fetch in ViewProducts
  };

  return (
    <div>
        <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} placeholder="Tìm kiếm sản phẩm..." />
      </div>
      <DisplayProduct 
      refresh={refreshProducts}
      searchTerm={searchTerm}
      refreshKey={refreshKey}
      />
    </div>
  )
}

export default Product;
