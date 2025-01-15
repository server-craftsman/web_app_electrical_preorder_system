import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';
//import admin page

//======================================================

//export admin sub paths
export const adminSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.ADMIN.BASE]: [
    {
      index: true,
      element: <h1>Admin</h1>,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.BASE,
      element: <h1>Courses</h1>,
    },
  ],
};
