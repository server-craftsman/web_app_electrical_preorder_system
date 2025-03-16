import { Link, Outlet } from 'react-router-dom';
import { Layout, Avatar, Dropdown, Spin } from 'antd';
import AdminNavbar from './admin.navbar';
import { Footer } from '../main-layout/footer';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContexts';
import { UserService } from '../../services/user/user.service';
import { useEffect, useState } from 'react';
import { User } from '../../models/modules/User';
import { ROUTER_URL } from '../../const';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const { logout, getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser?.id) {
        setLoading(true);
        try {
          const response = await UserService.getById(currentUser.id);
          if (response && response.data) {
            const userData = response.data?.data || response.data;
            setUserProfile(userData);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser?.id]);

  const toggleDropdown = (flag: boolean) => {
    setIsDropdownOpen(flag);
  };

  const getAvatar = () => {
    return userProfile?.avatar || '';
  };

  return (
    <Layout className="min-h-screen flex flex-col">
      <Layout className="flex flex-row">
        <AdminNavbar />
        <Layout className="flex-1">
          <Header className="bg-white flex justify-end items-center px-8 shadow-lg">
            <div className="flex items-center gap-6">
              {currentUser && (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'userInfo',
                        label: (
                          <div className="px-4 py-3 flex items-center space-x-3 border-b border-gray-100">
                            <Avatar
                              src={getAvatar()}
                              icon={<UserOutlined />}
                              size={40}
                              className="border border-gray-200"
                            />
                            <div>
                              <div className="font-medium">
                                {userProfile?.fullname || currentUser?.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {userProfile?.phoneNumber || '0869872830'}
                              </div>
                            </div>
                          </div>
                        ),
                        style: { padding: 0 },
                      },
                      {
                        key: 'profile',
                        label: (
                          <Link
                            to={ROUTER_URL.ADMIN.PROFILE}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span>Thông tin tài khoản</span>
                          </Link>
                        ),
                      },
                      {
                        key: 'logout',
                        label: (
                          <button
                            onClick={logout}
                            className="w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors rounded"
                          >
                            Đăng xuất
                          </button>
                        ),
                        style: { padding: '0 16px', marginTop: '8px' },
                      },
                    ],
                  }}
                  placement="bottomRight"
                  arrow={true}
                  open={isDropdownOpen}
                  onOpenChange={toggleDropdown}
                  trigger={['click']}
                >
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full transition-all duration-200">
                    {loading ? (
                      <Spin size="small" />
                    ) : (
                      <Avatar
                        src={getAvatar()}
                        icon={<UserOutlined />}
                        size="default"
                        className="border border-gray-200"
                      />
                    )}
                    <span className="font-medium text-gray-800">
                      {userProfile?.fullname || currentUser?.fullName}
                    </span>
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
