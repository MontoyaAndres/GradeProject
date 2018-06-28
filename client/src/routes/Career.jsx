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
import CareerMobile from '../components/CareerMobile';
import CareerDesktop from '../components/CareerDesktop';

import { studentDistinct } from '../graphql/query';
import SelectData from '../utils/SelectData';

const styles = theme => ({
  select: {
    maxWidth: 200
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3
  }
});

class Career extends Component {
  state = {
    Variable: 'ACADÉMICO',
    Situacion: 'CAMBIO DE SEDE',
    Estado: 'Ausentismo',
    dataTipoSemestre: [''],
    TipoSemestre: ''
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

  componentDidUpdate(prevProps, prevState) {
    // If the "variable" will change, the "situacion" will change too.
    const Situacion = SelectData.VariableSituacion[this.state.Variable][0];
    if (prevState.Variable !== this.state.Variable) {
      // eslint-disable-next-line
      this.setState({ Situacion });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      classes,
      history,
      match: { url, params }
    } = this.props;
    const { Variable, Situacion, TipoSemestre, Estado, dataTipoSemestre } = this.state;

    const dataVariable = Object.getOwnPropertyNames(SelectData.VariableSituacion);
    const dataSituacion = SelectData.VariableSituacion[Variable];
    const CodigoPrograma = params.Career;

    return (
      <Layout url={url}>
        <Hidden xlUp smDown>
          {/* Desktop section */}
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="space-around">
                  <FormControl>
                    <InputLabel htmlFor="Variable">Variable</InputLabel>
                    <Select
                      inputProps={{
                        id: 'Variable',
                        name: 'Variable'
                      }}
                      value={Variable}
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

                  <FormControl>
                    <InputLabel htmlFor="Situacion">Situacion</InputLabel>
                    <Select
                      inputProps={{
                        id: 'Situacion',
                        name: 'Situacion'
                      }}
                      value={Situacion}
                      onChange={this.handleChange}
                      className={classes.select}
                      native
                    >
                      {dataSituacion.map((data, index) => (
                        <option value={data} key={index}>
                          {data}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <InputLabel htmlFor="Estado">Estado</InputLabel>
                    <Select
                      inputProps={{
                        id: 'Estado',
                        name: 'Estado'
                      }}
                      value={Estado}
                      onChange={this.handleChange}
                      className={classes.select}
                      native
                    >
                      {SelectData.Estado.map((data, index) => (
                        <option value={data} key={index}>
                          {data}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
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
                      {dataTipoSemestre.map((period, index) => (
                        <option value={period} key={index}>
                          {period}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <CareerDesktop
            Variable={Variable}
            Situacion={Situacion}
            CodigoPrograma={CodigoPrograma}
            Estado={Estado}
            TipoSemestre={TipoSemestre}
            history={history}
          />
        </Hidden>

        <Hidden mdUp>
          {/* Mobile section */}
          <CareerMobile />
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
})(withStyles(styles)(Career));
