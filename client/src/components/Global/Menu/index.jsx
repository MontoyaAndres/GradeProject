import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
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
import Person from '@material-ui/icons/Person';
import Check from '@material-ui/icons/Check';

import Carreras from './Careers';
import Home from './Home';
import Graphics from './Graphics';
import Help from './Help';
import Logout from './Logout';
import { userQuery } from '../../../graphql/query';

import UniminutoMenu from '../../../img/uniminuto-menu.svg';

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

class index extends PureComponent {
  state = {
    open: false,
    openUser: null,
    username: '',
    logout: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // To get the props of "username" before the component rendered
    if (nextProps.data && nextProps.data.user) {
      // get the first text
      return { username: nextProps.data.user.username.split(' ')[0] };
    }
    return null;
  }

  handleMenuModal = () => {
    const { open } = this.state;

    this.setState({ open: !open });
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

    if (urlName[1] === 'ayuda') {
      return <span className={classes.title}>Ayuda</span>;
    }

    if (urlName[1] === 'configuracion') {
      return <span className={classes.title}>Configuración</span>;
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

  handleRedirect = () => {
    const { history } = this.props;
    this.setState({ openUser: null });
    history.push('/configuracion');
  };

  render() {
    const { classes } = this.props;
    const { open, openUser, logout, username } = this.state;

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
              {username}
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
                <MenuItem onClick={this.handleRedirect}>
                  <Person style={{ paddingRight: 10 }} /> Configuración
                </MenuItem>
                <MenuItem onClick={this.handleLogOut}>
                  <Check style={{ paddingRight: 10 }} /> Salir
                </MenuItem>
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
              <div style={{ margin: '0 auto', height: '100%' }}>
                <img src={UniminutoMenu} alt="uniminuto" height="100" width="150" />
              </div>
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
              <List>
                <Help onHandleClose={this.handleMenuModal} />
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default graphql(userQuery)(withRouter(withStyles(styles)(index)));
