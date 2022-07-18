import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '.';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
      <Outlet />
    </div>
  );
};

export default Layout;
