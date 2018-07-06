import gql from 'graphql-tag';

const StudentByParams = gql`
  query StudentByParams(
    $Search: String!
    $Variable: String!
    $Situacion: String!
    $CodigoPrograma: String!
    $Estado: String!
    $TipoSemestre: String!
  ) {
    StudentByParams(
      Search: $Search
      Variable: $Variable
      Situacion: $Situacion
      CodigoPrograma: $CodigoPrograma
      Estado: $Estado
      TipoSemestre: $TipoSemestre
    ) {
      _id
      CodigoBanner
      Nombres
      Apellidos
      Comentario
      Situacion
      Variable
    }
  }
`;

export { StudentByParams };