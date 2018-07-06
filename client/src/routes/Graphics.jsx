import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';

import Layout from '../components/Global';
import GraphicsDesktop from '../components/GraphicsDesktop';
import SelectData from '../utils/SelectData';
import { studentDistinct } from '../graphql/query';

const styles = theme => ({
  select: {
    maxWidth: 200
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3
  }
});

const graphicByArray = [
  'Género',
  'Edad',
  'Tipo Doc Identidad',
  'Nivel Formación',
  'Jornada',
  'Código Sede',
  'Descripción Metodología',
  'Tipo Estudiante Agrupado',
  'Estado',
  'Variable',
  'Situacion'
];

class Graphics extends Component {
  state = {
    CodigoPrograma: 'ADFU',
    dataTipoSemestre: [''],
    TipoSemestre: '',
    graphicBy: 'Género',
    isVariable: 'ACADÉMICO'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.TipoSemestre === '') {
      // To get the props of "TipoSemestre" before the component rendered
      if (nextProps.data && nextProps.data.StudentDistinct) {
        return { dataTipoSemestre: nextProps.data.StudentDistinct, TipoSemestre: nextProps.data.StudentDistinct[0] };
      }
    }
    return null;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      classes,
      match: { url }
    } = this.props;
    const { CodigoPrograma, dataTipoSemestre, TipoSemestre, graphicBy, isVariable } = this.state;
    const dataVariable = Object.getOwnPropertyNames(SelectData.VariableSituacion);

    return (
      <Layout url={url}>
        <Hidden xlUp smDown>
          {/* Desktop section */}
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="space-around">
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="CodigoPrograma">Código de programa</InputLabel>
                      <Select
                        inputProps={{
                          id: 'CodigoPrograma',
                          name: 'CodigoPrograma'
                        }}
                        value={CodigoPrograma}
                        onChange={this.handleChange}
                        className={classes.select}
                        native
                      >
                        {SelectData.CodigoPrograma.map((data, index) => (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl className={classes.formControlMobil}>
                      <InputLabel htmlFor="TipoSemestre">Periodo</InputLabel>
                      <Select
                        inputProps={{
                          id: 'TipoSemestre',
                          name: 'TipoSemestre'
                        }}
                        value={TipoSemestre}
                        onChange={this.handleChange}
                        className={classes.select}
                        native
                      >
                        {dataTipoSemestre.map((data, index) => (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl className={classes.formControlMobil}>
                      <InputLabel htmlFor="graphicBy">Gráficar por</InputLabel>
                      <Select
                        inputProps={{
                          id: 'graphicBy',
                          name: 'graphicBy'
                        }}
                        value={graphicBy}
                        onChange={this.handleChange}
                        className={classes.select}
                        native
                      >
                        {graphicByArray.map((data, index) => (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl className={classes.formControlMobil}>
                      <InputLabel htmlFor="isVariable">Variable</InputLabel>
                      <Select
                        inputProps={{
                          id: 'isVariable',
                          name: 'isVariable'
                        }}
                        disabled={graphicBy !== 'Situacion'}
                        value={isVariable}
                        onChange={this.handleChange}
                        className={classes.select}
                        native
                      >
                        {dataVariable.map((data, index) => (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <GraphicsDesktop
            CodigoPrograma={CodigoPrograma}
            TipoSemestre={TipoSemestre}
            graphicBy={graphicBy}
            isVariable={isVariable}
          />
        </Hidden>
      </Layout>
    );
  }
}

export default graphql(studentDistinct, {
  options: props => ({
    variables: {
      param: 'TipoSemestre'
    }
  })
})(withStyles(styles)(Graphics));
