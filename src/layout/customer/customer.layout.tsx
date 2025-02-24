import { Link, Outlet } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { Footer } from '../main-layout/footer';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContexts';
import CustomerNavbar from './customer.navbar';
import logo1 from '../../assets/Elecee_logo.jpg';

const { Header, Content } = Layout;

const CustomerLayout = () => {
  const { logout, getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
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
        <Layout className="flex-1">
          <Header className="bg-white flex justify-between items-center px-8 shadow-lg">

            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img
                src={logo1}
                alt="Eureka Logo"
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text tracking-tight">
                Elecee
              </span>
            </Link>


            <div className="ml-auto flex items-center gap-6">
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

          <div className="flex flex-row py-16 ml-16">
            <CustomerNavbar />

            <Content className="bg-gray-100 p-10 flex-1">
              <Outlet />
            </Content>
          </div>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default CustomerLayout;
