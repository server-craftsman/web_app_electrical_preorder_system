import { Table } from 'antd';
import Pagination from '../../pagination';
import { useState } from 'react';

const Account = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span className="flex space-x-3">
          <button className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18.75A2.25 2.25 0 0 0 8.25 21h7.5A2.25 2.25 0 0 0 18 18.75V7.5H6v11.25zM9.75 3.75h4.5m-4.5 0a.75.75 0 0 0-.75.75v.75h6v-.75a.75.75 0 0 0-.75-.75h-4.5zM9 10.5v6m3-6v6m3-6v6"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Thịt 3 Chỉ',
      email: 'khoabachibeo@gmail.com',
    },
    {
      key: '2',
      name: 'Thịt 3 Chỉ',
      email: 'khoabachibeo@gmail.com',
    },
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

export default Account;
