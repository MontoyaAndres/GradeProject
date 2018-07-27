import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Offline, Online } from 'react-detect-offline';

import Routes from './routes';
import client from './apollo';

const App = () => (
  <Fragment>
    <Online>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </Online>
    <Offline>No hay internet</Offline>
  </Fragment>
);

export default App;
