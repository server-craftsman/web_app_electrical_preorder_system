import { Modal, Table, Tabs, Empty, Spin } from 'antd';
import {
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Pagination from '../../pagination';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';
import { helper } from '../../../utils';
import { ROUTER_URL } from '../../../const';
import { useNavigate } from 'react-router-dom';

const Account = ({
  refresh,
  searchTerm,
}: {
  refresh: boolean;
  searchTerm: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getAll({
        searchTerm: searchTerm || '',
        page: currentPage - 1,
        size: 10,
      });
      setUsers(response.data.data.users as unknown as User[]);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh, searchTerm]);

  const deleteAccount = async (userId: string) => {
    try {
      await UserService.delete(userId);
      helper.notificationMessage('Xóa tài khoản thành công!', 'success');
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error);
      helper.notificationMessage('Xóa tài khoản thất bại!', 'error');
    }
  };

  const handleDeleteAccount = (userId: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined className="text-amber-500" />,
      content: (
        <div className="py-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xóa tài khoản này?
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
      onOk: () => deleteAccount(userId),
      onCancel: () => Modal.destroyAll(),
      className: 'delete-modal',
      centered: true,
    });
  };

  const baseColumns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text: string) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            text === 'ACTIVE'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {text === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      ),
    },
  ];

  const actionColumn = {
    title: 'Hành động',
    key: 'action',
    width: 150,
    align: 'center' as const,
    render: (_: any, record: User) => (
      <div className="flex justify-center space-x-3">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
          onClick={() =>
            navigate(ROUTER_URL.ADMIN.ACCOUNT_DETAIL.replace(':id', record.id))
          }
          title="Xem chi tiết"
        >
          <EyeOutlined className="text-lg" />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
          onClick={() => handleDeleteAccount(record.id)}
          title="Xóa"
        >
          <DeleteOutlined className="text-lg" />
        </button>
      </div>
    ),
  };

  const viewOnlyColumn = {
    title: 'Hành động',
    key: 'action',
    width: 100,
    align: 'center' as const,
    render: (_: any, record: User) => (
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
          onClick={() =>
            navigate(ROUTER_URL.ADMIN.ACCOUNT_DETAIL.replace(':id', record.id))
          }
          title="Xem chi tiết"
        >
          <EyeOutlined className="text-lg" />
        </button>
      </div>
    ),
  };

  const columns =
    activeKey === '1'
      ? [...baseColumns, actionColumn]
      : [...baseColumns, viewOnlyColumn];

  const activeUsers = users.filter((user) => user.status === 'ACTIVE');
  const inactiveUsers = users.filter((user) => user.status === 'INACTIVE');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <Tabs
        defaultActiveKey="1"
        onChange={setActiveKey}
        className="account-tabs"
        tabBarStyle={{
          padding: '0 24px',
          marginBottom: 0,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Tabs.TabPane
          tab={
            <span className="px-1 py-4 inline-block font-medium">
              Tài khoản hoạt động
              {activeUsers.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                  {activeUsers.length}
                </span>
              )}
            </span>
          }
          key="1"
        >
          <Spin spinning={loading} tip="Đang tải...">
            <div className="overflow-hidden">
              <Table
                columns={columns}
                dataSource={activeUsers.map((user) => ({
                  key: user.id,
                  ...user,
                }))}
                pagination={false}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span className="text-gray-500">
                          {searchTerm
                            ? 'Không tìm thấy tài khoản phù hợp'
                            : 'Chưa có tài khoản nào'}
                        </span>
                      }
                    />
                  ),
                }}
                className="account-table"
                rowClassName="hover:bg-gray-50 transition-colors"
              />
              {activeUsers.length > 0 && (
                <div className="py-4 px-6 border-t border-gray-100 bg-white">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(activeUsers.length / 10)}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </Spin>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span className="px-1 py-4 inline-block font-medium">
              Tài khoản không hoạt động
              {inactiveUsers.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full">
                  {inactiveUsers.length}
                </span>
              )}
            </span>
          }
          key="2"
        >
          <Spin spinning={loading} tip="Đang tải...">
            <div className="overflow-hidden">
              <Table
                columns={columns}
                dataSource={inactiveUsers.map((user) => ({
                  key: user.id,
                  ...user,
                }))}
                pagination={false}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span className="text-gray-500">
                          {searchTerm
                            ? 'Không tìm thấy tài khoản phù hợp'
                            : 'Chưa có tài khoản nào'}
                        </span>
                      }
                    />
                  ),
                }}
                className="account-table"
                rowClassName="hover:bg-gray-50 transition-colors"
              />
              {inactiveUsers.length > 0 && (
                <div className="py-4 px-6 border-t border-gray-100 bg-white">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(inactiveUsers.length / 10)}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </Spin>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Account;
