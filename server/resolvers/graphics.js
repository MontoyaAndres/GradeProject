import requiresAuth from '../utils/permissions';
import {
  knowGenre,
  knowAge,
  knowTipoDocIdentidad,
  knowNivelFormacion,
  knowJornada,
  knowCodigoSede,
  knowDescripcionMetodologia,
  knowTipoEstudianteAgrupado,
  knowEstado,
  knowVariable,
  knowSituacion
} from './utils/graphics';

export default {
  Query: {
    Graphics: requiresAuth.createResolver(
      (parent, { CodigoPrograma, TipoSemestre, graphicBy, isVariable }, { models }) => {
        const query = models.Student.find({ CodigoPrograma, TipoSemestre });

        switch (graphicBy) {
          case 'Género':
            return query.then(values => knowGenre(values));

          case 'Edad':
            return query.then(values => knowAge(values));

          case 'Tipo Doc Identidad':
            return query.then(values => knowTipoDocIdentidad(values));

          case 'Nivel Formación':
            return query.then(values => knowNivelFormacion(values));

          case 'Jornada':
            return query.then(values => knowJornada(values));

          case 'Código Sede':
            return query.then(values => knowCodigoSede(values));

          case 'Descripción Metodología':
            return query.then(values => knowDescripcionMetodologia(values));

          case 'Tipo Estudiante Agrupado':
            return query.then(values => knowTipoEstudianteAgrupado(values));

          case 'Estado':
            return query.then(values => knowEstado(values));

          case 'Variable':
            return query.then(values => knowVariable(values));

          case 'Situacion':
            return knowSituacion(CodigoPrograma, TipoSemestre, isVariable, models);

          default:
            return {
              ok: true,
              errors: [{ path: 'graphics', message: 'No se encontraron datos.' }]
            };
        }
      }
    )
  }
};
