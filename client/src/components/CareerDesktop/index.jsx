import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
  }
});

class index extends Component {
  state = {
    page: 0,
    rowsPerPage: 10
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

  render() {
    const { classes, data } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <Grid item xs={12}>
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
                  <TableCell padding="none">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, i) => (
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
                        className={classes.button}
                        color="secondary"
                        onClick={() => this.handleRedirect(`/estudiante/editar/${student._id}`)}
                      >
                        <EditIcon />
                      </Button>
                      <Button title="Eliminar estudiante" variant="fab" className={classes.buttonDelete}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
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
  }
}

export default withStyles(styles)(index);
