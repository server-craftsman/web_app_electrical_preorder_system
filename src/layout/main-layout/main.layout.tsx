import React, { lazy, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Header } from './header';
import { Footer } from './footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
