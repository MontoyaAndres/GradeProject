import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Successfully from '../Global/Successfully';
import Loading from '../Global/Loading';
import Seacher from './Searcher';
import { StudentByParams } from '../../graphql/mutation';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    minWidth: 1020,
    margin: theme.spacing.unit
  },
  CodigoBanner: {
    color: '#9c27b0',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  editButton: {
    margin: theme.spacing.unit
  },
  deleteButton: {
    margin: theme.spacing.unit,
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C62828'
    }
  }
});

const deleteStudentMutation = gql`
  mutation($id: ID!) {
    deleteStudent(_id: $id)
  }
`;

class index extends Component {
  state = {
    page: 0,
    rowsPerPage: 10,
    deleted: false,
    studenIdDelete: 0,
    successDeleted: false,
    searchStudent: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.successDeleted) {
      // if the student was deleted, this will format the state successDeleted
      this.setState({ successDeleted: false });
    }

    if (
      prevProps.Variable !== this.props.Variable ||
      prevProps.Situacion !== this.props.Situacion ||
      prevProps.Estado !== this.props.Estado ||
      prevProps.TipoSemestre !== this.props.TipoSemestre
    ) {
      this.setState({ searchStudent: '' });
    }
  }

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

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ rowsPerPage: e.target.value });
  };

  handleRedirect = link => {
    const { history } = this.props;
    history.push(link);
  };

  handleDeleteStudent = async () => {
    const { studenIdDelete, searchStudent } = this.state;
    const { Variable, Situacion, CodigoPrograma, Estado, TipoSemestre } = this.props;

    await this.props.mutate({
      variables: { id: studenIdDelete },
      update: (store, { data: { deleteStudent } }) => {
        if (deleteStudent) {
          const data = store.readQuery({
            query: StudentByParams,
            variables: { Search: searchStudent, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre }
          });
          store.writeQuery({
            query: StudentByParams,
            variables: { Search: searchStudent, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre },
            data: { StudentByParams: data.StudentByParams.filter(item => item._id !== studenIdDelete) }
          });
        }
      }
    });

    this.setState({ deleted: false, studenIdDelete: 0, successDeleted: true });
  };

  handleSearchStudent = search => {
    this.setState({ searchStudent: search });
  };

  render() {
    const { classes, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre } = this.props;
    const { rowsPerPage, page, deleted, successDeleted, searchStudent } = this.state;

    return (
      <Query
        query={StudentByParams}
        variables={{ Search: searchStudent, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre }}
        fetchPolicy="network-only"
      >
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <Grid item xs={12}>
              {/* To ask if the user want to delete the student */}
              {deleted ? this.displayAlert() : null}

              {/* To show one alert which will show a message */}
              <Successfully hide={successDeleted} message="Estudiante eliminado con exito!" />

              <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="none">Código Banner</TableCell>
                        <TableCell padding="none">Nombres</TableCell>
                        <TableCell padding="none">Apellidos</TableCell>
                        <TableCell padding="none">Comentario</TableCell>
                        <TableCell padding="none">Situación</TableCell>
                        <TableCell padding="none">Variable</TableCell>
                        <TableCell padding="none">
                          <Seacher onHandleSearchStudent={this.handleSearchStudent} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.StudentByParams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                        (student, i) => (
                          <TableRow key={i} hover tabIndex={-1}>
                            <TableCell
                              className={classes.CodigoBanner}
                              onClick={() => this.handleRedirect(`/estudiante/${student._id}`)}
                            >
                              {student.CodigoBanner}
                            </TableCell>
                            <TableCell padding="none" style={{ maxWidth: 230 }}>
                              {student.Nombres}
                            </TableCell>
                            <TableCell padding="none" style={{ maxWidth: 230 }}>
                              {student.Apellidos}
                            </TableCell>
                            <TableCell padding="none" style={{ maxWidth: 230 }}>
                              {student.Comentario}
                            </TableCell>
                            <TableCell padding="none" style={{ maxWidth: 230 }}>
                              {student.Situacion}
                            </TableCell>
                            <TableCell padding="none" style={{ maxWidth: 230 }}>
                              {student.Variable}
                            </TableCell>
                            <TableCell>
                              <Button
                                title="Editar estudiante"
                                variant="fab"
                                className={classes.editButton}
                                color="secondary"
                                onClick={() => this.handleRedirect(`/editar/${student._id}`)}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                title="Eliminar estudiante"
                                variant="fab"
                                className={classes.deleteButton}
                                onClick={() => this.setState({ deleted: true, studenIdDelete: student._id })}
                              >
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  component="div"
                  count={data.StudentByParams.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page'
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page'
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default graphql(deleteStudentMutation)(withStyles(styles)(index));
