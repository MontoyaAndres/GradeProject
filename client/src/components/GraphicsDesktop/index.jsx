import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import ErrorIcon from '@material-ui/icons/Error';

import normalizeErrors from '../../normalizeErrors';
import Loading from '../Global/Loading';
import Graficas from './Graphics/index';

const styles = theme => ({
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    textAlign: 'center',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3
  }
});

const graphicQuery = gql`
  query Graphics($CodigoPrograma: String!, $TipoSemestre: String!, $graphicBy: String!, $isVariable: String!) {
    Graphics(
      CodigoPrograma: $CodigoPrograma
      TipoSemestre: $TipoSemestre
      graphicBy: $graphicBy
      isVariable: $isVariable
    ) {
      ok
      values
      errors {
        path
        message
      }
    }
  }
`;

const index = ({ classes, CodigoPrograma, TipoSemestre, graphicBy, isVariable, style }) => (
  <Query
    query={graphicQuery}
    variables={{ CodigoPrograma, TipoSemestre, graphicBy, isVariable }}
    fetchPolicy="network-only"
  >
    {({ loading, data: { Graphics } }) => {
      if (loading) {
        return <Loading />;
      }

      if (Graphics.errors) {
        const error = normalizeErrors(Graphics.errors).graphics[0];

        return (
          <Paper className={classes.error}>
            <Grid container wrap="nowrap">
              <Grid item>
                <ErrorIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                {error}
              </Grid>
            </Grid>
          </Paper>
        );
      }

      if (Graphics.ok) {
        const keys = Object.keys(Graphics.values);
        const values = Object.values(Graphics.values);
        const chartConfig = {
          labels: keys,
          datasets: [
            {
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(125, 244, 66, 0.6)',
                'rgba(238, 65, 244, 0.6)'
              ]
            }
          ]
        };

        return (
          <Paper className={classes.paper}>
            <Fade in>
              <Grid container wrap="nowrap">
                <Graficas chartConfig={chartConfig} graphicBy={graphicBy} style={style} />
              </Grid>
            </Fade>
          </Paper>
        );
      }
    }}
  </Query>
);

export default withStyles(styles)(index);
