import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grade from '@material-ui/icons/Grade';

const Help = ({ onHandleClose }) => (
  <Fragment>
    <Link to="/ayuda" replace style={{ textDecoration: 'none' }}>
      <ListItem button onClick={onHandleClose}>
        <ListItemIcon>
          <Grade />
        </ListItemIcon>
        <ListItemText inset primary="Ayuda" />
      </ListItem>
    </Link>
  </Fragment>
);

export default Help;