import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import EditIcon from "@material-ui/icons/Edit";

import Layout from "../components/Global";
import Loading from "../components/Global/Loading";
import DialogUsernameAndEmail from "../components/Configuration/dialogUsernameAndEmail";
import DialogPassword from "../components/Configuration/dialogPassword";
import { userQuery } from "../graphql/query";

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: "center"
  },
  FormLabel: {
    fontWeight: "500",
    fontSize: 18
  }
});

const Configuration = ({ classes, history, match: { url }, typeUser }) => (
  <Layout url={url} typeUser={typeUser}>
    <Query query={userQuery}>
      {({ loading, data: { user } }) => {
        if (loading) {
          return <Loading />;
        }

        return (
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container direction="column" justify="center" wrap="wrap">
                  <h2>Configuración de usuario</h2>
                  <FormLabel className={classes.FormLabel}>
                    En este apartado podra ver y cambiar su Correo, Contraseña y
                    Nombre de usuario, de click en el icono <EditIcon />
                    al campo que desea cambiar.
                  </FormLabel>

                  <Grid
                    container
                    alignItems="center"
                    style={{ paddingTop: 30 }}
                  >
                    <Grid item xs={12} sm={6} className={classes.FormLabel}>
                      Nombre de usuario:
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {user.username}
                      <DialogUsernameAndEmail
                        email={user.email}
                        username={user.username}
                        history={history}
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={6} className={classes.FormLabel}>
                      Correo Electrónico:
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {user.email}
                      <DialogUsernameAndEmail
                        email={user.email}
                        username={user.username}
                        history={history}
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={6} className={classes.FormLabel}>
                      Contraseña:
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      Campo privado <DialogPassword history={history} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        );
      }}
    </Query>
  </Layout>
);

export default withStyles(styles)(Configuration);
