import { Modal } from 'antd';
import { useState, useRef } from 'react';
import CreateCategory from '../../../components/admin/category/CreateCategory';
import ViewCategory from '../../../components/admin/category/ViewCategory';
import Search from '../../../components/search';
import { PlusOutlined } from '@ant-design/icons';

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Quản lý danh mục
          </h1>
          <p className="text-gray-500">
            Quản lý và tổ chức các danh mục sản phẩm
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-2/3">
              <Search
                onSearch={handleSearch}
                placeholder="Tìm kiếm danh mục..."
              />
            </div>
            <button
              onClick={handleCreateCategory}
              className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PlusOutlined />
              <span>Tạo danh mục</span>
            </button>
          </div>

          <ViewCategory
            refresh={refreshCategories}
            searchTerm={searchTerm}
            refreshKey={refreshKey}
          />
        </div>
      </div>

      <Modal
        title={
          <div className="text-xl font-semibold text-gray-800">
            Tạo danh mục mới
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="category-modal"
        centered
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
