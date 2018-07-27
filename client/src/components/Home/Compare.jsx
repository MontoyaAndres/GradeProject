import React, { Fragment, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  titleDesktop: {
    padding: theme.spacing.unit * 3,
    fontWeight: 'bold',
    fontSize: '150%'
  },
  titleMobile: {
    padding: theme.spacing.unit,
    fontWeight: 'bold',
    fontSize: '100%'
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

class Compare extends PureComponent {
  state = {
    openDialog: false,
    periodSelected: ''
  };

  handleChange = event => {
    this.setState({ periodSelected: event.target.value });
  };

  handleDialog = () => {
    const { openDialog } = this.state;

    this.setState({ openDialog: !openDialog });
  };

  handleDownloadFile = () => {
    const { periodSelected } = this.state;
    const { selected, Career } = this.props;

    downloadFileCompared(selected[0], selected[1], Career, periodSelected);
    this.handleDialog();
  };

  displayDownloadDialog = () => {
    const { openDialog, periodSelected } = this.state;
    const { selected } = this.props;

    return (
      <div>
        <Dialog
          open={openDialog}
          keepMounted
          onClose={this.handleDialog}
          aria-labelledby="alert-title"
          aria-describedby="alert-description"
        >
          <DialogTitle id="alert-title">Descargar archivo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-description">¿Qué datos va a descargar?</DialogContentText>
            <Grid container>
              {selected.map((period, index) => (
                <RadioGroup
                  key={index}
                  aria-label="Period"
                  name="periodSelected"
                  value={periodSelected}
                  onChange={this.handleChange}
                >
                  <FormControlLabel value={period} control={<Radio />} label={period} style={{ padding: 4 }} />
                </RadioGroup>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDownloadFile()} color="primary">
              Descargar
            </Button>
            <Button onClick={this.handleDialog} color="primary" autoFocus>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    const { openDialog } = this.state;
    const { classes, selected, Career } = this.props;

    return (
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
                {openDialog ? this.displayDownloadDialog() : null}
                <List component="nav">
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="space-around">
                        {/* Desktop version */}
                        <Hidden xlUp smDown>
                          <div className={classes.titleDesktop}>{`Carrera ${Career} ${selected[0]} - ${
                            selected[1]
                          }`}</div>
                          <div>
                            <Button
                              variant="fab"
                              aria-label="Download"
                              className={classes.button}
                              onClick={() => this.setState({ openDialog: true })}
                            >
                              <FileDownload />
                            </Button>
                          </div>
                        </Hidden>

                        {/* Mobile version */}
                        <Hidden mdUp>
                          <div className={classes.titleMobile}>{`Carrera ${Career} ${selected[0]} - ${
                            selected[1]
                          }`}</div>
                          <Button
                            color="primary"
                            styles={{ padding: 100 }}
                            onClick={() => this.setState({ openDialog: true })}
                          >
                            <FileDownload />
                            Descargar comparación
                          </Button>
                        </Hidden>
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
  }
}

export default withStyles(styles)(Compare);
