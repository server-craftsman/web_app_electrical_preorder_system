import { lazy } from 'react';

import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
//import admin page
const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));
const Dashboard = lazy(() => import('../../pages/admin/overview/index'));
const Account = lazy(() => import('../../pages/admin/account/index'));
const AdminProduct = lazy(() => import('../../pages/admin/products/index'));
const AdminCategory = lazy(() => import('../../pages/admin/category/index'));
const StageHistory = lazy(
  () => import('../../pages/admin/stage_history/index')
);
//======================================================

//export admin sub paths
export const adminSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.ADMIN.BASE]: [
        {
          index: true,
          element: <Dashboard />,
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
};
