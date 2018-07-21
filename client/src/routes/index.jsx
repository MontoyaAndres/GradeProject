import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Loadable from 'react-loadable';

import withRoot from '../utils/withRoot';
import Logout from '../components/Global/Menu/Logout.jsx';
import Error404 from './Error404';
import LoadingRoute from './LoadingRoute';

import SelectData from '../utils/SelectData';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

function isExactCareer(url) {
  const URL = url.split('/')[2];
  const findURL = SelectData.Carreras.find(carrera => carrera === URL);
  // To see if the url exists in the array
  if (findURL === URL) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <Logout />)} />
);

const IsLogin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Redirect to={{ pathname: '/' }} /> : <Component {...props} />)}
  />
);

const ExactCareer = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isExactCareer(props.match.url) ? <PrivateRoute {...props} component={Component} /> : <Error404 />
    }
  />
);

const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: () => <LoadingRoute />
});

const AsyncCareer = Loadable({
  loader: () => import('./Career'),
  loading: () => <LoadingRoute />
});

const AsyncStudentInformation = Loadable({
  loader: () => import('./StudentInformation'),
  loading: () => <LoadingRoute />
});

const AsyncUpdateStudent = Loadable({
  loader: () => import('./UpdateStudent'),
  loading: () => <LoadingRoute />
});

const AsyncGraphics = Loadable({
  loader: () => import('./Graphics'),
  loading: () => <LoadingRoute />
});

const AsyncConfiguration = Loadable({
  loader: () => import('./Configuration'),
  loading: () => <LoadingRoute />
});

const AsyncLogin = Loadable({
  loader: () => import('./Login'),
  loading: () => <LoadingRoute />
});

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={AsyncHome} />
      <ExactCareer exact path="/carrera/:Career" component={AsyncCareer} />
      <PrivateRoute exact path="/estudiante/:_id" component={AsyncStudentInformation} />
      <PrivateRoute exact path="/editar/:_id" component={AsyncUpdateStudent} />
      <PrivateRoute exact path="/graficas" component={AsyncGraphics} />
      <PrivateRoute exact path="/configuracion" component={AsyncConfiguration} />
      <IsLogin exact path="/login" component={AsyncLogin} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default withRoot(Router);
