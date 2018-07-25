import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Redirect } from 'react-router-dom';

export default () => (
  <ApolloConsumer>
    {client => {
      client.resetStore();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return <Redirect to="/login" />;
    }}
  </ApolloConsumer>
);
