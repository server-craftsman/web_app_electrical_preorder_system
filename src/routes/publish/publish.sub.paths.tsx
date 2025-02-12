import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================
import { MainLayout } from '../../layout/main-layout/main.layout';
const  AdminLayout = lazy (() => import('../../layout/admin/admin.layout'));
const Login = lazy(() => import('../../pages/login/login'));
const Register = lazy(() => import('../../pages/register/register'));
const Home = lazy(() => import('../../pages/home/home'));
const Dashboard = lazy(() => import('../../pages/dashboard/dashboard'));

//======================================================
//export public sub paths


export const publicSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element: <MainLayout />, //main layout
      children: [
        {
          path: ROUTER_URL.COMMON.HOME,
          element: <Home /> // children
        },
       
      ],
    },
  ],
  [ROUTER_URL.LOGIN]: [
    {
      element: <Login />,
      path: ROUTER_URL.LOGIN
    }
  ],
  [ROUTER_URL.REGISTER]: [
    {
      element: <Register />,
      path: ROUTER_URL.REGISTER
    }
  ],
  [ROUTER_URL.ADMIN.BASE]: [
    {
      element: <AdminLayout />,
      children: [
        {
          element: <Dashboard/>,
          path: ROUTER_URL.ADMIN.BASE,
        },
        {
          element: <h1>Account</h1>,
          path: ROUTER_URL.ADMIN.ACCOUNT,
        },
        {
          element: <h1>Product</h1>,
          path: ROUTER_URL.ADMIN.PRODUCT,
        },
        {
          element: <h1>Category</h1>,
          path: ROUTER_URL.ADMIN.CATEGORY,
        },
        {
          element: <h1>History</h1>,
          path: ROUTER_URL.ADMIN.HISTORY,
        }
      ]
    }
  ]
};
