import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//import customer pages

//======================================================

//export customer sub paths
export const customerSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.CUSTOMER.BASE]: [
    {
      index: true,
      element: <h1>Customer</h1>,
    },
    {
      path: ROUTER_URL.CUSTOMER.BASE,
      element: <h1>Courses</h1>,
    },
  ],
};
