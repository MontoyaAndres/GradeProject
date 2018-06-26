import React, { Fragment } from 'react';
import Menu from './Menu/index';

const Layout = ({ children, url }) => (
  <Fragment>
    <Menu url={url} />
    {children}
  </Fragment>
);

export default Layout;
