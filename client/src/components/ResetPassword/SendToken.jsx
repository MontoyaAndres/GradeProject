import React, { PureComponent } from "react";
import decode from "jwt-decode";
import gql from "graphql-tag";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Info from "@material-ui/icons/Info";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class SendToken extends PureComponent {
  componentDidMount() {
    const { token, history } = this.props;

    if (!this.isEmailToken(token)) {
      history.push("/reset");
    }
  }

  isEmailToken = token => {
    try {
      decode(token);
      return true;
    } catch (err) {
      return false;
    }
  };

  render() {
    const {
      classes,
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ height: "100vh" }}
          >
            <Paper className={classes.paper}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item style={{ paddingRight: 10 }}>
                    <Info />
                  </Grid>
                  <Grid item xs>
                    Ingrese la nueva contraseña.
                  </Grid>
                </Grid>
              </Paper>

              <Form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password"
                    label="Nueva contraseña"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                  />
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
  }
}

const SendTokenMutation = gql`
  mutation($token: String!, $password: String!) {
    SendToken(token: $token, password: $password)
  }
`;

export default compose(
  graphql(SendTokenMutation),
  withFormik({
    mapPropsToValues: () => ({ password: "" }),
    handleSubmit: async (
      values,
      { props: { mutate, history, token }, setSubmitting }
    ) => {
      const response = await mutate({
        variables: { token, password: values.password }
      });

      if (response.data.SendToken) {
        setSubmitting(false);
        history.push("/login");
      }
    }
  })
)(withStyles(styles)(SendToken));
