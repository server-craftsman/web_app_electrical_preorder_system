import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================
import { MainLayout } from '../../layout/main-layout/main.layout';

const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));
const Login = lazy(() => import('../../pages/login'));
const Register = lazy(() => import('../../pages/register'));
const Home = lazy(() => import('../../pages/home'));
const Dashboard = lazy(() => import('../../pages/admin/overview'));
const AdminCategory = lazy(() => import('../../pages/admin/category'));
const AdminProduct = lazy(() => import('../../pages/admin/products'));
const Account = lazy(() => import('../../pages/admin/account'));
const StageHistory = lazy(() => import('../../pages/admin/stage_history'));
//======================================================
//export public sub paths

export const publicSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element: <MainLayout />, //main layout
      children: [
        {
          path: ROUTER_URL.COMMON.HOME,
          element: <Home />, // children
        },
      ],
    },
  ],
  [ROUTER_URL.LOGIN]: [
    {
      element: <Login />,
      path: ROUTER_URL.LOGIN,
    },
  ],
  [ROUTER_URL.REGISTER]: [
    {
      element: <Register />,
      path: ROUTER_URL.REGISTER,
    },
  ],
  [ROUTER_URL.ADMIN.BASE]: [
    {
      element: <AdminLayout />,
      children: [
        {
          element: <Dashboard />,
          path: ROUTER_URL.ADMIN.BASE,
        },
        {
          element: <Account />,
          path: ROUTER_URL.ADMIN.ACCOUNT,
        },
        {
          element: <AdminProduct />,
          path: ROUTER_URL.ADMIN.PRODUCT,
        },
        {
          element: <AdminCategory />,
          path: ROUTER_URL.ADMIN.CATEGORY,
        },
        {
          element: <StageHistory />,
          path: ROUTER_URL.ADMIN.HISTORY,
        },
      ],
    },
  ],
};
