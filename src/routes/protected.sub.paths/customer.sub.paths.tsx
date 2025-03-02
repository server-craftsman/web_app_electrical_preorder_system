import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import AboutPage from '../../pages/customer/about';
import GuidePage from '../../pages/customer/guide';

//import customer pages
const Overview = lazy(() => import('../../pages/customer/overview/index'));
const Profile = lazy(() => import('../../pages/customer/profile/index'));
const Order = lazy(() => import('../../pages/customer/order/index'));
const ReturnOrder = lazy(
  () => import('../../pages/customer/return_order/index')
);
const ChangePassword = lazy(
  () => import('../../pages/customer/change_password/index')
);

//======================================================

//export customer sub paths
export const customerSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.CUSTOMER.BASE]: [
    {
      index: true,
      element: <Overview />,
    },
    {
      path: ROUTER_URL.CUSTOMER.PROFILE,
      element: <Profile />,
    },
    {
      path: ROUTER_URL.CUSTOMER.ORDERS,
      element: <Order />,
    },
    {
      path: ROUTER_URL.CUSTOMER.ABOUT,
      element: <AboutPage />,
    },
    {
      path: ROUTER_URL.CUSTOMER.GUIDE,
      element: <GuidePage />,
    },
    {
      path: ROUTER_URL.CUSTOMER.RETURN_ORDER,
      element: <ReturnOrder />,
    },
    {
      path: ROUTER_URL.CUSTOMER.CHANGE_PASSWORD,
      element: <ChangePassword />,
    },
  ],
};
