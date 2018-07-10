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
    margin: theme.spacing.unit * 2
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
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container direction="column" justify="center" alignItems="center">
                <h2>Configuración de usuario</h2>
                <FormLabel className={classes.FormLabel}>
                  En este apartado podra ver y cambiar su Correo, Contraseña y Nombre de usuario, de click en el icono{' '}
                  <EditIcon />
                  al campo que desea cambiar.
                </FormLabel>
                <Grid item xs={12}>
                  <span className={classes.FormLabel}>Nombre de usuario: </span>
                  <span>
                    {user.username}
                    <DialogUsernameAndEmail email={user.email} username={user.username} history={history} />
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span className={classes.FormLabel}>Correo Electrónico: </span>
                  <span>
                    {user.email}
                    <DialogUsernameAndEmail email={user.email} username={user.username} history={history} />
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span className={classes.FormLabel}>Contraseña: </span> <span>Campo privado</span>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      }}
    </Query>
  </Layout>
);

export default withStyles(styles)(Configuration);
