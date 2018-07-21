import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    animation: 'getin linear'
  },
  circle: {
    margin: '0 0.3em',
    height: '4em',
    width: '4em',
    borderRadius: '50%',
    border: '8px solid rgba(63, 81, 181, 0.1)',
    borderTop: '8px solid rgb(63, 81, 181)',
    borderBottom: '8px solid rgb(63, 81, 181)',
    animation: 'roll 2s infinite 0s linear'
  },
  '@keyframes roll': {
    '0%': {
      transform: 'rotate(0deg)'
    },

    '50%': {
      transform: 'rotate(180deg)'
    },

    '100%': {
      transform: 'rotate(360deg)'
    }
  }
});

const LoadingRoute = ({ classes }) => (
  <div className={classes.wrapper}>
    <ReactCSSTransitionGroup transitionName="loading" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <div className={classes.circle} />
    </ReactCSSTransitionGroup>
  </div>
);

export default withStyles(styles)(LoadingRoute);
