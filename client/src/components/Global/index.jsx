import React, { Fragment } from 'react';
import Menu from './Menu';

const Layout = ({ children, path }) => (
  <Fragment>
    <Menu path={path} />
    {children}
  </Fragment>
);

export default Layout;
