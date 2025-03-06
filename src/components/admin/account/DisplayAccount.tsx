import { Modal, Table, Tabs } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Pagination from '../../pagination';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';
import { helper } from '../../../utils';
import { ROUTER_URL } from '../../../const';
import { useNavigate } from 'react-router-dom';

const Account = ({ refresh, searchTerm }: { refresh: boolean; searchTerm: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [activeKey, setActiveKey] = useState('1'); // State lưu tab hiện tại

  const navigate = useNavigate();

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
  }, [refresh, searchTerm]);

  // Hàm xóa tài khoản
  const deleteAccount = async (userId: string) => {
    try {
      await UserService.delete(userId);
      helper.notificationMessage('Xóa tài khoản thành công!', 'success');
      fetchUsers(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error);
      helper.notificationMessage('Xóa tài khoản thất bại!', 'error');
    }
  };

  const handleDeleteAccount = (userId: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa tài khoản này?',
      onOk: () => deleteAccount(userId),
      onCancel: () => Modal.destroyAll(),
    });
  };

  // Cột chung cho cả hai tab
  const baseColumns = [
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span className={text === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>
          {text}
        </span>
      ),
    },
  ];

  // Cột "Hành động" chỉ hiển thị trong tab "Tài khoản hoạt động"
  const actionColumn = {
    title: 'Hành động',
    key: 'action',
    render: (_: any, record: User) => (
      <span className="flex space-x-2">
        <button
            className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700"
            onClick={() =>
              navigate(ROUTER_URL.ADMIN.ACCOUNT_DETAIL.replace(':id', record.id))
            }
          >
            <EyeOutlined className="text-xl" />
          </button>
      <button
        className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700"
        onClick={() => handleDeleteAccount(record.id)}
      >
        <DeleteOutlined className="text-xl" />
      </button>
      </span>
    ),
  };

  const notactionColumns = {
    title: 'Hành động',
    key: 'action',
    render: (_: any, record: User) => (
      <button
        className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700"
        onClick={() =>
          navigate(ROUTER_URL.ADMIN.ACCOUNT_DETAIL.replace(':id', record.id))
        }
      >
        <EyeOutlined className="text-xl" />
      </button>
    ),
  }
  // Nếu đang ở tab "Tài khoản hoạt động", thêm cột "Hành động"
  const columns = activeKey === '1' ? [...baseColumns, actionColumn] : [...baseColumns, notactionColumns];

  const activeUsers = users.filter((user) => user.status === 'ACTIVE');
  const inactiveUsers = users.filter((user) => user.status === 'INACTIVE');

  return (
    <Tabs defaultActiveKey="1" onChange={setActiveKey}>
      <Tabs.TabPane tab="Tài khoản hoạt động" key="1">
        <Table
          columns={columns}
          dataSource={activeUsers.map((user) => ({ key: user.id, ...user }))}
          pagination={false}
          footer={() => (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(activeUsers.length / 10)}
              onPageChange={setCurrentPage}
            />
          )}
        />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Tài khoản không hoạt động" key="2">
        <Table
          columns={columns}
          dataSource={inactiveUsers.map((user) => ({ key: user.id, ...user }))}
          pagination={false}
          footer={() => (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(inactiveUsers.length / 10)}
              onPageChange={setCurrentPage}
            />
          )}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Account;
