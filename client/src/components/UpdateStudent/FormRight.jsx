import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '97%'
  }
});

class FormRight extends PureComponent {
  componentWillReceiveProps(prevProps) {
    const { values } = this.props;

    // if variable changes, situacion will change too.
    if (prevProps.values.Student.Variable !== values.Student.Variable) {
      // eslint-disable-next-line
      prevProps.values.Student.Situacion = prevProps.dataSituacion[0];
    }
  }

  render() {
    const { classes, dataSituacion, dataVariable, SelectData, values, handleBlur, handleChange } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center" wrap="wrap">
            <Grid item xs={12} sm={6}>
              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Jornada">Jornada</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Jornada',
                      name: 'Student.Jornada'
                    }}
                    value={values.Student.Jornada}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.Jornada.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Jornada ? values.Student.Jornada : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="AreaConocimiento">Area de conocimiento</InputLabel>
                  <Select
                    inputProps={{
                      id: 'AreaConocimiento',
                      name: 'Student.AreaConocimiento'
                    }}
                    value={values.Student.AreaConocimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.AreaConocimiento.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.AreaConocimiento ? values.Student.AreaConocimiento : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="NucleoBasicoConocimiento">Núcleo básico de conocimiento</InputLabel>
                  <Select
                    inputProps={{
                      id: 'NucleoBasicoConocimiento',
                      name: 'Student.NucleoBasicoConocimiento'
                    }}
                    value={values.Student.NucleoBasicoConocimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.NucleoBasicoConocimiento.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.NucleoBasicoConocimiento
                          ? values.Student.NucleoBasicoConocimiento
                          : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Rectoria">Rectoria</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Rectoria',
                      name: 'Student.Rectoria'
                    }}
                    value={values.Student.Rectoria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.Rectoria.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Rectoria ? values.Student.Rectoria : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="IES">IES</InputLabel>
                  <Select
                    inputProps={{
                      id: 'IES',
                      name: 'Student.IES'
                    }}
                    value={values.Student.IES}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.IES.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.IES ? values.Student.IES : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Snies"
                  label="Snies"
                  name="Student.Snies"
                  value={values.Student.Snies}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="CodigoSede">Código de sede</InputLabel>
                  <Select
                    inputProps={{
                      id: 'CodigoSede',
                      name: 'Student.CodigoSede'
                    }}
                    value={values.Student.CodigoSede}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.CodigoSede.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.CodigoSede ? values.Student.CodigoSede : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="CodigoPeriodoAcademico"
                  label="Código de periodo academico"
                  name="Student.CodigoPeriodoAcademico"
                  value={values.Student.CodigoPeriodoAcademico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Sede">Sede</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Sede',
                      name: 'Student.Sede'
                    }}
                    value={values.Student.Sede}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.Sede.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Sede ? values.Student.Sede : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="CentroRegional">Centro regional</InputLabel>
                  <Select
                    inputProps={{
                      id: 'CentroRegional',
                      name: 'Student.CentroRegional'
                    }}
                    value={values.Student.CentroRegional}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.CentroRegional.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.CentroRegional ? values.Student.CentroRegional : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="PeriodoAcademicoInscripcion"
                  label="Perido academico inscripción"
                  name="Student.PeriodoAcademicoInscripcion"
                  value={values.Student.PeriodoAcademicoInscripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="DescripcionMetodologia">Descripción metodologia</InputLabel>
                  <Select
                    inputProps={{
                      id: 'DescripcionMetodologia',
                      name: 'Student.DescripcionMetodologia'
                    }}
                    value={values.Student.DescripcionMetodologia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.DescripcionMetodologia.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.DescripcionMetodologia ? values.Student.DescripcionMetodologia : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="TipoEstudianteAgrupado">Tipo de estudiante agrupado</InputLabel>
                  <Select
                    inputProps={{
                      id: 'TipoEstudianteAgrupado',
                      name: 'Student.TipoEstudianteAgrupado'
                    }}
                    value={values.Student.TipoEstudianteAgrupado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.TipoEstudianteAgrupado.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.TipoEstudianteAgrupado ? values.Student.TipoEstudianteAgrupado : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="LugarResidencia"
                  label="Lugar de residencia"
                  name="Student.LugarResidencia"
                  value={values.Student.LugarResidencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Estado">Estado</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Estado',
                      name: 'Student.Estado'
                    }}
                    value={values.Student.Estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {SelectData.Estado.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Estado ? values.Student.Estado : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <TextField
                  id="Comentario"
                  label="Comentario"
                  name="Student.Comentario"
                  value={values.Student.Comentario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textField}
                  required
                />
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Situacion">Situacion</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Situacion',
                      name: 'Student.Situacion'
                    }}
                    value={values.Student.Situacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {dataSituacion.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Situacion ? values.Student.Situacion : data}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: 10 }}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="Variable">Variable</InputLabel>
                  <Select
                    inputProps={{
                      id: 'Variable',
                      name: 'Student.Variable'
                    }}
                    value={values.Student.Variable}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    native
                  >
                    {dataVariable.map((data, index) => (
                      <option value={data} key={index}>
                        {data === values.Student.Variable ? values.Student.Variable : data}
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

export default withStyles(styles)(FormRight);
