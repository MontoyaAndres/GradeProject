import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grade from '@material-ui/icons/Grade';

const Home = ({ onHandleClose }) => (
  <Fragment>
    <Link to="/" replace style={{ textDecoration: 'none' }}>
      <ListItem button onClick={onHandleClose}>
        <ListItemIcon>
          <Grade />
        </ListItemIcon>
        <ListItemText inset primary="Inicio" />
      </ListItem>
    </Link>
  </Fragment>
);

export default Home;
