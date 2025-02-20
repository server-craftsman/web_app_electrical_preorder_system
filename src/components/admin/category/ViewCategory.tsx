import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Pagination from '../../pagination';
import { CustomEditIcon, CustomDeleteIcon } from './Icons';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';

const ViewCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll({});
        if (Array.isArray(response.data?.data)) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
      render: () => (
        <span className="flex space-x-2">
          <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
            <CustomEditIcon />
          </button>
          <button className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700">
            <CustomDeleteIcon />
          </button>
        </span>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={false}
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(categories.length / 10)}
            onPageChange={setCurrentPage}
          />
        )}
      />
    </div>
  );
};

export default ViewCategory;
