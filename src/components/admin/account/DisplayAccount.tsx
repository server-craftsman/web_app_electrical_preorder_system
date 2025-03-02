import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Pagination from '../../pagination';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';
import { helper } from '../../../utils';

const Account = ({ refresh, searchTerm }: { refresh: boolean; searchTerm: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAll({ searchTerm: searchTerm || '' });
      setUsers(response.data.data.content as unknown as User[]);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh, searchTerm]); // Fetch again when `refresh` or `searchTerm` changes

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
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => {
        return (
          <span className={helper.formatRoleAccountColor(text)}>{text}</span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <button
          className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700"
          // onClick={() => handleDeleteProduct(record.slug)}
        >
          <DeleteOutlined className="text-xl" />
        </button>
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
