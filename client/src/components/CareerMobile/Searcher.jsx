import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  floatButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    zIndex: 1
  }
});

class Searcher extends React.Component {
  state = {
    open: false,
    search: ''
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open, search: '' });
  };

  handleSeacherStudent = () => {
    // Passing the student (name, lastname, or ID)
    this.props.onHandleSearchStudent(this.state.search);
    // Resetting the state
    this.setState({ open: !this.state.open, search: '' });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Button className={classes.floatButton} variant="fab" color="secondary" onClick={this.handleClick}>
          <Search />
        </Button>

        <Dialog open={open} onClose={this.handleClick} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Buscar estudiante</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para encontrar un estudiante, por favor ingrese el Nombre, Apellido o ID de este.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              name="search"
              label="Buscar estudiante"
              onChange={this.handleChange}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSeacherStudent} color="primary">
              Buscar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Searcher);
