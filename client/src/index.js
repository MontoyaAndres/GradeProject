import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Offline, Online } from 'react-detect-offline';
import registerServiceWorker from './registerServiceWorker';

import Routes from './routes';
import client from './apollo';

const App = (
  <Fragment>
    <Online>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </Online>
    <Offline>No hay internet</Offline>
  </Fragment>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
