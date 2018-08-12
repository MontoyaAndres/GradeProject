import gql from "graphql-tag";

const StudentByParams = gql`
  query StudentByParams(
    $Search: String!
    $Variable: String!
    $Situacion: String!
    $CodigoPrograma: String!
    $Estado: String!
    $TipoSemestre: String
    $page: Int
    $rowsPerPage: Int
  ) {
    StudentByParams(
      Search: $Search
      Variable: $Variable
      Situacion: $Situacion
      CodigoPrograma: $CodigoPrograma
      Estado: $Estado
      TipoSemestre: $TipoSemestre
      page: $page
      rowsPerPage: $rowsPerPage
    ) {
      student {
        _id
        CodigoBanner
        Nombres
        Apellidos
        Comentario
        Situacion
        Variable
      }
      count
    }
  }
`;

const userQuery = gql`
  query user {
    user {
      username
      email
    }
  }
`;

const studentDistinct = gql`
  query StudentDistinct($param: String) {
    StudentDistinct(Param: $param)
  }
`;

const QueryStudentInformation = gql`
  query Student($id: ID!) {
    Student(_id: $id) {
      CodigoBanner
      TipoSemestre
      Nombres
      Apellidos
      Genero
      Edad
      NumeroIdentificacion
      TipoDocIdentidad
      NivelFormacion
      CodigoPrograma
      DescripcionPrograma
      Jornada
      AreaConocimiento
      NucleoBasicoConocimiento
      IES
      Snies
      Rectoria
      CodigoSede
      Sede
      CentroRegional
      CodigoPeriodoAcademico
      PeriodoAcademicoInscripcion
      DescripcionMetodologia
      TipoEstudianteAgrupado
      LugarResidencia
      TelCel
      FechaCel
      TelRe
      CorreoEstudiante1
      CorreoEstudiante2
      FechaCorreo
      Direccion
      Departamento
      Ciudad
      Estado
      Comentario
      Situacion
      Variable
    }
  }
`;

const ListUsersQuery = gql`
  query listUsers {
    listUsers {
      _id
      username
      email
      type
    }
  }
`;

export {
  StudentByParams,
  userQuery,
  studentDistinct,
  QueryStudentInformation,
  ListUsersQuery
};
