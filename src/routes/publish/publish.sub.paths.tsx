import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================
import { MainLayout } from '../../layout/main-layout/main.layout';
const AboutPage = lazy(() => import('../../pages/customer/about'));
const GuidePage = lazy(() => import('../../pages/customer/guide'));
const ProductsPage = lazy(() => import('../../pages/publish/products'));
const Login = lazy(() => import('../../pages/login'));
const Register = lazy(() => import('../../pages/register'));
const Home = lazy(() => import('../../pages/home'));
const ProductDetails = lazy(
  () => import('../../pages/publish/product_details')
);
const VerifyAccount = lazy(() => import('../../pages/verify/VerifyAccount'));
const CartDetails = lazy(
  () => import('../../pages/publish/cart_details/index')
);
const Checkout = lazy(() => import('../../pages/publish/check_out/index'));
const PaymentSuccess = lazy(
  () => import('../../pages/publish/check_out/testcheckout')
);
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
          element: <ProductsPage />,
          path: ROUTER_URL.COMMON.PRODUCT,
        },
        {
          element: <ProductDetails />,
          path: ROUTER_URL.COMMON.GET_PRODUCT_DETAIL_BY_SLUG,
        },
        {
          element: <CartDetails />,
          path: ROUTER_URL.COMMON.ADD_TO_CART,
        },
        {
          path: ROUTER_URL.COMMON.ABOUT,
          element: <AboutPage />,
        },
        {
          path: ROUTER_URL.COMMON.GUIDE,
          element: <GuidePage />,
        },
      ],
    },
  ],
  [ROUTER_URL.LOGIN]: [
    {
      element: <Login />,
      path: ROUTER_URL.LOGIN,
    },
    {
      element: <VerifyAccount />,
      path: '/verify',
    },
  ],
  [ROUTER_URL.REGISTER]: [
    {
      element: <Register />,
      path: ROUTER_URL.REGISTER,
    },
  ],
  [ROUTER_URL.COMMON.CHECKOUT]: [
    {
      element: <Checkout />,
      path: ROUTER_URL.COMMON.CHECKOUT,
    },
  ],
  [ROUTER_URL.COMMON.PAYMENTS]: [
    {
      element: <PaymentSuccess />,
      path: ROUTER_URL.COMMON.PAYMENTS,
    },
  ],
};
