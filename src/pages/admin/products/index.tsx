import { useState, useRef } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateProduct = () => {
    setIsModalVisible(true);
    if (createProductRef.current) {
      createProductRef.current.handleOpenModal();
    }
  };

  const handleProductCreated = () => {
    setRefreshProducts((prev) => !prev); // Trigger refresh
    setRefreshKey((prev) => prev + 1); // Ensure re-fetch
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prev) => prev + 1); // Trigger re-fetch in ViewProducts
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} placeholder="Tìm kiếm sản phẩm..." />
        <button onClick={handleCreateProduct} className="btn-submit">
          Tạo sản phẩm
        </button>
      </div>
      <ViewProducts
        refresh={refreshProducts}
        searchTerm={searchTerm}
        refreshKey={refreshKey}
      />
      <CreateProducts
        ref={createProductRef}
        isOpen={isModalVisible}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
};

export default Products;
