import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Pagination from '../../pagination';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';

interface DisplayCategoryProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
}

const DisplayCategory = ({
  refresh,
  searchTerm,
  refreshKey,
}: DisplayCategoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>(
    []
  );
  const [totalCategories, setTotalCategories] = useState(0);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
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
    </div>
  );
};

export default DisplayCategory;
