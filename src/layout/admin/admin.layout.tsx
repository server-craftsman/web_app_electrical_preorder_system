import { Link, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const AdminLayout = () => {
  return (
    <Layout>
      <Layout>
        <Content>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
            </ul>
          </nav>
        </header>
        <section>
          <Outlet />
        </section>
      </Content>
      <footer>
        <p>Footer</p>
      </footer>
    </Layout>
    </Layout>
  );
};

export default AdminLayout;