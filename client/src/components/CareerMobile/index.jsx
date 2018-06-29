import React, { Component, Fragment } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import Autorenew from '@material-ui/icons/Autorenew';
import Info from '@material-ui/icons/Info';

import Successfully from '../Global/Successfully';
import Loading from '../../components/Global/Loading';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '60%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  FormLabel: {
    fontWeight: '500',
    fontSize: 18
  }
});

const StudentByParams = gql`
  query StudentByParams(
    $Variable: String!
    $Situacion: String!
    $CodigoPrograma: String!
    $Estado: String!
    $TipoSemestre: String!
  ) {
    StudentByParams(
      Variable: $Variable
      Situacion: $Situacion
      CodigoPrograma: $CodigoPrograma
      Estado: $Estado
      TipoSemestre: $TipoSemestre
    ) {
      _id
      CodigoBanner
      Nombres
      Apellidos
      Comentario
      Situacion
      Variable
    }
  }
`;

const deleteStudentMutation = gql`
  mutation($id: ID!) {
    deleteStudent(_id: $id)
  }
`;

class index extends Component {
  state = {
    deleted: false,
    studenIdDelete: 0,
    successDeleted: false
  };

  // It'll show one alert which will ask if the user wants to delete the student
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
              Si da click en si, el estudiante será eliminado. ¿Esta seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            update
            <Button onClick={() => this.handleDeleteStudent()} color="primary">
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

  handleClose = () => {
    this.setState({ deleted: false, studenIdDelete: 0 });
  };

  handleDeleteStudent = async () => {
    const { studenIdDelete } = this.state;
    const { Variable, Situacion, CodigoPrograma, Estado, TipoSemestre } = this.props;

    await this.props.mutate({
      variables: { id: studenIdDelete },
      update: (store, { data: { deleteStudent } }) => {
        if (deleteStudent) {
          const data = store.readQuery({
            query: StudentByParams,
            variables: { Variable, Situacion, CodigoPrograma, Estado, TipoSemestre }
          });
          store.writeQuery({
            query: StudentByParams,
            variables: { Variable, Situacion, CodigoPrograma, Estado, TipoSemestre },
            data: { StudentByParams: data.StudentByParams.filter(item => item._id !== studenIdDelete) }
          });
        }
      }
    });

    this.setState({ deleted: false, studenIdDelete: 0, successDeleted: true });
  };

  handleRedirect = link => {
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const { classes, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre } = this.props;
    const { deleted, successDeleted } = this.state;

    return (
      <div className={classes.root}>
        {/* To ask if the user want to delete the student */}
        {deleted ? this.displayAlert() : null}

        {/* To show one alert which will show a message */}
        {successDeleted ? <Successfully message="Estudiante eliminado con exito!" /> : null}

        <Query query={StudentByParams} variables={{ Variable, Situacion, CodigoPrograma, Estado, TipoSemestre }}>
          {({ loading, data }) => {
            if (loading) {
              return <Loading />;
            }

            if (data.StudentByParams.length === 0) {
              return (
                <Paper className={classes.error}>
                  <Grid container wrap="nowrap">
                    <Grid item>
                      <ErrorIcon />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      No se encontraron datos.
                    </Grid>
                  </Grid>
                </Paper>
              );
            }

            return (
              <Fragment>
                {data.StudentByParams.map((student, i) => (
                  <ExpansionPanel key={i}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <span className={classes.heading}>{student.Apellidos}</span>
                      <span className={classes.secondaryHeading}>{`${student.CodigoBanner}`}</span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid container wrap="nowrap" direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <div>
                                <FormLabel className={classes.FormLabel}>Código Banner:</FormLabel>{' '}
                                {student.CodigoBanner}
                              </div>
                              <div>
                                <FormLabel className={classes.FormLabel}>Nombre:</FormLabel> {student.Nombres}
                              </div>
                              <div>
                                <FormLabel className={classes.FormLabel}>Apellidos:</FormLabel> {student.Apellidos}
                              </div>
                              <div>
                                <FormLabel className={classes.FormLabel}>Comentario:</FormLabel> {student.Comentario}
                              </div>
                              <div>
                                <FormLabel className={classes.FormLabel}>Situación:</FormLabel> {student.Situacion}
                              </div>
                              <div>
                                <FormLabel className={classes.FormLabel}>Variable:</FormLabel> {student.Variable}
                              </div>
                            </Grid>
                          </Grid>
                          <div style={{ textAlign: 'center' }}>
                            <IconButton
                              aria-label="Delete"
                              onClick={() => this.setState({ deleted: true, studenIdDelete: student._id })}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Update"
                              onClick={() => this.handleRedirect(`/estudiante/editar/${student._id}`)}
                            >
                              <Autorenew />
                            </IconButton>
                            <IconButton
                              aria-label="Information"
                              onClick={() => this.handleRedirect(`/estudiante/${student._id}`)}
                            >
                              <Info />
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default graphql(deleteStudentMutation)(withStyles(styles)(index));
