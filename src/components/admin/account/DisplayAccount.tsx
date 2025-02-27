import { Table } from 'antd';
import Pagination from '../../pagination';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';

const Account = ({ refresh }: { refresh: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAll();
      setUsers(response.data.data.content as unknown as User[]);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]); // Fetch lại khi `refresh` thay đổi

  const columns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
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

  const data = users.map((user) => ({
    key: user.id,
    ...user,
  }));

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
