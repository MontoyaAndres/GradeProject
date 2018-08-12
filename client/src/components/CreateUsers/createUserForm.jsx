import React, { PureComponent } from "react";
import { graphql, compose } from "react-apollo";
import * as Yup from "yup";
import gql from "graphql-tag";
import { withFormik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Successfully from "../Global/Successfully";
import normalizeErrors from "../../normalizeErrors";
import { ListUsersQuery } from "../../graphql/query";

const styles = () => ({
  FormLabel: {
    fontWeight: "500",
    fontSize: 18
  },
  error: {
    color: "red",
    fontSize: 14
  }
});

class createUserForm extends PureComponent {
  componentDidUpdate(prevProps, prevState) {
    const { setFieldValue } = this.props;

    if (prevProps.values.created) {
      // if the user was created, this will format the value "created"
      setFieldValue("created", false, false);
    }
  }

  render() {
    const {
      classes,
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      touched,
      errors
    } = this.props;

    return (
      <Grid container style={{ padding: "2vh" }}>
        <Grid item xs={12}>
          <Grid container direction="column" justify="center" wrap="wrap">
            <div style={{ textAlign: "center" }}>
              <h2>Crear usuario</h2>
              <FormLabel className={classes.FormLabel}>
                En este apartado puede crear usuarios comunes los cuales pueden
                Descargar, Comparar y Actualizar información o administradores.
              </FormLabel>
            </div>

            <div style={{ margin: "auto", maxWidth: 600 }}>
              <Form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  type="text"
                  fullWidth
                  margin="normal"
                />
                <span className={classes.error}>
                  {touched.username && errors.username ? errors.username : null}
                </span>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  fullWidth
                />
                <span className={classes.error}>
                  {touched.email && errors.email ? errors.email : null}
                </span>

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
                <span className={classes.error}>
                  {touched.password && errors.password ? errors.password : null}
                </span>

                <Grid container>
                  <FormControl component="fieldset" style={{ margin: "3% 0" }}>
                    <FormLabel component="legend">Tipo de usuario</FormLabel>
                    <RadioGroup
                      value={values.type}
                      aria-label="user"
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                      <FormControlLabel
                        value="común"
                        control={<Radio />}
                        label="Usuario común"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <div style={{ paddingBottom: 10 }}>
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
            </div>
          </Grid>
        </Grid>

        <Successfully
          hide={values.created}
          message="Usuario agregado con exito!"
        />
      </Grid>
    );
  }
}

const CreateUserMutation = gql`
  mutation(
    $username: String!
    $type: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      type: $type
      email: $email
      password: $password
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(CreateUserMutation),
  withFormik({
    mapPropsToValues: () => ({
      username: "",
      type: "común",
      email: "",
      password: ""
    }),
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .nullable()
        .required("El campo es obligatorio!"),
      email: Yup.string()
        .nullable()
        .email("Correo incorrecto")
        .typeError("Campo incorrecto")
        .required("El campo es obligatorio!"),
      password: Yup.string()
        .nullable()
        .required("El campo es obligatorio!")
    }),
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, resetForm, setErrors, setFieldValue }
    ) => {
      const response = await mutate({
        variables: {
          username: values.username,
          type: values.type,
          email: values.email,
          password: values.password
        },
        refetchQueries: [{ query: ListUsersQuery }]
      });

      const { ok, errors } = response.data.createUser;
      if (ok) {
        setSubmitting(false);
        resetForm();
        setFieldValue("created", true, false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
        setFieldValue("created", false, false);
      }
    }
  })
)(withStyles(styles)(createUserForm));
