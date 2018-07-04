import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import Loading from '../Global/Loading';
import Successfully from '../Global/Successfully';
import normalizeErrors from '../../normalizeErrors';

// query
import { studentDistinct } from '../../graphql/query';

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

const uploadFileMutation = gql`
  mutation($file: Upload!, $period: String!) {
    uploadFile(file: $file, period: $period) {
      ok
      values
      errors {
        path
        message
      }
    }
  }
`;

class uploadFile extends Component {
  state = {
    period: '',
    errorClient: false,
    errorServer: true,
    errorTitle: '',
    errorMessage: ''
  };

  handleErrorClient = () => {
    this.setState({ errorClient: !this.state.errorClient, errorTitle: '', errorMessage: '' });
  };

  handleErrorServer = () => {
    this.setState({ errorServer: !this.state.errorServer });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  displayClientError = () => {
    const { errorClient, errorTitle, errorMessage } = this.state;
    return (
      <div>
        <Dialog
          open={errorClient}
          keepMounted
          onClose={this.handleErrorClient}
          aria-labelledby="alert-title"
          aria-describedby="alert-description"
        >
          <DialogTitle id="alert-title">{errorTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-description">{errorMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorClient} color="primary" autoFocus>
              Intentar otra vez.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  displayServerError = ({ errorTitle, errorMessage, values }) => {
    const { errorServer } = this.state;
    return (
      <div>
        <Dialog
          open={errorServer}
          keepMounted
          onClose={this.handleErrorServer}
          aria-labelledby="alert-title"
          aria-describedby="alert-description"
        >
          <DialogTitle id="alert-title">{errorTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-description">{errorMessage}</DialogContentText>
            {values ? (
              <ul>
                {values.map((value, index) => (
                  <li key={index}>
                    <DialogContentText id="alert-description">{value}</DialogContentText>
                  </li>
                ))}
              </ul>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorServer} color="primary" autoFocus>
              Intentar otra vez.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    const { errorClient, errorServer, errorTitle, errorMessage, period } = this.state;

    return (
      <Mutation
        mutation={uploadFileMutation}
        refetchQueries={[{ query: studentDistinct, variables: { param: 'TipoSemestre' } }]}
      >
        {(mutate, { data }) => {
          if (errorServer && data && data.uploadFile.errors) {
            // show server errors
            const { errors, values } = data.uploadFile;
            const errorMsg = normalizeErrors(errors).file[0];

            if (values && values.length > 0) {
              // incorrect values
              return this.displayServerError({ errorTitle: 'Error', errorMessage: errorMsg, values });
            }
            // period already saved
            return this.displayServerError({ errorTitle: 'Error', errorMessage: errorMsg });
          }

          if (errorClient && errorTitle !== '' && errorMessage !== '') {
            // show front-end errors
            return this.displayClientError();
          }

          if (data && data.loading) {
            return <Loading />;
          }

          return (
            <div>
              <Successfully hide={!!(data && data.uploadFile.ok)} message="Periodo subido con exito!" />
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={16}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ paddingTop: 18, paddingBottom: 18 }}
                >
                  <Dropzone
                    onDrop={([file]) => {
                      const extension = getFileExtension(file.name);
                      if (extension === 'xlsx' || extension === 'xls' || extension === 'xlsm' || extension === 'csv') {
                        if (period !== '') {
                          const isTipoSemestre = new RegExp(/^\d{4}-[1-2]$/);
                          if (isTipoSemestre.test(period)) {
                            mutate({ variables: { file, period } });
                          } else {
                            this.setState({
                              errorClient: true,
                              errorTitle: 'Periodo incorrecto',
                              errorMessage: 'Por favor ingresar un periodo correcto.'
                            });
                          }
                        } else {
                          this.setState({
                            errorClient: true,
                            errorTitle: 'Campo vacio',
                            errorMessage: 'Por favor completar el campo periodo.'
                          });
                        }
                      } else {
                        this.setState({
                          errorClient: true,
                          errorTitle: 'Archivo incorrecto',
                          errorMessage: 'Por favor subir un archivo con las extensiones .xlsx, .xls, .xlsm, .csv.'
                        });
                      }
                    }}
                  >
                    <img src="arrow.png" alt="Subir archivo" style={{ pointerEvents: 'none' }} />
                  </Dropzone>
                  <TextField
                    id="period"
                    name="period"
                    label="Ingrese periodo"
                    value={period}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default uploadFile;
