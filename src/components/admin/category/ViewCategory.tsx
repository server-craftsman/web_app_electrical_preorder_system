import { Modal, Table } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../../pagination';
import { CustomEditIcon, CustomDeleteIcon } from './Icons';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import EditCategory from './EditCategory';

interface ViewCategoryProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number
}

const ViewCategory = ({ refresh, searchTerm, refreshKey }: ViewCategoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);  // State to control modal visibility
  const [categoryToEdit, setCategoryToEdit] = useState<GetAllCategoryResponseModel | null>(null);  // State to hold category data for editing

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll({ searchTerm });
      if (Array.isArray(response.data?.data)) {
        const filteredCategories = response.data.data.filter((category: GetAllCategoryResponseModel) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())  // Case-insensitive search
        );
        setCategories(filteredCategories);
        setTotalCategories(filteredCategories.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await CategoryService.delete(categoryId);
      return response.data.data.id;
    } catch (error) {
      console.error("Failed to delete category:", error);
      return false;
    }
  };

  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this category?",
        footer: [
          <button key="back" onClick={() => Modal.destroyAll()}>
            Cancel
          </button>,
          <button key="submit" className="bg-gradient-tone ml-3" onClick={async () => {
            const success = await deleteCategory(categoryId);
            if (success) {
              fetchCategories();
              Modal.destroyAll();
            }
          }}>
            OK
          </button>
        ]
      });
    },
    [fetchCategories]
  );

  useEffect(() => {
    fetchCategories();
  }, [refresh, searchTerm, refreshKey]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (category: GetAllCategoryResponseModel) => {
    setCategoryToEdit(category);  // Set the category data to edit
    setIsEditModalVisible(true);  // Show the modal
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: GetAllCategoryResponseModel) => (
        <span className="flex space-x-2">
          <button
            onClick={() => handleEdit(record)}  // Open edit modal with category data
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
          >
            <CustomEditIcon />
          </button>
          <button 
          onClick={() => record.id && handleDeleteCategory(record.id)} 
          className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700">
            <CustomDeleteIcon />
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
        dataSource={currentCategories}
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
        {categoryToEdit && <EditCategory category={categoryToEdit} />}
      </Modal>
    </div>
  );
};

export default ViewCategory;
