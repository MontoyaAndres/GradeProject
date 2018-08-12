import React, { PureComponent } from "react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormLabel from "@material-ui/core/FormLabel";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Info from "@material-ui/icons/Info";

import Successfully from "../Global/Successfully";
import Loading from "../Global/Loading";
import Seacher from "./Searcher";
import { StudentByParams } from "../../graphql/query";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "60%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  error: {
    color: "#D8000C",
    backgroundColor: "#FFBABA",
    textAlign: "center",
    padding: theme.spacing.unit * 3
  },
  FormLabel: {
    fontWeight: "500",
    fontSize: 18
  }
});

const deleteStudentMutation = gql`
  mutation($id: ID!) {
    deleteStudent(_id: $id)
  }
`;

class index extends PureComponent {
  state = {
    deleted: false,
    studenIdDelete: 0,
    successDeleted: false,
    searchStudent: "",
    page: 0,
    hasMoreItems: true
  };

  componentDidUpdate(prevProps, prevState) {
    const { Variable, Situacion, Estado, TipoSemestre } = this.props;

    if (prevState.successDeleted) {
      // if the student was deleted, this will format the state successDeleted
      this.setState({ successDeleted: false });
    }

    if (
      prevProps.Variable !== Variable ||
      prevProps.Situacion !== Situacion ||
      prevProps.Estado !== Estado ||
      prevProps.TipoSemestre !== TipoSemestre
    ) {
      this.setState({ searchStudent: "" });
    }
  }

  // It'll show one alert which will ask if the user wants to delete the student
  displayAlert = () => {
    const { deleted } = this.state;
    return (
      <div>
        <Dialog
          open={deleted}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Eliminar periodo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si da click en si, el estudiante será eliminado. ¿Esta seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDeleteStudent()} color="primary">
              Sí
            </Button>
            <Button
              onClick={() => this.handleClose()}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  handleClose = () => {
    this.setState({ deleted: false, studenIdDelete: 0 });
  };

  handleDeleteStudent = async () => {
    const { studenIdDelete, searchStudent, page } = this.state;
    const {
      Variable,
      Situacion,
      CodigoPrograma,
      Estado,
      TipoSemestre,
      mutate
    } = this.props;

    await mutate({
      variables: { id: studenIdDelete },
      refetchQueries: [
        {
          query: StudentByParams,
          variables: {
            Search: searchStudent,
            Variable,
            Situacion,
            CodigoPrograma,
            Estado,
            TipoSemestre,
            page
          }
        }
      ]
    });

    this.setState({ deleted: false, studenIdDelete: 0, successDeleted: true });
  };

  handleSearchStudent = search => {
    this.setState({ searchStudent: search });
  };

  handleRedirect = link => {
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const {
      classes,
      Variable,
      Situacion,
      CodigoPrograma,
      Estado,
      TipoSemestre,
      typeUser
    } = this.props;
    const {
      page,
      hasMoreItems,
      deleted,
      successDeleted,
      searchStudent
    } = this.state;

    return (
      <Query
        query={StudentByParams}
        variables={{
          Search: searchStudent,
          Variable,
          Situacion,
          CodigoPrograma,
          Estado,
          TipoSemestre,
          page
        }}
        fetchPolicy="network-only"
      >
        {({ loading, data, fetchMore }) => {
          if (loading) {
            return <Loading />;
          }

          if (data.StudentByParams.student.length === 0) {
            return (
              <Paper className={classes.error}>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <ErrorIcon />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    No se encontraron datos.
                  </Grid>
                </Grid>
              </Paper>
            );
          }

          return (
            <div className={classes.root}>
              {/* To ask if the user want to delete the student */}
              {deleted ? this.displayAlert() : null}

              {/* To show one alert which will show a message */}
              <Successfully
                hide={successDeleted}
                message="Estudiante eliminado con exito!"
              />

              {/* Button to find students */}
              <Seacher onHandleSearchStudent={this.handleSearchStudent} />

              {data.StudentByParams.student.map((student, i) => (
                <ExpansionPanel key={i}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={classes.heading}>{student.Apellidos}</span>
                    <span className={classes.secondaryHeading}>
                      {student.CodigoBanner}
                    </span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          wrap="nowrap"
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid item xs>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Código Banner:
                              </FormLabel>{" "}
                              {student.CodigoBanner}
                            </div>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Nombre:
                              </FormLabel>{" "}
                              {student.Nombres}
                            </div>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Apellidos:
                              </FormLabel>{" "}
                              {student.Apellidos}
                            </div>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Comentario:
                              </FormLabel>{" "}
                              {student.Comentario}
                            </div>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Situación:
                              </FormLabel>{" "}
                              {student.Situacion}
                            </div>
                            <div>
                              <FormLabel className={classes.FormLabel}>
                                Variable:
                              </FormLabel>{" "}
                              {student.Variable}
                            </div>
                          </Grid>
                        </Grid>
                        <div style={{ textAlign: "center" }}>
                          {typeUser === "admin" ? (
                            <IconButton
                              aria-label="Delete"
                              onClick={() =>
                                this.setState({
                                  deleted: true,
                                  studenIdDelete: student._id
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
                          <IconButton
                            aria-label="Update"
                            onClick={() =>
                              this.handleRedirect(`/editar/${student._id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Information"
                            onClick={() =>
                              this.handleRedirect(`/estudiante/${student._id}`)
                            }
                          >
                            <Info />
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}

              {hasMoreItems && (
                <div style={{ textAlign: "center", padding: 10 }}>
                  <Button
                    color="primary"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          Search: searchStudent,
                          Variable,
                          Situacion,
                          CodigoPrograma,
                          Estado,
                          TipoSemestre,
                          page
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                          this.setState({ page: page + 1 });

                          if (!fetchMoreResult) {
                            return previousResult;
                          }

                          if (
                            fetchMoreResult.StudentByParams.student.length ===
                            data.StudentByParams.count
                          ) {
                            this.setState({ hasMoreItems: false });
                          }

                          return {
                            ...previousResult,
                            StudentByParams: {
                              ...previousResult.StudentByParams,
                              ...fetchMoreResult.StudentByParams
                            }
                          };
                        }
                      });
                    }}
                  >
                    Ver más
                  </Button>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default graphql(deleteStudentMutation)(withStyles(styles)(index));
