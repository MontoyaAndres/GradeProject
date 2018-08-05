import requiresAuth from "../utils/permissions";

export default {
  Query: {
    Student: requiresAuth.createResolver((parent, { _id }, { models }) =>
      models.Student.findOne({ _id }).lean()
    ),
    StudentByParams: requiresAuth.createResolver(
      (
        parent,
        {
          Search,
          Variable,
          Situacion,
          CodigoPrograma,
          Estado,
          TipoSemestre,
          page,
          rowsPerPage
        },
        { models }
      ) => {
        let student = [];

        // How many students there
        const count = models.Student.count({
          CodigoPrograma,
          TipoSemestre,
          Situacion,
          Variable,
          Estado
        }).exec();

        // if "Search" is different a empty string.
        if (!Search) {
          student = models.Student.find({
            CodigoPrograma,
            TipoSemestre,
            Situacion,
            Variable,
            Estado
          }).limit(rowsPerPage * (page === 0 ? 1 : page + 1));
        } else {
          // if not, it'll return the student/s depending of the name, lastname or id
          const param = new RegExp(Search);
          student = models.Student.find({
            CodigoPrograma,
            $or: [
              { Nombres: param },
              { Apellidos: param },
              { CodigoBanner: param }
            ]
          }).limit(10 * (page === 0 ? 1 : page + 1));
        }

        return {
          student,
          count
        };
      }
    ),
    StudentDistinct: requiresAuth.createResolver(
      (parent, { Param }, { StudentDistinctLoader }) =>
        StudentDistinctLoader.load(Param)
    )
  },
  Mutation: {
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
    deleteStudent: requiresAuth.createResolver(
      async (parent, { _id }, { models }) => {
        try {
          await models.Student.findByIdAndRemove({ _id });
          return true;
        } catch (err) {
          return false;
        }
      }
    ),
    deleteTipoSemestre: requiresAuth.createResolver(
      async (parent, { TipoSemestre }, { models }) => {
        try {
          await models.Student.deleteMany({ TipoSemestre });
          return true;
        } catch (err) {
          return false;
        }
      }
    )
  }
};
