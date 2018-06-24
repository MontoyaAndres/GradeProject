import React from 'react';

import Layout from '../components/Global';
import Index from '../components/Home';

const Home = ({ match: { path } }) => (
  <Layout path={path}>
    <Index />
  </Layout>
);

export default Home;
