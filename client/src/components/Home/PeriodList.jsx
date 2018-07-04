import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FileDownload from '@material-ui/icons/FileDownload';
import ViewHeadline from '@material-ui/icons/ViewHeadline';

import Loading from '../Global/Loading';
import Successfully from '../Global/Successfully';
import { downloadFilePeriod } from '../../utils/api';
import SelectData from '../../utils/SelectData';

// Query
import { studentDistinct } from '../../graphql/query';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

const deletePeriod = gql`
  mutation($period: String!) {
    deleteTipoSemestre(TipoSemestre: $period)
  }
`;

class PeriodList extends Component {
  state = {
    career: 'ADFU',
    checked: [],
    selected: [],
    openDialog: false,
    deleted: false,
    successDeleted: false,
    valueDeleleted: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.career !== this.state.career) {
      // If the checkbox was changed and then the career will be change
      // so, the function "onHandleSelectedAndCareer" needs to update!
      this.props.onHandleSelectedAndCareer(this.state.selected, this.state.career);
    }

    if (prevState.successDeleted) {
      // if the period was deleted, this will format the state successDeleted
      this.setState({ successDeleted: false });
    }
  }

  // Show one dialog which will show if the user want to download or delete one period
  displayDialog = () => {
    const { openDialog, career, valueDeleleted } = this.state;
    return (
      <Dialog
        open={openDialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Qué desea hacer?</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container wrap="wrap" justify="center" alignItems="center">
                <div>
                  <Button
                    variant="contained"
                    onClick={() => downloadFilePeriod(career, valueDeleleted)}
                    style={{ margin: 5, color: 'white', backgroundColor: 'blue' }}
                  >
                    Descargar periodo
                    <FileDownload />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: 5, color: 'white', backgroundColor: 'red' }}
                    onClick={() => this.setState({ deleted: true })}
                  >
                    Eliminar periodo
                    <DeleteIcon />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // It'll show one alert which will ask if the user wants to delete the period
  displayAlert = () => {
    const { deleted } = this.state;
    return (
      <div>
        <Dialog
          open={deleted}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Eliminar periodo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si da click en si, el periodo será eliminado. ¿Esta seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDeletePeriod()} color="primary">
              Sí
            </Button>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  // Close displayAlert and displayDialog dialog
  handleClose = () => {
    this.setState({ deleted: false, openDialog: false });
  };

  handleDeletePeriod = () => {
    const { valueDeleleted } = this.state;
    // delete the period and refetch the query "studentDistinct"
    this.props.mutate({
      variables: { period: valueDeleleted },
      refetchQueries: [{ query: studentDistinct, variables: { param: 'TipoSemestre' } }]
    });
    this.setState({ deleted: false, openDialog: false, successDeleted: true });
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  handleToggle = (index, compare) => () => {
    const { checked, selected, career } = this.state;
    const { onHandleSelectedAndCareer } = this.props;

    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newChecked.push(index);
      newSelected.push(compare);
    } else {
      newChecked.splice(currentIndex, 1);
      newSelected.splice(compare, 1);
    }

    // When someone click a lot the checkbox, the "newSelect" has the same value.
    // So, this "newSelect" and "newChecked" will be formated and same way the state too.
    if (newSelected[0] === newSelected[1]) {
      this.setState({ checked: [], selected: [] });
      newChecked.splice(currentIndex, 1);
      newSelected.splice(compare, 1);
    } else {
      this.setState({
        checked: newChecked,
        selected: newSelected
      });
    }

    onHandleSelectedAndCareer(newSelected, career);
  };

  render() {
    const { classes } = this.props;
    const { career, checked, deleted, openDialog, successDeleted } = this.state;

    return (
      <Query query={studentDistinct} variables={{ param: 'TipoSemestre' }}>
        {({ loading, data: { StudentDistinct } }) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <div className={classes.root}>
              {/* To ask if the user want to download or remove the period */}
              {openDialog ? this.displayDialog() : null}

              {/* To ask if the user want to remove the period */}
              {deleted ? this.displayAlert() : null}

              {/* Show alert when the period was deleted */}
              <Successfully message="Periodo eliminado con exito!" hide={successDeleted} />

              <List>
                {StudentDistinct.map((value, index) => (
                  <ListItem key={index} dense button>
                    <Checkbox onChange={this.handleToggle(index, value)} checked={checked.indexOf(index) !== -1} />
                    <ListItemText style={{ fontSize: 18 }} primary={value} />
                    <ListItemSecondaryAction>
                      <Select
                        inputProps={{
                          id: 'career',
                          name: 'career'
                        }}
                        value={career}
                        onChange={this.handleChange}
                        native
                      >
                        {SelectData.Carreras.map((data, i) => (
                          <option value={data} key={i}>
                            {data}
                          </option>
                        ))}
                      </Select>
                      <IconButton
                        aria-label="Open"
                        onClick={() => this.setState({ openDialog: true, valueDeleleted: value })}
                      >
                        <ViewHeadline />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default graphql(deletePeriod)(withStyles(styles)(PeriodList));
