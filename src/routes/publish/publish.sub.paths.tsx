import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================
import { MainLayout } from '../../layout/main-layout/main.layout';
const Login = lazy(() => import('../../pages/login'));
const Register = lazy(() => import('../../pages/register'));
const Home = lazy(() => import('../../pages/home'));
const ProductDetails = lazy(() => import('../../pages/public/product_detail/index.tsx'));
//======================================================
//export public sub paths

export const publicSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element: <MainLayout />, //main layout
      children: [
        {
          element: <Home />,
          path: ROUTER_URL.COMMON.HOME,
        },
        {
          element: <ProductDetails />,
          path: ROUTER_URL.COMMON.GET_PRODUCT_DETAIL_BY_SLUG,
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
};
