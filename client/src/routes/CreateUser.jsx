import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CreateUserForm from "../components/CreateUsers/createUserForm";
import ListUsers from "../components/CreateUsers/listUsers";
import Layout from "../components/Global";

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 4
  },
  tab: {
    fontWeight: "bold"
  }
});

class CreateUser extends PureComponent {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      match: { url },
      classes
    } = this.props;
    const { value } = this.state;

    return (
      <Layout url={url}>
        <Paper className={classes.paper}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Crear usuario" className={classes.tab} />
              <Tab label="Lista de usuarios" className={classes.tab} />
            </Tabs>
          </AppBar>
          <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
            <div>
              <CreateUserForm />
            </div>
            <div>
              <ListUsers />
            </div>
          </SwipeableViews>
        </Paper>
      </Layout>
    );
  }
}

export default withStyles(styles)(CreateUser);
