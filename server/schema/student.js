export default `
  type Student {
    _id: ID!
    CodigoBanner: Int,
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
    ok: Boolean!
    student: Student
    errors: [Error]
  }

  type AvoidResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Query {
    allStudents: [Student!]!
    Student(_id: ID!): Student
    StudentByParams(Variable: String, Situacion: String, CodigoPrograma: String, Estado: String, TipoSemestre: String): [Student]
    StudentDistinct(Param: String!): [String]
  }

  type Mutation {
    createStudent(
      CodigoBanner: Int,
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
    ): StudentResponse!
    updateStudent(
      _id: ID!,
      CodigoBanner: Int,
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
    ): AvoidResponse!
    deleteStudent(_id: ID!): Boolean!,
    deleteTipoSemestre(TipoSemestre: String!): Boolean!
  }
`;
