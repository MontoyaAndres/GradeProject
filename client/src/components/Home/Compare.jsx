/*

ADVERTISEMENT
When the function "downloadFileCompared" will be executed, this ALWAYS will take the first value selected
and this value will be the "data" to download the Excel.

For example:

First value selected: "2017-2"
Second value selected: "2016-2"

So, the function will return the data of "2017-2" not of "2016-2".

BE CAREFUL WITH THIS ACTION!

*/

import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import ErrorIcon from '@material-ui/icons/Error';

import Loading from '../Global/Loading';
import { downloadFileCompared } from '../../utils/api';
import normalizeErrors from '../../normalizeErrors';

const styles = theme => ({
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  warning: {
    color: '#F57F17',
    backgroundColor: '#FFF176',
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  title: {
    padding: theme.spacing.unit * 3,
    fontWeight: 'bold',
    fontSize: '150%'
  },
  button: {
    margin: '10%'
  }
});

const compareQuery = gql`
  query compareStudents($selected: [String!], $Career: String!) {
    compareStudents(periodSelected: $selected, career: $Career) {
      ok
      students {
        CodigoBanner
        Nombres
        Apellidos
      }
      errors {
        path
        message
      }
    }
  }
`;

const Compare = ({ classes, selected, Career }) => (
  <Query query={compareQuery} variables={{ selected, Career }}>
    {({ loading, data: { compareStudents } }) => {
      if (loading) {
        return <Loading />;
      }

      if (!compareStudents.ok && compareStudents.errors) {
        const error = normalizeErrors(compareStudents.errors).compare[0];

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

      if (compareStudents.ok) {
        return (
          <div className={classes.root}>
            <Paper className={classes.warning}>
              <Grid container wrap="nowrap">
                <Grid item>
                  <ErrorIcon />
                </Grid>
                <Grid item xs zeroMinWidth>
                  {`Dando click en descargar, los datos de ${selected[0]} serán descargados. Si quiere tener los de ${
                    selected[1]
                  }, seleccione ${selected[1]} antes de ${selected[0]}.`}
                </Grid>
              </Grid>
            </Paper>

            <List component="nav">
              <Grid container>
                <Grid item xs={12}>
                  <Grid container justify="space-around">
                    <div className={classes.title}>{`Carrera ${Career} ${selected[0]} - ${selected[1]}`}</div>
                    <div>
                      <Button
                        variant="fab"
                        aria-label="Download"
                        className={classes.button}
                        onClick={() => downloadFileCompared(selected[0], selected[1], Career)}
                      >
                        <FileDownload />
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              {compareStudents.students.map(data => (
                <Fragment key={data.CodigoBanner}>
                  <ListItem button>
                    <ListItemText primary={`${data.Nombres} ${data.Apellidos}`} secondary={data.CodigoBanner} />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
          </div>
        );
      }
    }}
  </Query>
);

export default withStyles(styles)(Compare);
