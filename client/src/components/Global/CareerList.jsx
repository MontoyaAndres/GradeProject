import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';

import SelectData from '../../utils/SelectData';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const CareerList = ({ classes, onHandleClose }) => (
  <Fragment>
    {SelectData.Carreras.map(element => (
      <Link
        to={`/carrera/${element}`}
        key={SelectData.Carreras.indexOf(element)}
        style={{ textDecoration: 'none' }}
        replace
      >
        <div>
          <ListItem button className={classes.nested} onClick={onHandleClose}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary={element} />
          </ListItem>
        </div>
      </Link>
    ))}
  </Fragment>
);

export default withStyles(styles)(CareerList);
