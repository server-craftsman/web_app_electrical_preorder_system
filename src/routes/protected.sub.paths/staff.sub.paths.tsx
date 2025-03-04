import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
import Account from '../../pages/staff/account';
import PreOrder from '../../pages/staff/pre-oder';
import StageHistory from '../../pages/staff/stage_history';
import Order from '../../pages/staff/order';
import Dashboard from '../../pages/staff/overview';
import Profile from '../../pages/staff/profile';
import Category from '../../pages/staff/category';
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
      path: ROUTER_URL.STAFF.PROFILE
    },
    {
      element: <Category />,
      path: ROUTER_URL.STAFF.CATEGORY
    }
  ],
};
