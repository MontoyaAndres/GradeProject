import requiresAuth from '../utils/permissions';

export default {
  Query: {
    compareStudents: requiresAuth.createResolver(async (parent, { periodSelected, career }, { models }) => {
      const period1 = periodSelected[0]; // first period
      const period2 = periodSelected[1]; // second period

      const exists = [];

      const periodData1 = await models.Student.find({ TipoSemestre: period1, CodigoPrograma: career });
      const periodData2 = await models.Student.find({ TipoSemestre: period2, CodigoPrograma: career });

      await periodData1.forEach(data1 => {
        periodData2.forEach(data2 => {
          if (data1.CodigoBanner === data2.CodigoBanner) {
            // it'll pass the data (data1 and data2 have the same info).
            exists.push(data1);
          }
        });
      });

      if (exists.length > 0) {
        return {
          ok: true,
          students: exists
        };
      }
      return {
        ok: false,
        errors: [{ path: 'compare', message: 'No se encontraron datos.' }]
      };
    })
  }
};
