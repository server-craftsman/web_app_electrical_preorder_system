import { Modal } from 'antd';
import { useState } from 'react';
import CreateCategory from '../../../components/admin/category/CreateCategory';
import ViewCategory from '../../../components/admin/category/ViewCategory';
import Search from '../../../components/search';
const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateCategory = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button onClick={handleCreateCategory} className="btn-submit">
          Tạo danh mục
        </button>
      </div>
      <ViewCategory />
      <Modal
        title="Tạo danh mục"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateCategory />
      </Modal>
    </div>
  );
};

export default Category;
