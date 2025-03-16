import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
import Account from '../../pages/staff/account';
import PreOrder from '../../pages/staff/pre-oder';
import StageHistory from '../../pages/staff/stage_history';
import Order from '../../pages/staff/order';
import Dashboard from '../../pages/staff/overview';
import Profile from '../../pages/staff/profile';
import Category from '../../pages/staff/category';
import Product from '../../pages/staff/product';
import DetailProduct from '../../components/staff/product/DetailProduct';
// Import staff pages

//======================================================

//export staff sub paths
export const staffSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.STAFF.BASE]: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      element: <Account />,
      path: ROUTER_URL.STAFF.ACCOUNT,
    },
    {
      element: <StageHistory />,
      path: ROUTER_URL.STAFF.HISTORY,
    },
    {
      element: <Order />,
      path: ROUTER_URL.STAFF.ORDERS,
    },
    {
      element: <PreOrder />,
      path: ROUTER_URL.STAFF.PREORDER,
    },
    {
      element: <Profile />,
      path: ROUTER_URL.STAFF.PROFILE,
    },
    {
      element: <Category />,
      path: ROUTER_URL.STAFF.CATEGORY,
    },
    {
      element: <Product />,
      path: ROUTER_URL.STAFF.PRODUCT,
    },
    {
      element: <DetailProduct />,
      path: ROUTER_URL.STAFF.PRODUCT_DETAIL,
    },
  ],
};
