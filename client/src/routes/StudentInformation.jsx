import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";

import Layout from "../components/Global";
import Loading from "../components/Global/Loading";

import { QueryStudentInformation } from "../graphql/query";

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing.unit
  },
  FormLabel: {
    fontWeight: "500",
    fontSize: 18
  }
});

const Headers = [
  "Código banner",
  "Periodo",
  "Nombre",
  "Apellido",
  "Genero",
  "Edad",
  "Numero de identificación",
  "Tipo Doc Identidad",
  "Nivel formación",
  "Código programa",
  "Descripción programa",
  "Jornada",
  "Area conocimiento",
  "Núcleo básico conocimiento",
  "IES",
  "Snies",
  "Rectoría",
  "Código de sede",
  "Sede",
  "Centro regional",
  "Código periodo académico",
  "Periodo académico inscripción",
  "Descripción de metodología",
  "Tipo de estudiante agrupado",
  "Lugar de residencia",
  "Teléfono celular",
  "Fecha de celular",
  "Teléfono de residencia",
  "Correo de estudiante 1",
  "Correo de estudiante 2",
  "Fecha de correo",
  "Dirección",
  "Departamento",
  "Ciudad",
  "Estado",
  "Comentario",
  "Situacion",
  "Variable"
];

const StudentInformation = ({ classes, match: { url, params }, typeUser }) => (
  <Layout url={url} typeUser={typeUser}>
    <Query query={QueryStudentInformation} variables={{ id: params._id }}>
      {({ loading, data: { Student } }) => {
        if (loading) {
          return <Loading />;
        }

        const values = Object.values(Student);

        return (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.title}>
                <h3>{`${Student.Nombres} ${Student.Apellidos}`}</h3>
              </div>
              <Grid container style={{ padding: 10 }}>
                {Headers.map((header, index) => (
                  <Fragment key={index}>
                    {index === 19 ? (
                      <Grid item xs={12} sm={6}>
                        <div>
                          <FormLabel className={classes.FormLabel}>
                            {header}:
                          </FormLabel>{" "}
                          <span>{values[index]}</span>
                        </div>
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={6}>
                        <div>
                          <FormLabel className={classes.FormLabel}>
                            {header}:
                          </FormLabel>{" "}
                          <span>{values[index]}</span>
                        </div>
                      </Grid>
                    )}
                  </Fragment>
                ))}
              </Grid>
            </Paper>
          </Grid>
        );
      }}
    </Query>
  </Layout>
);

export default withStyles(styles)(StudentInformation);
