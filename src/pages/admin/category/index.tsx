import { Modal } from 'antd';
import { useState, useRef } from 'react';
import CreateCategory from '../../../components/admin/category/CreateCategory';
import ViewCategory from '../../../components/admin/category/ViewCategory';
import Search from '../../../components/search';

const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createCategoryRef = useRef<{ handleOpenModal: () => void } | null>(
    null
  );
  const [refreshCategories, setRefreshCategories] = useState(false); // state to trigger refresh
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateCategory = () => {
    setIsModalVisible(true);
    if (createCategoryRef.current) {
      createCategoryRef.current.handleOpenModal();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Trigger refresh of categories
  const handleCategoryCreated = () => {
    setRefreshCategories((prev) => !prev); // toggle to trigger useEffect in ViewCategory
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} />
        <button onClick={handleCreateCategory} className="btn-submit">
          Tạo danh mục
        </button>
      </div>
      <ViewCategory
        refresh={refreshCategories}
        searchTerm={searchTerm}
        refreshKey={refreshKey}
      />
      <Modal
        title="Tạo danh mục"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateCategory
          onCategoryCreated={handleCategoryCreated}
          onClose={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default Category;
