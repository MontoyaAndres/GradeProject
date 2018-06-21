import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import withRoot from '../utils/withRoot';
import Home from './Home';
import Register from './Register';
import Login from './Login';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)}
  />
);

const IsLogin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      'token' in localStorage || 'refreshToken' in localStorage ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <IsLogin path="/registrar" exact component={Register} />
      <IsLogin path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);

export default withRoot(Router);
