import React from "react";

import Layout from "../components/Global";
import Index from "../components/Home";

const Home = ({ match: { url } }) => (
  <Layout url={url}>
    <Index />
  </Layout>
);

export default Home;
