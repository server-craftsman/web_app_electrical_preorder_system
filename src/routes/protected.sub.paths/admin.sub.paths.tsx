import { lazy } from 'react';

import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
//import admin page
const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));
const Dashboard = lazy(() => import('../../pages/admin/overview'));
const Account = lazy(() => import('../../pages/admin/account'));
const AdminProduct = lazy(() => import('../../pages/admin/products'));
const AdminCategory = lazy(() => import('../../pages/admin/category'));
const StageHistory = lazy(() => import('../../pages/admin/stage_history'));
//======================================================

//export admin sub paths
export const adminSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.ADMIN.BASE]: [
    {
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          index: false,
          element: <Account />,
          path: ROUTER_URL.ADMIN.ACCOUNT,
        },
        {
          index: false,
          element: <AdminProduct />,
          path: ROUTER_URL.ADMIN.PRODUCT,
        },
        {
          index: false,
          element: <AdminCategory />,
          path: ROUTER_URL.ADMIN.CATEGORY,
        },
        {
          index: false,
          element: <StageHistory />,
          path: ROUTER_URL.ADMIN.HISTORY,
        },
      ],
    },
  ],
};
