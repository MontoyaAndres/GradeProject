import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import withRoot from '../utils/withRoot';
import Home from './Home';
import Career from './Career';
import StudentInformation from './StudentInformation';
import Graphics from './Graphics';
import Configuration from './Configuration';
import UpdateStudent from './UpdateStudent';
import Login from './Login';
import Error404 from './Error404';

import SelectData from '../utils/SelectData';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
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

const ExactCareer = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isExactCareer(props.match.url) ? <PrivateRoute {...props} component={Component} /> : <Error404 />
    }
  />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <ExactCareer exact path="/carrera/:Career" component={Career} />
      <PrivateRoute exact path="/estudiante/:_id" component={StudentInformation} />
      <PrivateRoute exact path="/editar/:_id" component={UpdateStudent} />
      <PrivateRoute exact path="/graficas" component={Graphics} />
      <PrivateRoute exact path="/configuracion" component={Configuration} />
      <IsLogin exact path="/login" component={Login} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default withRoot(Router);
