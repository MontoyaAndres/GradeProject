import React from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';

import Layout from '../components/Global';
import Loading from '../components/Global/Loading';
import DialogUsernameAndEmail from '../components/Configuration/dialogUsernameAndEmail';
import DialogPassword from '../components/Configuration/dialogPassword';
import { userQuery } from '../graphql/query';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  FormLabel: {
    fontWeight: '500',
    fontSize: 18,
    paddingTop: 20
  }
});

const Configuration = ({ classes, history, match: { url } }) => (
  <Layout url={url}>
    <Query query={userQuery}>
      {({ loading, data: { user } }) => {
        if (loading) {
          return <Loading />;
        }

        return (
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container direction="column" justify="center" alignItems="center" wrap="wrap">
                  <h2>Configuración de usuario</h2>
                  <FormLabel className={classes.FormLabel}>
                    En este apartado podra ver y cambiar su Correo, Contraseña y Nombre de usuario, de click en el icono{' '}
                    <EditIcon />
                    al campo que desea cambiar.
                  </FormLabel>

                  <Grid item xs={12}>
                    <div className={classes.FormLabel}>Nombre de usuario: </div>
                    <div>
                      {user.username}
                      <DialogUsernameAndEmail email={user.email} username={user.username} history={history} />
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div className={classes.FormLabel}>Correo Electrónico: </div>
                    <div>
                      {user.email}
                      <DialogUsernameAndEmail email={user.email} username={user.username} history={history} />
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div className={classes.FormLabel}>Contraseña: </div>{' '}
                    <div>
                      Campo privado <DialogPassword history={history} />
                    </div>
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
