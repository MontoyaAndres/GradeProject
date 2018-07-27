import Student from '../models/Student';

async function downloadFilePeriod(request, response) {
  const { CodigoPrograma, TipoSemestre } = request.params;

  try {
    await Student.find({ CodigoPrograma, TipoSemestre }, { _id: 0 })
      .select(
        'CodigoBanner Nombres Apellidos Genero Edad NumeroIdentificacion TipoDocIdentidad NivelFormacion CodigoPrograma DescripcionPrograma Jornada AreaConocimiento NucleoBasicoConocimiento IES Snies Rectoria CodigoSede Sede CentroRegional CodigoPeriodoAcademico PeriodoAcademicoInscripcion DescripcionMetodologia TipoEstudianteAgrupado LugarResidencia TelCel FechaCel TelRe CorreoEstudiante1 CorreoEstudiante2 FechaCorreo Direccion Departamento Ciudad Comentario Situacion Variable'
      )
      .lean()
      .exec(async (err, doc) => {
        const json = await doc.map(data =>
          JSON.parse(
            JSON.stringify(data)
              .replace('"CodigoPrograma"', '"Código Programa"')
              .replace('"CodigoBanner"', '"Código Banner"')
              .replace('"NumeroIdentificacion"', '"Numero Identificación"')
              .replace('"TipoDocIdentidad"', '"Tipo Doc Identidad"')
              .replace('"NivelFormacion"', '"Nivel Formación"')
              .replace('"DescripcionPrograma"', '"Descripción Programa"')
              .replace('"AreaConocimiento"', '"Area Conocimiento"')
              .replace('"NucleoBasicoConocimiento"', '"Núcleo Básico Conocimiento"')
              .replace('"CodigoSede"', '"Código Sede"')
              .replace('"CentroRegional"', '"Centro Regional"')
              .replace('"CodigoPeriodoAcademico"', '"Código Periodo Académico"')
              .replace('"PeriodoAcademicoInscripcion"', '"Periodo Académico Inscripción"')
              .replace('"DescripciónMetodologia"', '"Descripción Metodología"')
              .replace('"TipoEstudianteAgrupado"', '"Tipo Estudiante Agrupado"')
              .replace('"LugarResidencia"', '"Lugar Residencia"')
          )
        );
        await response.xls(`${CodigoPrograma} ${TipoSemestre}.xlsx`, json);
      });
  } catch (e) {
    response
      .status(500)
      .send({ error: 'No se pudo descargar el archivo, por favor consultar con el administrador de la página.' });
  }
}

async function downloadFileCompared(request, response) {
  try {
    const { periodSelected1, periodSelected2, career, periodSelected } = request.params;
    // If the periodSelect is empty, it'll take the periodSelected1 by default.
    const period1 = periodSelected1; // first period
    const period2 = periodSelected2; // second period

    const exists = [];

    const periodData1 = await Student.find({ TipoSemestre: period1, CodigoPrograma: career }, { _id: 0 })
      .select(
        'TipoSemestre CodigoBanner Nombres Apellidos Genero Edad NumeroIdentificacion TipoDocIdentidad NivelFormacion CodigoPrograma DescripcionPrograma Jornada AreaConocimiento NucleoBasicoConocimiento IES Snies Rectoria CodigoSede Sede CentroRegional CodigoPeriodoAcademico PeriodoAcademicoInscripcion DescripcionMetodologia TipoEstudianteAgrupado LugarResidencia TelCel FechaCel TelRe CorreoEstudiante1 CorreoEstudiante2 FechaCorreo Direccion Departamento Ciudad Comentario Situacion Variable'
      )
      .lean();

    const periodData2 = await Student.find({ TipoSemestre: period2, CodigoPrograma: career }, { _id: 0 })
      .select(
        'TipoSemestre CodigoBanner Nombres Apellidos Genero Edad NumeroIdentificacion TipoDocIdentidad NivelFormacion CodigoPrograma DescripcionPrograma Jornada AreaConocimiento NucleoBasicoConocimiento IES Snies Rectoria CodigoSede Sede CentroRegional CodigoPeriodoAcademico PeriodoAcademicoInscripcion DescripcionMetodologia TipoEstudianteAgrupado LugarResidencia TelCel FechaCel TelRe CorreoEstudiante1 CorreoEstudiante2 FechaCorreo Direccion Departamento Ciudad Comentario Situacion Variable'
      )
      .lean();

    await periodData1.forEach(data1 => {
      periodData2.forEach(data2 => {
        if (data1.CodigoBanner === data2.CodigoBanner) {
          // it'll pass the data (data1 and data2 have the same info) but the rest info is different.
          if (data1.TipoSemestre === periodSelected) {
            exists.push(data1);
          } else if (data2.TipoSemestre === periodSelected) {
            exists.push(data2);
          }
        }
      });
    });

    const json = await exists.map(data => {
      // Delete TipoSemestre from data it's not necessary
      delete data.TipoSemestre;

      return JSON.parse(
        JSON.stringify(data)
          .replace('"CodigoPrograma"', '"Código Programa"')
          .replace('"CodigoBanner"', '"Código Banner"')
          .replace('"NumeroIdentificacion"', '"Numero Identificación"')
          .replace('"TipoDocIdentidad"', '"Tipo Doc Identidad"')
          .replace('"NivelFormacion"', '"Nivel Formación"')
          .replace('"DescripcionPrograma"', '"Descripción Programa"')
          .replace('"AreaConocimiento"', '"Area Conocimiento"')
          .replace('"NucleoBasicoConocimiento"', '"Núcleo Básico Conocimiento"')
          .replace('"CodigoSede"', '"Código Sede"')
          .replace('"CentroRegional"', '"Centro Regional"')
          .replace('"CodigoPeriodoAcademico"', '"Código Periodo Académico"')
          .replace('"PeriodoAcademicoInscripcion"', '"Periodo Académico Inscripción"')
          .replace('"DescripciónMetodologia"', '"Descripción Metodología"')
          .replace('"TipoEstudianteAgrupado"', '"Tipo Estudiante Agrupado"')
          .replace('"LugarResidencia"', '"Lugar Residencia"')
      );
    });

    await response.xls(`${career} ${periodSelected}.xlsx`, json);
  } catch (e) {
    response
      .status(500)
      .send({ error: 'No se pudo descargar el archivo, por favor consultar con el administrador de la página.' });
  }
}

export { downloadFilePeriod, downloadFileCompared };
