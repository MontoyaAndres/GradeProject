import formatErrors from '../utils/formatErrors';
import requiresAuth from '../utils/permissions';

export default {
  Query: {
    Student: requiresAuth.createResolver((parent, { _id }, { models }) => models.Student.findOne({ _id }).lean()),
    StudentByParams: requiresAuth.createResolver(
      (parent, { Search, Variable, Situacion, CodigoPrograma, Estado, TipoSemestre }, { models }) => {
        let student = '';

        // if "Search" is different to an empty string.
        if (!Search) {
          if (Variable === 'TODO' && Situacion === 'TODO' && Estado && TipoSemestre) {
            student = models.Student.find({ CodigoPrograma, Estado, TipoSemestre });
          } else if (Variable !== 'TODO' && Situacion === 'TODO' && Estado && TipoSemestre) {
            student = models.Student.find({ CodigoPrograma, Variable, Estado, TipoSemestre });
          } else {
            student = models.Student.find({
              CodigoPrograma,
              TipoSemestre,
              Situacion,
              Variable,
              Estado
            });
          }

          return student;
        }

        // if not, it'll return the student/s depending of the name, lastname or id
        const param = new RegExp(Search);
        student = models.Student.find({
          CodigoPrograma,
          $or: [{ Nombres: param }, { Apellidos: param }, { CodigoBanner: param }]
        }).limit(10);

        return student;
      }
    ),
    StudentDistinct: requiresAuth.createResolver((parent, { Param }, { models }) =>
      models.Student.find()
        .distinct(Param)
        .lean()
    )
  },
  Mutation: {
    createStudent: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        const student = new models.Student(args).save();
        return {
          ok: true,
          student
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }),
    updateStudent: requiresAuth.createResolver(
      async (
        parent,
        {
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
        },
        { models }
      ) => {
        try {
          await models.Student.findByIdAndUpdate(_id, {
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
          return true;
        } catch (err) {
          return false;
        }
      }
    ),
    deleteStudent: requiresAuth.createResolver(async (parent, { _id }, { models }) => {
      try {
        await models.Student.findByIdAndRemove({ _id });
        return true;
      } catch (err) {
        return false;
      }
    }),
    deleteTipoSemestre: requiresAuth.createResolver(async (parent, { TipoSemestre }, { models }) => {
      try {
        await models.Student.deleteMany({ TipoSemestre });
        return true;
      } catch (err) {
        return false;
      }
    })
  }
};
