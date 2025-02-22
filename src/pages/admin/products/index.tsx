import { useState, useRef } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';
import { Modal } from 'antd';
const Products = () => {
  const [_isModalVisible, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);

  const handleCreateProduct = () => {
    setIsModalVisible(true);
    if (createProductRef.current) {
      createProductRef.current.handleOpenModal();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button onClick={handleCreateProduct} className="btn-submit">
          Tạo sản phẩm
        </button>
      </div>
      <ViewProducts />
      <Modal
        title="Thêm sản phẩm mới"
        // open={isModalVisible}
        // onCancel={handleCancel}
        // footer={null}
      >
        <CreateProducts ref={createProductRef} />
      </Modal>
    </div>
  );
};

export default Products;
