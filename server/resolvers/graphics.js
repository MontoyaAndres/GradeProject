import requiresAuth from '../utils/permissions';

export default {
  Query: {
    Graphics: requiresAuth.createResolver((parent, { CodigoPrograma, TipoSemestre, graphicBy }, { models }) => {
      if (graphicBy === 'Género') {
      }
      return true;
    })
  }
};
