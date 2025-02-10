import { Link, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import AdminNavbar from './admin.navbar';
import { Footer } from '../main-layout/footer';

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Layout className="flex flex-row">
        <AdminNavbar />
        <Content className="flex-1 bg-gray-100 p-8">
          <header className="mb-6">
            <nav className="flex gap-4">
              <Link to="/" className="text-blue-600 hover:underline">Home</Link>
              <Link to="/" className="text-blue-600 hover:underline">Link</Link>
            </nav>
          </header>
          <section>
            <Outlet />
          </section>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default AdminLayout;
