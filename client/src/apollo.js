import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import config from './config.json';

const httpLink = createUploadLink({ uri: config.GRAPHQL_SERVER_URL });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  })
);

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export default new ApolloClient({
  link,
  ssrMode: true,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100
});
