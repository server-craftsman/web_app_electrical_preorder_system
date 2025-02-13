import { Table } from 'antd';
import { useState } from 'react';
import Pagination from '../../pagination';
import { CustomEditIcon, CustomDeleteIcon } from './Icons';

const ViewCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const data = [
    {
      key: '1',
      name: 'Electronics',
      description: 'Devices and gadgets',
    },
    {
      key: '2',
      name: 'Furniture',
      description: 'Home and office furniture',
    },
    // Add more data as needed
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / 10)}
            onPageChange={setCurrentPage}
          />
        )}
      />
    </div>
  );
};

export default ViewCategory;
