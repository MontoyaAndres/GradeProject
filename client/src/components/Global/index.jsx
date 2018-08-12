import React, { Fragment } from "react";

import Menu from "./Menu/index";

const Layout = ({ children, url, typeUser }) => (
  <Fragment>
    <Menu url={url} typeUser={typeUser} />
    {children}
  </Fragment>
);

export default Layout;
