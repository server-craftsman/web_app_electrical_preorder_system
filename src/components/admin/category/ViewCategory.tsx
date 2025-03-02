import { Modal, Table } from 'antd';
import { useState, useEffect } from 'react';
import Pagination from '../../pagination';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import EditCategory from './EditCategory';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { helper } from '../../../utils';

interface ViewCategoryProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
}

const ViewCategory = ({
  refresh,
  searchTerm,
  refreshKey,
}: ViewCategoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>(
    []
  );
  const [totalCategories, setTotalCategories] = useState(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State to control modal visibility
  const [categoryToEdit, setCategoryToEdit] =
    useState<GetAllCategoryResponseModel | null>(null); // State to hold category data for editing

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll({ searchTerm });
      if (Array.isArray(response.data?.data)) {
        const filteredCategories = response.data.data.filter(
          (category: GetAllCategoryResponseModel) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
        );
        setCategories(filteredCategories);
        setTotalCategories(filteredCategories.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refresh, searchTerm, refreshKey]);

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await CategoryService.delete(categoryId);
      return response;
    } catch (error) {
      console.error('Failed to delete category:', error);
      return false;
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: async () => {
        const success = await deleteCategory(categoryId);
        if (success) {
          helper.notificationMessage('Xóa danh mục thành công!', 'success');
          fetchCategories();
          Modal.destroyAll();
        }
      },
      onCancel: () => Modal.destroyAll(),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (category: GetAllCategoryResponseModel) => {
    setCategoryToEdit(category); // Set the category data to edit
    setIsEditModalVisible(true); // Show the modal
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: GetAllCategoryResponseModel) => (
        <span className="flex space-x-2">
          <button
            className="bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined className="text-xl" />
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700"
            onClick={() => handleDeleteCategory(record.id)}
          >
            <DeleteOutlined className="text-xl" />
          </button>
        </span>
      ),
    },
    // Add more columns as needed
  ];

  // Calculate the current page data slice
  const startIndex = (currentPage - 1) * 10;
  const currentCategories = categories.slice(startIndex, startIndex + 10);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={currentCategories.map((category) => ({
          ...category,
          key: category.id, // Add a unique key for each category
        }))}
        pagination={false}
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCategories / 10)}
            onPageChange={handlePageChange}
          />
        )}
      />
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {categoryToEdit && (
          <EditCategory
            category={categoryToEdit}
            onEditSuccess={() => {
              fetchCategories(); // Refresh data
              setIsEditModalVisible(false); // Close modal
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewCategory;
