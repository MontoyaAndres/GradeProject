import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import Carreras from './Careers';
import Home from './Home';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  list: {
    width: 250
  }
});

class Menu extends Component {
  state = {
    open: false
  };

  handleMenuModal = () => {
    this.setState({ open: !this.state.open });
  };

  handleMenuName = () => {
    const { classes, url } = this.props;
    // Get an array of the url
    const urlName = url.split('/');

    if (url === '/') {
      return <span className={classes.title}>Inicio</span>;
    }

    if (urlName[1] === 'carrera') {
      return <span className={classes.title}>{urlName[2]}</span>;
    }
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuModal}>
              <MenuIcon />
            </IconButton>
            {this.handleMenuName()}
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={this.handleMenuModal}>
          <div tabIndex={0} role="button" onKeyDown={this.handleMenuModal}>
            <div className={classes.header}>
              <IconButton onClick={this.handleMenuModal}>
                <MenuIcon />
              </IconButton>
            </div>
            <div className={classes.list}>
              <List>
                <Home onHandleClose={this.handleMenuModal} />
              </List>
              <List>
                <Carreras onHandleClose={this.handleMenuModal} />
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Menu);
