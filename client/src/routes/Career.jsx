import React, { PureComponent } from "react";
import { graphql } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import ViewHeadline from "@material-ui/icons/ViewHeadline";

import Layout from "../components/Global";
import CareerMobile from "../components/CareerMobile";
import CareerDesktop from "../components/CareerDesktop";

import { studentDistinct } from "../graphql/query";
import SelectData from "../utils/SelectData";

const styles = theme => ({
  select: {
    maxWidth: 200
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3
  },
  floatButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    zIndex: 1
  },
  formControlMobil: {
    paddingBottom: theme.spacing.unit * 2,
    width: "100%"
  }
});

class Career extends PureComponent {
  state = {
    Variable: "ACADÉMICO",
    Situacion: "CAMBIO DE SEDE",
    Estado: "Ausentismo",
    dataTipoSemestre: [""],
    TipoSemestre: "",
    openDialogMobile: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { Variable } = this.state;

    // If the "variable" will change, the "situacion" will change too.
    const Situacion = SelectData.VariableSituacion[Variable][0];
    if (prevState.Variable !== Variable) {
      // eslint-disable-next-line
      this.setState({ Situacion });
    }
  }

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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDialogMobile = () => {
    const { openDialogMobile } = this.state;

    this.setState({ openDialogMobile: !openDialogMobile });
  };

  render() {
    const {
      classes,
      history,
      match: { url, params }
    } = this.props;
    const {
      Variable,
      Situacion,
      TipoSemestre,
      Estado,
      dataTipoSemestre,
      openDialogMobile
    } = this.state;

    const dataVariable = Object.getOwnPropertyNames(
      SelectData.VariableSituacion
    );
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
                        id: "Variable",
                        name: "Variable"
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
                        id: "Situacion",
                        name: "Situacion"
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
                        id: "Estado",
                        name: "Estado"
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
                        id: "TipoSemestre",
                        name: "TipoSemestre"
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
          <Dialog open={openDialogMobile} onClose={this.handleDialogMobile}>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container wrap="nowrap" direction="column">
                    <Grid item xs={12}>
                      <div>
                        <FormControl className={classes.formControlMobil}>
                          <InputLabel htmlFor="Variable">Variable</InputLabel>
                          <Select
                            inputProps={{
                              id: "Variable",
                              name: "Variable"
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
                      </div>

                      <div>
                        <FormControl className={classes.formControlMobil}>
                          <InputLabel htmlFor="Situacion">Situacion</InputLabel>
                          <Select
                            inputProps={{
                              id: "Situacion",
                              name: "Situacion"
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
                      </div>

                      <div>
                        <FormControl className={classes.formControlMobil}>
                          <InputLabel htmlFor="Estado">Estado</InputLabel>
                          <Select
                            inputProps={{
                              id: "Estado",
                              name: "Estado"
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
                      </div>

                      <div>
                        <FormControl className={classes.formControlMobil}>
                          <InputLabel htmlFor="TipoSemestre">
                            Periodo
                          </InputLabel>
                          <Select
                            inputProps={{
                              id: "TipoSemestre",
                              name: "TipoSemestre"
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
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogMobile} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            className={classes.floatButton}
            variant="fab"
            color="secondary"
            onClick={this.handleDialogMobile}
          >
            <ViewHeadline />
          </Button>

          {/* When the dialog close, it'll pass the props */}
          {!openDialogMobile ? (
            <CareerMobile
              Variable={Variable}
              Situacion={Situacion}
              CodigoPrograma={CodigoPrograma}
              Estado={Estado}
              TipoSemestre={TipoSemestre}
              history={history}
            />
          ) : null}
        </Hidden>
      </Layout>
    );
  }
}

export default graphql(studentDistinct, {
  options: props => ({
    variables: {
      param: "TipoSemestre"
    }
  })
})(withStyles(styles)(Career));
