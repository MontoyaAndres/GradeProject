import React, { PureComponent, Fragment } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { userQuery } from "../../graphql/query";

const updateUsernameOrEmailMutation = gql`
  mutation updateUsernameOrEmail($username: String!, $email: String!) {
    updateUsernameOrEmail(username: $username, email: $email)
  }
`;

class dialogUsernameAndEmail extends PureComponent {
  state = {
    open: false
  };

  handleDialog = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  render() {
    const { username, email, history, mutate } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <IconButton aria-label="Edit" onClick={this.handleDialog}>
          <EditIcon />
        </IconButton>

        <Formik
          initialValues={{ username, email }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            mutate({
              variables: { username: values.username, email: values.email },
              refetchQueries: [{ query: userQuery }]
            });
            this.handleDialog();
            history.push("/");
          }}
          render={props => (
            <Dialog
              open={open}
              onClose={this.handleDialog}
              aria-labelledby="form-dialog-title"
            >
              <Form>
                <DialogTitle id="form-dialog-title">
                  Configuración de usuario
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="Nombre de usuario"
                    type="text"
                    value={props.values.username}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    required
                  />
                  <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={props.isSubmitting}
                    color="primary"
                  >
                    Enviar
                  </Button>
                </DialogActions>
              </Form>
            </Dialog>
          )}
        />
      </Fragment>
    );
  }
}

export default graphql(updateUsernameOrEmailMutation)(dialogUsernameAndEmail);
