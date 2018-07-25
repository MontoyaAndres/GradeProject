import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { withFormik, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import normalizeErrors from '../normalizeErrors';
import UniminutoLogin from '../img/uniminuto-login.svg';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: 400,
    maxHeight: 250
  },
  margin: {
    margin: theme.spacing.unit
  },
  error: {
    color: 'red',
    fontSize: 14
  }
});

const Login = ({ classes, values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors }) => (
  <Fragment>
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Grid container alignItems="center" justify="center" className={classes.container}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <img className={classes.image} src={UniminutoLogin} alt="Uniminuto" />
            </Grid>
            <Form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                />
                <span className={classes.error}>{touched.email && errors.email ? errors.email : null}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  label="Contraseña"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <span className={classes.error}>{touched.password && errors.password ? errors.password : null}</span>
              </Grid>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                Entrar
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </Fragment>
);

const LoginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export default compose(
  graphql(LoginMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .nullable()
        .email('Correo incorrecto')
        .typeError('Campo incorrecto')
        .required('El campo es obligatorio!'),
      password: Yup.string()
        .nullable()
        .typeError('Campo incorrecto')
        .required('El campo es obligatorio!')
    }),
    handleSubmit: async (values, { props: { mutate, history }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { email: values.email, password: values.password }
      });

      const { ok, token, refreshToken, errors } = response.data.login;
      if (ok) {
        setSubmitting(false);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        history.push('/');
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    }
  })
)(withStyles(styles)(Login));
