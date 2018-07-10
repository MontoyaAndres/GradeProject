import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const updatePassword = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

class dialogPassword extends Component {
  state = {
    open: false
  };

  handleDialog = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { history } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <IconButton aria-label="Edit" onClick={this.handleDialog}>
          <EditIcon />
        </IconButton>

        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            this.props.mutate({
              variables: { oldPassword: values.oldPassword, newPassword: values.newPassword }
            });
            this.handleDialog();
            history.push('/');
          }}
          render={props => (
            <Dialog open={open} onClose={this.handleDialog} aria-labelledby="form-dialog-title">
              <Form>
                <DialogTitle id="form-dialog-title">Configuración de usuario</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="oldPassword"
                    name="oldPassword"
                    label="Contraseña antigua"
                    type="password"
                    value={props.values.oldPassword}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="newPassword"
                    name="newPassword"
                    label="Contraseña nueva"
                    type="password"
                    value={props.values.newPassword}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={props.isSubmitting} color="primary">
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

export default graphql(updatePassword)(dialogPassword);
