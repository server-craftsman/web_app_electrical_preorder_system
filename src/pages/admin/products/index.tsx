import { useState, useRef } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';

const Products = () => {
  const [, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [refreshCategories, setRefreshCategories] = useState(false); // state to trigger refresh

  const handleCreateProduct = () => {
    setIsModalVisible(true);
    if (createProductRef.current) {
      createProductRef.current.handleOpenModal();
    }
  };

  const handleProductCreated = () => {
    setRefreshCategories(prev => !prev); // toggle to trigger useEffect in ViewProducts
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button onClick={handleCreateProduct} className="btn-submit">
          Tạo sản phẩm
        </button>
      </div>
      <ViewProducts refresh={refreshCategories} />

      <CreateProducts ref={createProductRef} onProductCreated={handleProductCreated} />
    </div>
  );
};

export default Products;
