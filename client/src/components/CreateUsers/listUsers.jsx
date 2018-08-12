import React, { Fragment, PureComponent } from "react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Loading from "../Global/Loading";
import { ListUsersQuery } from "../../graphql/query";

const styles = () => ({
  root: {
    width: "auto"
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#C62828"
    }
  }
});

const DeleteUserMutation = gql`
  mutation($id: ID!) {
    deleteUser(_id: $id)
  }
`;

class listUsers extends PureComponent {
  state = {
    deleted: false,
    studenIdDelete: 0
  };

  handleDeleteUser = async () => {
    const { studenIdDelete } = this.state;
    const { mutate } = this.props;

    await mutate({
      variables: { id: studenIdDelete },
      refetchQueries: [
        {
          query: ListUsersQuery
        }
      ]
    });

    this.setState({ deleted: false, studenIdDelete: 0 });
  };

  handleClose = () => {
    this.setState({ deleted: false, studenIdDelete: 0 });
  };

  // It'll show one alert which will ask if the user wants to delete the student
  displayAlert = () => {
    const { deleted } = this.state;

    return (
      <div>
        <Dialog
          open={deleted}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Eliminar usuario</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si da click en si, el usuario será eliminado. ¿Esta seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDeleteUser()} color="primary">
              Sí
            </Button>
            <Button
              onClick={() => this.handleClose()}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { deleted } = this.state;

    return (
      <Query query={ListUsersQuery}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <div>
              {/* To ask if the user wants to delete the user */}
              {deleted ? this.displayAlert() : null}

              <List className={classes.root}>
                {data.listUsers.map(user => (
                  <Fragment key={user._id}>
                    <ListItem>
                      {window.innerWidth > 600 ? (
                        <Avatar>
                          <AccountCircle />
                        </Avatar>
                      ) : null}
                      <ListItemText
                        primary={`${user.username} "${user.type}"`}
                        secondary={user.email}
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          this.setState({
                            deleted: true,
                            studenIdDelete: user._id
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider light />
                  </Fragment>
                ))}
              </List>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default graphql(DeleteUserMutation)(withStyles(styles)(listUsers));
