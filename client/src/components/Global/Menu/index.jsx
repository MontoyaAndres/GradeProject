import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Carreras from './Careers';
import Home from './Home';
import Graphics from './Graphics';
import Logout from './Logout';

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

class index extends Component {
  state = {
    open: false,
    openUser: null,
    logout: false
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

    if (urlName[1] === 'editar') {
      return <span className={classes.title}>Editar información</span>;
    }

    if (urlName[1] === 'estudiante') {
      return <span className={classes.title}>Información de estudiante</span>;
    }

    if (urlName[1] === 'graficas') {
      return <span className={classes.title}>Gráficas</span>;
    }
  };

  handleMenuUser = event => {
    this.setState({ openUser: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openUser: null });
  };

  handleLogOut = () => {
    this.setState({ openUser: null, logout: true });
  };

  render() {
    const { classes } = this.props;
    const { open, openUser, logout } = this.state;

    return (
      <div className={classes.root}>
        {logout ? <Logout /> : null}

        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuModal}>
              <MenuIcon />
            </IconButton>
            {this.handleMenuName()}
            <div>
              <IconButton
                aria-owns={openUser ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenuUser}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={!!openUser}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Mi perfil</MenuItem>
                <MenuItem onClick={this.handleLogOut}>Salir</MenuItem>
              </Menu>
            </div>
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
              <List>
                <Graphics onHandleClose={this.handleMenuModal} />
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(index);
