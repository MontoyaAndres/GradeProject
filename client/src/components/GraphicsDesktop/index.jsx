import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';

import Loading from '../Global/Loading';
import normalizeErrors from '../../normalizeErrors';

const styles = theme => ({
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    textAlign: 'center',
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

const index = ({ classes, CodigoPrograma, TipoSemestre, graphicBy, isVariable }) => (
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

      console.log(Graphics.values);

      return <h1>hola</h1>;
    }}
  </Query>
);

export default withStyles(styles)(index);
