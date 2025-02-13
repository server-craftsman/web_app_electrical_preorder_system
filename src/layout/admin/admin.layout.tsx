import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import AdminNavbar from './admin.navbar';
import { Footer } from '../main-layout/footer';
import { UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const mockUser = {
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/40',
    };
    setUser(mockUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: <Link to="/profile">Hồ sơ</Link>,
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout className="min-h-screen flex flex-col">
      <Layout className="flex flex-row">
        <AdminNavbar />
        <Layout className="flex-1">
          <Header className="bg-white flex justify-end items-center px-8 shadow-lg">
            <div className="flex items-center gap-6">
              {user && (
                <Dropdown menu={userMenu} placement="bottomRight" arrow={true}>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar
                      src={user.avatar}
                      icon={<UserOutlined />}
                      size="large"
                    />
                    <span className="font-semibold text-lg">{user.name}</span>
                  </div>
                </Dropdown>
              )}
            </div>
          </Header>
          <Content className="bg-gray-100 p-10">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default AdminLayout;
