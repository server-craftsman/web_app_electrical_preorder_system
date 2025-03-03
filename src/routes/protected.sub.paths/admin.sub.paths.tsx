import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//import admin page
import DetailProducts from '../../components/admin/products/DetailProducts';
const Dashboard = lazy(() => import('../../pages/admin/overview/index'));
const Account = lazy(() => import('../../pages/admin/account/index'));
const AdminProduct = lazy(() => import('../../pages/admin/products/index'));
const AdminCategory = lazy(() => import('../../pages/admin/category/index'));
const StageHistory = lazy(
  () => import('../../pages/admin/stage_history/index')
);
const Campaign = lazy(() => import('../../pages/admin/campaign/index'));
const CampaignDetails = lazy(() => import('../../pages/admin/campaign/details'));
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
    {
      element: <DetailProducts />,
      path: ROUTER_URL.ADMIN.PRODUCT_DETAIL,
    },
    {
      element: <Campaign />,
      path: ROUTER_URL.ADMIN.CAMPAIGN,
    },
    {
      element: <CampaignDetails />,
      path: ROUTER_URL.ADMIN.CAMPAIGN_DETAIL,
    }
  ],
};
