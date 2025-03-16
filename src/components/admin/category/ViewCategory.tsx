import { Modal, Table, Empty, Spin } from 'antd';
import { useState, useEffect } from 'react';
import Pagination from '../../pagination';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import EditCategory from './EditCategory';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] =
    useState<GetAllCategoryResponseModel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getAll({ searchTerm });
      if (Array.isArray(response.data?.data)) {
        const filteredCategories = response.data.data.filter(
          (category: GetAllCategoryResponseModel) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCategories(filteredCategories);
        setTotalCategories(filteredCategories.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
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
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined className="text-amber-500" />,
      content: (
        <div className="py-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xóa danh mục này?
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Hành động này không thể hoàn tác.
          </p>
        </div>
      ),
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: {
        className: 'bg-red-500 hover:bg-red-600 border-red-500',
        danger: true,
      },
      onOk: async () => {
        const success = await deleteCategory(categoryId);
        if (success) {
          helper.notificationMessage('Xóa danh mục thành công!', 'success');
          fetchCategories();
          Modal.destroyAll();
        }
      },
      onCancel: () => Modal.destroyAll(),
      className: 'delete-modal',
      centered: true,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (category: GetAllCategoryResponseModel) => {
    setCategoryToEdit(category);
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      align: 'center' as const,
      render: (_: any, record: GetAllCategoryResponseModel) => (
        <div className="flex justify-center space-x-3">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          >
            <EditOutlined className="text-lg" />
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
            onClick={() => handleDeleteCategory(record.id)}
            title="Xóa"
          >
            <DeleteOutlined className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  // Calculate the current page data slice
  const startIndex = (currentPage - 1) * 10;
  const currentCategories = categories.slice(startIndex, startIndex + 10);

  return (
    <div className="category-table-container">
      <Spin spinning={loading} tip="Đang tải...">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <Table
            columns={columns}
            dataSource={currentCategories.map((category) => ({
              ...category,
              key: category.id,
            }))}
            pagination={false}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-gray-500">
                      {searchTerm
                        ? 'Không tìm thấy danh mục phù hợp'
                        : 'Chưa có danh mục nào'}
                    </span>
                  }
                />
              ),
            }}
            className="category-table"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
          {totalCategories > 0 && (
            <div className="py-4 px-6 border-t border-gray-100 bg-white">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCategories / 10)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Spin>

      <Modal
        title={
          <div className="text-xl font-semibold text-gray-800">
            Chỉnh sửa danh mục
          </div>
        }
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={600}
        className="edit-category-modal"
        centered
      >
        {categoryToEdit && (
          <EditCategory
            category={categoryToEdit}
            onEditSuccess={() => {
              fetchCategories();
              setIsEditModalVisible(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewCategory;
