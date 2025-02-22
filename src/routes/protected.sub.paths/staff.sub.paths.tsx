import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

// Import staff pages

//======================================================

//export staff sub paths
export const staffSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.STAFF.BASE]: [
    {
      index: true,
      element: <h1>Stafffffff</h1>,
    },
    {
      path: ROUTER_URL.STAFF.BASE,
      element: <h1>Courses</h1>,
    },
  ],
};
