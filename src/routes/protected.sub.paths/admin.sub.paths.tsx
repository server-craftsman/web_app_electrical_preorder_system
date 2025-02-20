import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
//import admin page
import AdminLayout from '../../layout/admin/admin.layout';
import Dashboard from '../../pages/admin/overview';
import Account from '../../pages/admin/account';
import AdminProduct from '../../pages/admin/products';
import AdminCategory from '../../pages/admin/category';
import StageHistory from '../../pages/admin/stage_history';
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
          // path: ROUTER_URL.ADMIN.BASE,
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
