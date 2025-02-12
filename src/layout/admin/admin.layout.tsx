import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import AdminNavbar from './admin.navbar';
import { Footer } from '../main-layout/footer';
import { UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
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

  const userMenu = (
    <ul className="bg-white shadow-md p-2 rounded-md w-40">
      <li className="py-2 px-4 hover:bg-gray-200">
        <Link to="/profile">Hồ sơ</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
        Đăng xuất
      </li>
    </ul>
  );

  return (
    <Layout className="min-h-screen flex flex-col">
      <Layout className="flex flex-row">
        <AdminNavbar />
        <Layout className="flex-1">
          <Header className="bg-white flex justify-end items-center px-6 shadow-md">
            <div className="flex items-center gap-4">
              {user && (
                <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar src={user.avatar} icon={<UserOutlined />} />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </Dropdown>
              )}
            </div>
          </Header>
          <Content className="bg-gray-100 p-8">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default AdminLayout;
