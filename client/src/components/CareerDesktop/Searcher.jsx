import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Searcher extends React.PureComponent {
  state = {
    open: false,
    search: ''
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { open } = this.state;

    this.setState({ open: !open, search: '' });
  };

  handleSeacherStudent = () => {
    const { search, open } = this.state;
    const { onHandleSearchStudent } = this.props;

    // Passing the student (name, lastname, or ID)
    onHandleSearchStudent(search);
    // Resetting the state
    this.setState({ open: !open, search: '' });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick}>Buscar estudiante</Button>

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

export default Searcher;
