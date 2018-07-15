import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import Successfully from '../Global/Successfully';
import normalizeErrors from '../../normalizeErrors';

// query
import { studentDistinct } from '../../graphql/query';

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
    fileName: '',
    fileUploaded: '',
    errorServer: true
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleErrorServer = () => {
    this.setState({ errorServer: !this.state.errorServer });
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
    const { errorServer, fileUploaded, fileName } = this.state;

    return (
      <Mutation
        mutation={uploadFileMutation}
        refetchQueries={[{ query: studentDistinct, variables: { param: 'TipoSemestre' } }]}
      >
        {(mutate, { data }) => {
          // show server errors
          if (errorServer && data && data.uploadFile.errors) {
            const { errors, values } = data.uploadFile;
            const errorMsg = normalizeErrors(errors).file[0];

            if (values && values.length > 0) {
              // incorrect values
              return this.displayServerError({ errorTitle: 'Error', errorMessage: errorMsg, values });
            }
            // period already saved
            return this.displayServerError({ errorTitle: 'Error', errorMessage: errorMsg });
          }

          return (
            <div>
              <Successfully hide={!!data && data.uploadFile.ok} message="Periodo subido con exito!" />

              <Grid item xs={12}>
                <Grid
                  container
                  spacing={16}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ paddingTop: 18, paddingBottom: 18 }}
                >
                  <Formik
                    initialValues={{ period: '' }}
                    validationSchema={() =>
                      Yup.object().shape({
                        period: Yup.string()
                          .nullable()
                          .matches(/^\d{4}-[1-2]$/, { message: 'Periodo incorrecto' })
                          .required('El campo es obligatorio!')
                      })
                    }
                    onSubmit={({ period }, { setSubmitting, resetForm }) => {
                      setSubmitting(false);
                      mutate({ variables: { file: fileUploaded, period } });
                      resetForm();
                    }}
                    render={props => (
                      <Form>
                        <div>
                          <Dropzone
                            accept=".xlsx, .xls, .xlsm, .csv"
                            className="ignore"
                            onDrop={([file]) => {
                              if (file) {
                                this.setState({ fileUploaded: file, fileName: file.name });
                              }
                            }}
                          >
                            {({ isDragActive }) => (
                              <div
                                style={{
                                  marginTop: 20,
                                  border: '4px dashed #3f51b5',
                                  position: 'relative',
                                  backgroundColor: isDragActive ? 'rgba(63, 81, 181, 0.2)' : 'white'
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: 100,
                                    textTransform: 'uppercase',
                                    color: '#3f51b5',
                                    padding: 60,
                                    textAlign: 'center'
                                  }}
                                >
                                  <h3>{fileName === '' ? 'Arrastre archivo o seleccione dando click' : fileName}</h3>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                        </div>
                        <div>
                          <TextField
                            error={Boolean(props.touched.period && props.errors.period)}
                            id="period"
                            name="period"
                            label="Ingrese periodo"
                            value={props.values.period}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            margin="normal"
                            fullWidth
                          />
                          <span
                            style={{
                              color: 'red',
                              fontSize: 14
                            }}
                          >
                            {props.touched.period && props.errors.period ? props.errors.period : null}
                          </span>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                          <Button type="submit" variant="contained" disabled={props.isSubmitting} color="primary">
                            Enviar
                          </Button>
                        </div>
                      </Form>
                    )}
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
