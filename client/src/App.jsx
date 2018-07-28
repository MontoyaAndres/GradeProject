import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Offline, Online } from 'react-detect-offline';

import Routes from './routes';
import client from './apollo';
import NoInternet from './utils/NoInternet';

const App = () => (
  <Fragment>
    <Online>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </Online>
    <Offline>
      <NoInternet />
    </Offline>
  </Fragment>
);

export default App;
