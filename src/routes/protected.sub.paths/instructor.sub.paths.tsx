import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

// Import instructor pages

//======================================================

//export instructor sub paths
export const instructorSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.INSTRUCTOR.BASE]: [
    {
      index: true,
      element: <h1>Instructor</h1>,
    },
    {
      path: ROUTER_URL.INSTRUCTOR.BASE,
      element: <h1>Courses</h1>,
    },
  ],
};
