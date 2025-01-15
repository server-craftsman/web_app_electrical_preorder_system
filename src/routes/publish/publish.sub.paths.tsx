import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================

//======================================================
//export public sub paths
export const publicSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element: <h1 className="text-3xl font-bold">Home</h1>, //main layout
      children: [
        {
          path: ROUTER_URL.COMMON.HOME,
          element: <h1>Home</h1>, // children
        },
      ],
    },
  ],
};
