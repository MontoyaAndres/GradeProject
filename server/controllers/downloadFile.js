const Student = require('../models/Student');

module.exports = {
  async downloadFile(request, response) {
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
};
