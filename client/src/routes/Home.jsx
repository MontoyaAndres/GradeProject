import React from "react";

import Layout from "../components/Global";
import Index from "../components/Home";

const Home = ({ match: { url }, typeUser }) => (
  <Layout url={url} typeUser={typeUser}>
    <Index typeUser={typeUser} />
  </Layout>
);

export default Home;
