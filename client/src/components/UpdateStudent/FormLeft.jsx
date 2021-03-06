import React, { PureComponent } from "react";
import { graphql } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { studentDistinct } from "../../graphql/query";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "97%"
  }
});

class FormLeft extends PureComponent {
  state = {
    dataTipoSemestre: [""],
    TipoSemestre: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.TipoSemestre === "") {
      // To get the props of "TipoSemestre" before the component rendered
      if (nextProps.data && nextProps.data.StudentDistinct) {
        return {
          dataTipoSemestre: nextProps.data.StudentDistinct,
          TipoSemestre: nextProps.data.StudentDistinct[0]
        };
      }
    }
    return null;
  }

  render() {
    const {
      classes,
      SelectData,
      values,
      handleBlur,
      handleChange
    } = this.props;
    const { dataTipoSemestre, TipoSemestre } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center" wrap="wrap">
            <Grid item xs={12} sm={6}>
              <div style={{ padding: 10 }}>
                <TextField
                  id="Nombres"
                  label="Nombre"
                  type="text"
                  name="Student.Nombres"
                  value={values.Student.Nombres}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Apellidos"
                  label="Apellidos"
                  type="text"
                  name="Student.Apellidos"
                  value={values.Student.Apellidos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Genero">Genero</InputLabel>
                  <Select
                    inputProps={{
                      id: "Genero",
                      name: "Student.Genero"
                    }}
                    value={values.Student.Genero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.Genero.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Genero
                          ? values.Student.Genero
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Edad"
                  label="Edad"
                  type="number"
                  name="Student.Edad"
                  value={values.Student.Edad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="TipoDocIdentidad">
                    Tipo Doc Identidad
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: "TipoDocIdentidad",
                      name: "Student.TipoDocIdentidad"
                    }}
                    value={values.Student.TipoDocIdentidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.TipoDocIdentidad.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.TipoDocIdentidad
                          ? values.Student.TipoDocIdentidad
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="NumeroIdentificacion"
                  label="Número de identificación"
                  type="number"
                  name="Student.NumeroIdentificacion"
                  value={values.Student.NumeroIdentificacion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="TelCel"
                  type="tel"
                  label="Teléfono"
                  name="Student.TelCel"
                  value={values.Student.TelCel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  label="Fecha Celular"
                  type="date"
                  name="Student.FechaCel"
                  className={classes.textField}
                  defaultValue={values.Student.FechaCel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Ciudad"
                  label="Ciudad"
                  name="Student.Ciudad"
                  value={values.Student.Ciudad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="NivelFormacion">
                    Nivel de formación
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: "NivelFormacion",
                      name: "Student.NivelFormacion"
                    }}
                    value={values.Student.NivelFormacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.NivelFormacion.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.NivelFormacion
                          ? values.Student.NivelFormacion
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ padding: 10 }}>
                <TextField
                  id="TelRe"
                  label="Teléfono de residencia"
                  type="tel"
                  name="Student.TelRe"
                  value={values.Student.TelRe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="CorreoEstudiante1"
                  label="Correo Institucional"
                  name="Student.CorreoEstudiante1"
                  value={values.Student.CorreoEstudiante1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="CodigoBanner"
                  label="Código Banner"
                  name="Student.CodigoBanner"
                  value={values.Student.CodigoBanner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="TipoSemestre">Periodo</InputLabel>
                  <Select
                    inputProps={{
                      id: "TipoSemestre",
                      name: "Student.TipoSemestre"
                    }}
                    value={values.Student.TipoSemestre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {dataTipoSemestre.map((data, index) => (
                      <option value={data} key={index}>
                        {data === TipoSemestre ? TipoSemestre : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="CorreoEstudiante2"
                  label="Correo Personal"
                  name="Student.CorreoEstudiante2"
                  value={values.Student.CorreoEstudiante2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  label="Fecha Correo"
                  type="date"
                  name="Student.FechaCorreo"
                  className={classes.textField}
                  defaultValue={values.Student.FechaCorreo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Direccion"
                  label="Dirección"
                  name="Student.Direccion"
                  value={values.Student.Direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Departamento"
                  label="Departamento"
                  name="Student.Departamento"
                  value={values.Student.Departamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="CodigoPrograma">
                    Código programa
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: "CodigoPrograma",
                      name: "Student.CodigoPrograma"
                    }}
                    value={values.Student.CodigoPrograma}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.CodigoPrograma.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.CodigoPrograma
                          ? values.Student.CodigoPrograma
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="DescripcionPrograma">
                    Descripción del programa
                  </InputLabel>
                  <Select
                    inputProps={{
                      id: "DescripcionPrograma",
                      name: "Student.DescripcionPrograma"
                    }}
                    value={values.Student.DescripcionPrograma}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.DescripcionPrograma.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.DescripcionPrograma
                          ? values.Student.DescripcionPrograma
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default graphql(studentDistinct, {
  options: props => ({
    variables: {
      param: "TipoSemestre"
    }
  })
})(withStyles(styles)(FormLeft));
