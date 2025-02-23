import { useState, useRef } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';

const Products = () => {
  const [, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [refreshProducts, setRefreshProducts] = useState(false); // state to trigger refresh
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateProduct = () => {
    setIsModalVisible(true);
    if (createProductRef.current) {
      createProductRef.current.handleOpenModal();
    }
  };

  const handleProductCreated = () => {
    setRefreshProducts(prev => !prev); // toggle to trigger useEffect in ViewProducts
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} />
        <button onClick={handleCreateProduct} className="btn-submit">
          Tạo sản phẩm
        </button>
      </div>
      <ViewProducts refresh={refreshProducts} searchTerm={searchTerm} refreshKey={refreshKey}/>

      <CreateProducts ref={createProductRef} onProductCreated={handleProductCreated} />
    </div>
  );
};

export default Products;
