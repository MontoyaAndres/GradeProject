export default `
  type Student {
    _id: ID!
    CodigoBanner: String,
    TipoSemestre: String,
    Nombres: String,
    Apellidos: String,
    Genero: String,
    Edad: Int,
    NumeroIdentificacion: Int,
    TipoDocIdentidad: String,
    NivelFormacion: String,
    CodigoPrograma: String,
    DescripcionPrograma: String,
    Jornada: String,
    AreaConocimiento: String,
    NucleoBasicoConocimiento: String,
    IES: Int,
    Snies: Int,
    Rectoria: String,
    CodigoSede: String,
    Sede: String,
    CentroRegional: String,
    CodigoPeriodoAcademico: Int,
    PeriodoAcademicoInscripcion: Int,
    DescripcionMetodologia: String,
    TipoEstudianteAgrupado: String,
    LugarResidencia: Int,
    TelCel: String,
    FechaCel: String,
    TelRe: String,
    CorreoEstudiante1: String,
    CorreoEstudiante2: String,
    FechaCorreo: String,
    Direccion: String,
    Departamento: String,
    Ciudad: String,
    Estado: String,
    Comentario: String,
    Situacion: String,
    Variable: String
  }

  type StudentResponse {
    student: [Student],
    count: Int
  }

  type Query {
    Student(_id: ID!): Student
    StudentByParams(Search: String, Variable: String, Situacion: String, CodigoPrograma: String, Estado: String, TipoSemestre: String, page: Int = 0, rowsPerPage: Int = 10): StudentResponse
    StudentDistinct(Param: String!): [String]
  }

  type Mutation {
    updateStudent(
      _id: ID!,
      CodigoBanner: String,
      TipoSemestre: String,
      Nombres: String,
      Apellidos: String,
      Genero: String,
      Edad: String,
      NumeroIdentificacion: String,
      TipoDocIdentidad: String,
      NivelFormacion: String,
      CodigoPrograma: String,
      DescripcionPrograma: String,
      Jornada: String,
      AreaConocimiento: String,
      NucleoBasicoConocimiento: String,
      IES: String,
      Snies: String,
      Rectoria: String,
      CodigoSede: String,
      Sede: String,
      CentroRegional: String,
      CodigoPeriodoAcademico: String,
      PeriodoAcademicoInscripcion: String,
      DescripcionMetodologia: String,
      TipoEstudianteAgrupado: String,
      LugarResidencia: String,
      TelCel: String,
      FechaCel: String,
      TelRe: String,
      CorreoEstudiante1: String,
      CorreoEstudiante2: String,
      FechaCorreo: String,
      Direccion: String,
      Departamento: String,
      Ciudad: String,
      Estado: String,
      Comentario: String,
      Situacion: String,
      Variable: String
    ): Boolean!
    deleteStudent(_id: ID!): Boolean!,
    deleteTipoSemestre(TipoSemestre: String!): Boolean!
  }
`;
