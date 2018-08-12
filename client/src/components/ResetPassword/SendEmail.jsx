import React from "react";
import * as Yup from "yup";
import gql from "graphql-tag";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Info from "@material-ui/icons/Info";

import normalizeErrors from "../../normalizeErrors";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  error: {
    color: "red",
    fontSize: 14
  }
});

const SendEmail = ({
  classes,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Grid container className={classes.root}>
    {console.log(values, errors)}
    <Grid item xs={12}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Paper className={classes.paper}>
          <Paper
            className={classes.paper}
            style={
              values.sended
                ? { backgroundColor: "#66BB6A", color: "white" }
                : { backgroundColor: "white" }
            }
          >
            <Grid container>
              <Grid item style={{ paddingRight: 10 }}>
                <Info />
              </Grid>
              <Grid item xs>
                {values.sended
                  ? "Espere un momento mientras llega el correo de confirmación."
                  : "Por favor ingrese el correo del usuario."}
              </Grid>
            </Grid>
          </Paper>

          <Form onSubmit={handleSubmit}>
            <div>
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
              <span className={classes.error}>
                {touched.email && errors.email ? errors.email : null}
              </span>
            </div>
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                Enviar
              </Button>
            </div>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
);

const SendEmailMutation = gql`
  mutation($email: String!) {
    SendEmail(email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(SendEmailMutation),
  withFormik({
    mapPropsToValues: () => ({ email: "" }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .nullable()
        .email("Correo incorrecto")
        .typeError("Campo incorrecto")
        .required("El campo es obligatorio!")
    }),
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setFieldValue, resetForm, setErrors }
    ) => {
      const response = await mutate({
        variables: { email: values.email }
      });

      const { ok, errors } = response.data.SendEmail;

      if (ok) {
        setSubmitting(false);
        resetForm();
        setFieldValue("sended", true, false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
        setFieldValue("sended", false, false);
      }
    }
  })
)(withStyles(styles)(SendEmail));
