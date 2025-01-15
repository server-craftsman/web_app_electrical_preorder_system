import { lazy } from 'react';
import { ROUTER_URL } from '../../const/router.path';
import { RouteObject } from 'react-router-dom';

//================= PUBLIC SUB PATHS =================
import { MainLayout } from '../../layout/main-layout/main.layout';
import  Login  from '../../pages/login/login'
import  Register  from '../../pages/register/register'
import Home from '../../pages/home/home'
//======================================================
//export public sub paths

export const publicSubPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element: <MainLayout />, //main layout
      children: [
        {
          path: ROUTER_URL.COMMON.HOME,
          element: <Home /> // children
        },
       
      ],
    },
  ],
  [ROUTER_URL.LOGIN]: [
    {
      element: <Login />,
      path: ROUTER_URL.LOGIN
    }
  ],
  [ROUTER_URL.REGISTER]: [
    {
      element: <Register />,
      path: ROUTER_URL.REGISTER
    }
  ]
};
