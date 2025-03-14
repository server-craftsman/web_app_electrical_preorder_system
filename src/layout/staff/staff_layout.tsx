import { Link, Outlet } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import StaffNavbar from './staff.navbar';
import { Footer } from '../main-layout/footer';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContexts';
const { Header, Content } = Layout;

const StaffLayout = () => {
  const { logout, getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: <Link to="/staff/profile">Hồ sơ</Link>,
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
      <Layout className="flex-1 flex flex-row">
        <StaffNavbar />
        <Layout className="flex-1 flex flex-col">
          <Header className="bg-white flex justify-end items-center px-8 shadow-lg">
            <div className="flex items-center gap-6">
              {user && (
                <Dropdown menu={userMenu} placement="bottomRight" arrow={true}>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar
                      src={user.sub || 'https://i.pravatar.cc/40'}
                      icon={<UserOutlined />}
                      size="large"
                    />
                    <span className="font-semibold text-lg">
                      {user.fullName}
                    </span>
                  </div>
                </Dropdown>
              )}
            </div>
          </Header>
          <Content className="bg-gray-100 p-10 flex-1">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default StaffLayout;
