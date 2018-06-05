const UserModel = require('../../models/User');
const StudentModel = require('../../models/Student');
const { authenticate } = require('../../utils');

async function createStudent(_, {
  CodigoBanner,
  TipoSemestre,
  Nombres,
  Apellidos,
  Genero,
  Edad,
  NumeroIdentificacion,
  TipoDocIdentidad,
  NivelFormacion,
  CodigoPrograma,
  DescripcionPrograma,
  Jornada,
  AreaConocimiento,
  NucleoBasicoConocimiento,
  IES,
  Snies,
  Rectoria,
  CodigoSede,
  Sede,
  CentroRegional,
  CodigoPeriodoAcademico,
  PeriodoAcademicoInscripcion,
  DescripcionMetodologia,
  TipoEstudianteAgrupado,
  LugarResidencia,
  TelCel,
  FechaCel,
  TelRe,
  CorreoEstudiante1,
  CorreoEstudiante2,
  FechaCorreo,
  Direccion,
  Departamento,
  Ciudad,
  Estado,
  Comentario,
  Situacion,
  Variable
}, ctx) {
  const userId = authenticate(ctx);

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user) {
      const student = new StudentModel({
        CodigoBanner,
        TipoSemestre,
        Nombres,
        Apellidos,
        Genero,
        Edad,
        NumeroIdentificacion,
        TipoDocIdentidad,
        NivelFormacion,
        CodigoPrograma,
        DescripcionPrograma,
        Jornada,
        AreaConocimiento,
        NucleoBasicoConocimiento,
        IES,
        Snies,
        Rectoria,
        CodigoSede,
        Sede,
        CentroRegional,
        CodigoPeriodoAcademico,
        PeriodoAcademicoInscripcion,
        DescripcionMetodologia,
        TipoEstudianteAgrupado,
        LugarResidencia,
        TelCel,
        FechaCel,
        TelRe,
        CorreoEstudiante1,
        CorreoEstudiante2,
        FechaCorreo,
        Direccion,
        Departamento,
        Ciudad,
        Estado,
        Comentario,
        Situacion,
        Variable
      }).save();

      return student;
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function updateStudent(_, {
  _id,
  CodigoBanner,
  TipoSemestre,
  Nombres,
  Apellidos,
  Genero,
  Edad,
  NumeroIdentificacion,
  TipoDocIdentidad,
  NivelFormacion,
  CodigoPrograma,
  DescripcionPrograma,
  Jornada,
  AreaConocimiento,
  NucleoBasicoConocimiento,
  IES,
  Snies,
  Rectoria,
  CodigoSede,
  Sede,
  CentroRegional,
  CodigoPeriodoAcademico,
  PeriodoAcademicoInscripcion,
  DescripcionMetodologia,
  TipoEstudianteAgrupado,
  LugarResidencia,
  TelCel,
  FechaCel,
  TelRe,
  CorreoEstudiante1,
  CorreoEstudiante2,
  FechaCorreo,
  Direccion,
  Departamento,
  Ciudad,
  Estado,
  Comentario,
  Situacion,
  Variable
}, ctx) {
  const userId = authenticate(ctx);
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user) {
      await StudentModel.findByIdAndUpdate(_id, {
        CodigoBanner,
        TipoSemestre,
        Nombres,
        Apellidos,
        Genero,
        Edad,
        NumeroIdentificacion,
        TipoDocIdentidad,
        NivelFormacion,
        CodigoPrograma,
        DescripcionPrograma,
        Jornada,
        AreaConocimiento,
        NucleoBasicoConocimiento,
        IES,
        Snies,
        Rectoria,
        CodigoSede,
        Sede,
        CentroRegional,
        CodigoPeriodoAcademico,
        PeriodoAcademicoInscripcion,
        DescripcionMetodologia,
        TipoEstudianteAgrupado,
        LugarResidencia,
        TelCel,
        FechaCel,
        TelRe,
        CorreoEstudiante1,
        CorreoEstudiante2,
        FechaCorreo,
        Direccion,
        Departamento,
        Ciudad,
        Estado,
        Comentario,
        Situacion,
        Variable
      });

      return {
        _id,
        CodigoBanner,
        TipoSemestre,
        Nombres,
        Apellidos,
        Genero,
        Edad,
        NumeroIdentificacion,
        TipoDocIdentidad,
        NivelFormacion,
        CodigoPrograma,
        DescripcionPrograma,
        Jornada,
        AreaConocimiento,
        NucleoBasicoConocimiento,
        IES,
        Snies,
        Rectoria,
        CodigoSede,
        Sede,
        CentroRegional,
        CodigoPeriodoAcademico,
        PeriodoAcademicoInscripcion,
        DescripcionMetodologia,
        TipoEstudianteAgrupado,
        LugarResidencia,
        TelCel,
        FechaCel,
        TelRe,
        CorreoEstudiante1,
        CorreoEstudiante2,
        FechaCorreo,
        Direccion,
        Departamento,
        Ciudad,
        Estado,
        Comentario,
        Situacion,
        Variable
      };
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteStudent(_, { _id }, ctx) {
  const userId = authenticate(ctx);

  try {
    await StudentModel.findByIdAndRemove({ _id });

    return {
      _id
    };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent
}
