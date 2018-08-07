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
import FileDownload from "@material-ui/icons/FileDownload";

import Layout from "../components/Global";
import GraphicsDesktop from "../components/GraphicsDesktop";
import GraphicsMobile from "../components/GraphicsMobile";
import SelectData from "../utils/SelectData";
import { studentDistinct } from "../graphql/query";
import { donwloadGraphic } from "../utils/api";

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
  floatButtonDownload: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    zIndex: 1
  },
  formControlMobil: {
    paddingBottom: theme.spacing.unit * 2,
    width: "100%"
  }
});

const graphicByArray = [
  "Género",
  "Edad",
  "Tipo Doc Identidad",
  "Nivel Formación",
  "Jornada",
  "Código Sede",
  "Descripción Metodología",
  "Tipo Estudiante Agrupado",
  "Estado",
  "Variable",
  "Situacion"
];

class Graphics extends PureComponent {
  state = {
    CodigoPrograma: "ADFU",
    dataTipoSemestre: [""],
    TipoSemestre: "",
    graphicBy: "Género",
    isVariable: "ACADÉMICO",
    style: "Pie",
    openDialogMobile: false
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

  downloadButton = () => {
    const {
      CodigoPrograma,
      TipoSemestre,
      graphicBy,
      isVariable,
      style
    } = this.state;
    const { classes } = this.props;

    return (
      <Button
        className={classes.floatButtonDownload}
        variant="fab"
        color="secondary"
        onClick={() =>
          donwloadGraphic(
            style,
            CodigoPrograma,
            TipoSemestre,
            graphicBy,
            isVariable
          )
        }
      >
        <FileDownload />
      </Button>
    );
  };

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
      match: { url }
    } = this.props;
    const {
      CodigoPrograma,
      dataTipoSemestre,
      TipoSemestre,
      graphicBy,
      isVariable,
      style,
      openDialogMobile
    } = this.state;
    const dataVariable = Object.getOwnPropertyNames(
      SelectData.VariableSituacion
    );

    return (
      <Layout url={url}>
        {this.downloadButton()}

        <Hidden mdDown>
          {/* Desktop section */}
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="space-around">
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="CodigoPrograma">
                        Código de programa
                      </InputLabel>
                      <Select
                        inputProps={{
                          id: "CodigoPrograma",
                          name: "CodigoPrograma"
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
                        {dataTipoSemestre.map((data, index) => (
                          <option value={data} key={index}>
                            {data}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl>
                      <InputLabel htmlFor="graphicBy">Gráficar por</InputLabel>
                      <Select
                        inputProps={{
                          id: "graphicBy",
                          name: "graphicBy"
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
                    <FormControl>
                      <InputLabel htmlFor="isVariable">Variable</InputLabel>
                      <Select
                        inputProps={{
                          id: "isVariable",
                          name: "isVariable"
                        }}
                        disabled={graphicBy !== "Situacion"}
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

                  <div>
                    <FormControl>
                      <InputLabel htmlFor="style">Estilo</InputLabel>
                      <Select
                        inputProps={{
                          id: "style",
                          name: "style"
                        }}
                        value={style}
                        onChange={this.handleChange}
                        className={classes.select}
                        native
                      >
                        {["Bar", "Line", "Pie", "Doughnut"].map(
                          (data, index) => (
                            <option value={data} key={index}>
                              {data}
                            </option>
                          )
                        )}
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
            style={style}
          />
        </Hidden>

        <Hidden lgUp>
          {/* Mobile section */}
          <Dialog open={openDialogMobile} onClose={this.handleDialogMobile}>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container wrap="nowrap" direction="column">
                    <Grid item xs={12}>
                      <div>
                        <FormControl className={classes.formControlMobil}>
                          <InputLabel htmlFor="CodigoPrograma">
                            Código de programa
                          </InputLabel>
                          <Select
                            inputProps={{
                              id: "CodigoPrograma",
                              name: "CodigoPrograma"
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
                          <InputLabel htmlFor="graphicBy">
                            Gráficar por
                          </InputLabel>
                          <Select
                            inputProps={{
                              id: "graphicBy",
                              name: "graphicBy"
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
                              id: "isVariable",
                              name: "isVariable"
                            }}
                            disabled={graphicBy !== "Situacion"}
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
            <GraphicsMobile
              CodigoPrograma={CodigoPrograma}
              TipoSemestre={TipoSemestre}
              graphicBy={graphicBy}
              isVariable={isVariable}
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
})(withStyles(styles)(Graphics));
