import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import Layout from '../components/Global';
import CareerMobile from '../components/CareerMobile';
import CareerDesktop from '../components/CareerDesktop';

const Career = ({ match: { url, params } }) => (
  <Layout url={url}>
    <Hidden xlUp smDown>
      <CareerDesktop params={params} />
    </Hidden>

    <Hidden mdUp>
      <CareerMobile params={params} />
    </Hidden>
  </Layout>
);

export default Career;
