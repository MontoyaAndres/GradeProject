import React from "react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FormLeft from "../components/UpdateStudent/FormLeft";
import FormRight from "../components/UpdateStudent/FormRight";

import Layout from "../components/Global";
import Loading from "../components/Global/Loading";
import SelectData from "../utils/SelectData";
import {
  StudentByParams,
  QueryStudentInformation,
  studentDistinct
} from "../graphql/query";

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit
  }
});

const updateStudentMutation = gql`
  mutation updateStudent(
    $id: ID!
    $CodigoBanner: String!
    $TipoSemestre: String!
    $Nombres: String!
    $Apellidos: String!
    $Genero: String!
    $Edad: String!
    $NumeroIdentificacion: String!
    $TipoDocIdentidad: String!
    $NivelFormacion: String!
    $CodigoPrograma: String!
    $DescripcionPrograma: String!
    $Jornada: String!
    $AreaConocimiento: String!
    $NucleoBasicoConocimiento: String!
    $IES: String!
    $Snies: String!
    $Rectoria: String!
    $CodigoSede: String!
    $Sede: String!
    $CentroRegional: String!
    $CodigoPeriodoAcademico: String!
    $PeriodoAcademicoInscripcion: String!
    $DescripcionMetodologia: String!
    $TipoEstudianteAgrupado: String!
    $LugarResidencia: String!
    $TelCel: String!
    $FechaCel: String!
    $TelRe: String!
    $CorreoEstudiante1: String!
    $CorreoEstudiante2: String!
    $FechaCorreo: String!
    $Direccion: String!
    $Departamento: String!
    $Ciudad: String!
    $Estado: String!
    $Comentario: String!
    $Situacion: String!
    $Variable: String!
  ) {
    updateStudent(
      _id: $id
      CodigoBanner: $CodigoBanner
      TipoSemestre: $TipoSemestre
      Nombres: $Nombres
      Apellidos: $Apellidos
      Genero: $Genero
      Edad: $Edad
      NumeroIdentificacion: $NumeroIdentificacion
      TipoDocIdentidad: $TipoDocIdentidad
      NivelFormacion: $NivelFormacion
      CodigoPrograma: $CodigoPrograma
      DescripcionPrograma: $DescripcionPrograma
      Jornada: $Jornada
      AreaConocimiento: $AreaConocimiento
      NucleoBasicoConocimiento: $NucleoBasicoConocimiento
      IES: $IES
      Snies: $Snies
      Rectoria: $Rectoria
      CodigoSede: $CodigoSede
      Sede: $Sede
      CentroRegional: $CentroRegional
      CodigoPeriodoAcademico: $CodigoPeriodoAcademico
      PeriodoAcademicoInscripcion: $PeriodoAcademicoInscripcion
      DescripcionMetodologia: $DescripcionMetodologia
      TipoEstudianteAgrupado: $TipoEstudianteAgrupado
      LugarResidencia: $LugarResidencia
      TelCel: $TelCel
      FechaCel: $FechaCel
      TelRe: $TelRe
      CorreoEstudiante1: $CorreoEstudiante1
      CorreoEstudiante2: $CorreoEstudiante2
      FechaCorreo: $FechaCorreo
      Direccion: $Direccion
      Departamento: $Departamento
      Ciudad: $Ciudad
      Estado: $Estado
      Comentario: $Comentario
      Situacion: $Situacion
      Variable: $Variable
    )
  }
`;

const UpdateStudent = ({
  classes,
  mutate,
  history,
  match: { url, params },
  typeUser
}) => (
  <Layout url={url} typeUser={typeUser}>
    <Query query={QueryStudentInformation} variables={{ id: params._id }}>
      {({ loading, data: { Student } }) => {
        if (loading) {
          return <Loading />;
        }

        return (
          <Formik
            initialValues={{
              Student
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              mutate({
                variables: { id: params._id, ...values.Student },
                refetchQueries: [
                  {
                    query: studentDistinct,
                    variables: {
                      param: "TipoSemestre"
                    }
                  },
                  {
                    query: QueryStudentInformation,
                    variables: {
                      id: params._id
                    }
                  },
                  {
                    query: StudentByParams,
                    variables: {
                      Search: "",
                      Variable: values.Student.Variable,
                      Situacion: values.Student.Situacion,
                      CodigoPrograma: values.Student.CodigoPrograma,
                      Estado: values.Student.Estado,
                      TipoSemestre: values.Student.TipoSemestre
                    }
                  }
                ]
              });
              history.push(`/carrera/${values.Student.CodigoPrograma}`);
            }}
            render={props => {
              const dataVariable = Object.getOwnPropertyNames(
                SelectData.VariableSituacion
              );
              // if variable is wrong it will send an empty array, by default variable will show "ACADÉMICO"
              const dataSituacion =
                SelectData.VariableSituacion[props.values.Student.Variable] ===
                undefined
                  ? SelectData.VariableSituacion[dataVariable[0]]
                  : SelectData.VariableSituacion[props.values.Student.Variable];

              return (
                <Paper className={classes.paper}>
                  <Form>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container justify="center" wrap="wrap">
                          <Grid item xs={12} sm={6}>
                            <div>
                              <FormLeft SelectData={SelectData} {...props} />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <div>
                              <FormRight
                                SelectData={SelectData}
                                dataSituacion={dataSituacion}
                                dataVariable={dataVariable}
                                {...props}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          variant="raised"
                          color="primary"
                          disabled={props.isSubmitting}
                          style={{ margin: 20 }}
                        >
                          Enviar datos
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </Paper>
              );
            }}
          />
        );
      }}
    </Query>
  </Layout>
);

export default graphql(updateStudentMutation)(
  withStyles(styles)(UpdateStudent)
);
