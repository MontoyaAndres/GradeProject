import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { unregister } from '../../../registerServiceWorker';

export default () => (
  <ApolloConsumer>
    {client => {
      client.resetStore();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      unregister();
      return <Redirect to="/login" />;
    }}
  </ApolloConsumer>
);
