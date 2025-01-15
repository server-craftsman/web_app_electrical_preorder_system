import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//import student pages

//======================================================

//export student sub paths
export const studentSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.STUDENT.BASE]: [
    {
      index: true,
      element: <h1>Student</h1>,
    },
    {
      path: ROUTER_URL.STUDENT.BASE,
      element: <h1>Courses</h1>,
    },
  ],
};
