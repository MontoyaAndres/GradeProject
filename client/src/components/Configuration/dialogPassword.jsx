import React, { PureComponent, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import normalizeErrors from '../../normalizeErrors';

const styles = () => ({
  error: {
    color: 'red',
    fontSize: 14
  }
});

const updatePassword = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class dialogPassword extends PureComponent {
  state = {
    open: false
  };

  handleDialog = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  render() {
    const { mutate, history, classes } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <IconButton aria-label="Edit" onClick={this.handleDialog}>
          <EditIcon />
        </IconButton>

        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const response = await mutate({
              variables: { oldPassword: values.oldPassword, newPassword: values.newPassword }
            });

            const { ok, token, refreshToken, errors } = response.data.updatePassword;
            if (ok) {
              setSubmitting(false);
              localStorage.setItem('token', token);
              localStorage.setItem('refreshToken', refreshToken);
              this.handleDialog();
              history.push('/');
            } else {
              setSubmitting(false);
              setErrors(normalizeErrors(errors));
            }
          }}
          validationSchema={() =>
            Yup.object().shape({
              oldPassword: Yup.string()
                .nullable()
                .required('El campo es obligatorio!'),
              newPassword: Yup.string()
                .nullable()
                .required('El campo es obligatorio!')
            })
          }
          render={props => (
            <Dialog open={open} onClose={this.handleDialog} aria-labelledby="form-dialog-title">
              <Form>
                <DialogTitle id="form-dialog-title">Configuración de usuario</DialogTitle>
                <DialogContent>
                  <TextField
                    error={Boolean(props.touched.oldPassword && props.errors.oldPassword)}
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
                  <span className={classes.error}>
                    {props.touched.oldPassword && props.errors.oldPassword ? props.errors.oldPassword : null}
                  </span>
                  <TextField
                    error={Boolean(props.touched.newPassword && props.errors.newPassword)}
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
                  <span className={classes.error}>
                    {props.touched.newPassword && props.errors.newPassword ? props.errors.newPassword : null}
                  </span>
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

export default graphql(updatePassword)(withStyles(styles)(dialogPassword));
