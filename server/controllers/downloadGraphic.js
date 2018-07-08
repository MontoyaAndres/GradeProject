import XLSXChart from 'xlsx-chart';

// db model
import models from '../models';

// special functions
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
} from '../resolvers/utils/graphics';

const xlsxChart = new XLSXChart();

function styleChart(style) {
  if (style === 'Bar') {
    return 'column';
  }

  if (style === 'Line') {
    return 'area';
  }

  if (style === 'Pie') {
    return 'pie';
  }

  if (style === 'Doughnut') {
    // xlsxChart doesn't support Doughnut
    return 'pie';
  }

  // default chart
  return 'column';
}

function dataType(style, keys, values, graphicBy) {
  const data = keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        [curr]: values[curr]
      }
    }),
    {}
  );

  if (style === 'Bar' || style === 'Line') {
    return {
      chart: styleChart(style),
      titles: keys,
      fields: keys,
      data,
      chartTitle: `Gráfica por ${graphicBy}`
    };
  }

  if (style === 'Pie' || style === 'Doughnut') {
    return {
      chart: styleChart(style),
      titles: ['datos'],
      fields: keys,
      data: {
        datos: values
      },
      chartTitle: `Gráfica por ${graphicBy}`
    };
  }
}

function dataXLSX(style, query, graphicBy, response) {
  if (query.ok) {
    const { values } = query;
    const keys = Object.keys(values);
    const config = dataType(style, keys, values, graphicBy);

    xlsxChart.generate(config, (err, excel) => {
      response.set({
        'Content-Type': 'application/vnd.ms-excel',
        'Content-Disposition': `attachment; filename=Gráfica_por_${graphicBy}.xlsx`,
        'Content-Length': excel.length
      });
      response.status(200).send(excel);
    });
  }

  if (query.errors) {
    response.status(400).send({ errors: query.errors });
  }
}

function downloadGraphic(request, response) {
  const { style, CodigoPrograma, TipoSemestre, graphicBy, isVariable } = request.params;

  try {
    const query = models.Student.find({ CodigoPrograma, TipoSemestre });

    if (graphicBy === 'Género') {
      query.then(values => {
        const Genre = knowGenre(values);
        dataXLSX(style, Genre, graphicBy, response);
      });
    }

    if (graphicBy === 'Edad') {
      query.then(values => {
        const Edad = knowAge(values);
        dataXLSX(style, Edad, graphicBy, response);
      });
    }

    if (graphicBy === 'Tipo Doc Identidad') {
      query.then(values => {
        const TipoDocIdentidad = knowTipoDocIdentidad(values);
        dataXLSX(style, TipoDocIdentidad, graphicBy, response);
      });
    }

    if (graphicBy === 'Nivel Formación') {
      query.then(values => {
        const NivelFormacion = knowNivelFormacion(values);
        dataXLSX(style, NivelFormacion, graphicBy, response);
      });
    }

    if (graphicBy === 'Jornada') {
      query.then(values => {
        const Jornada = knowJornada(values);
        dataXLSX(style, Jornada, graphicBy, response);
      });
    }

    if (graphicBy === 'Código Sede') {
      query.then(values => {
        const CodigoSede = knowCodigoSede(values);
        dataXLSX(style, CodigoSede, graphicBy, response);
      });
    }

    if (graphicBy === 'Descripción Metodología') {
      query.then(values => {
        const DescripcionMetodologia = knowDescripcionMetodologia(values);
        dataXLSX(style, DescripcionMetodologia, graphicBy, response);
      });
    }

    if (graphicBy === 'Tipo Estudiante Agrupado') {
      query.then(values => {
        const TipoEstudianteAgrupado = knowTipoEstudianteAgrupado(values);
        dataXLSX(style, TipoEstudianteAgrupado, graphicBy, response);
      });
    }

    if (graphicBy === 'Estado') {
      query.then(values => {
        const Estado = knowEstado(values);
        dataXLSX(style, Estado, graphicBy, response);
      });
    }

    if (graphicBy === 'Variable') {
      query.then(values => {
        const Variable = knowVariable(values);
        dataXLSX(style, Variable, graphicBy, response);
      });
    }

    if (graphicBy === 'Situacion') {
      const Situacion = knowSituacion(CodigoPrograma, TipoSemestre, isVariable, models);
      Situacion.then(data => {
        dataXLSX(style, data, graphicBy, response);
      });
    }
  } catch (e) {
    console.log(e);
    response
      .status(500)
      .send({ error: 'No se pudo descargar el archivo, por favor consultar con el administrador de la página.' });
  }
}

export { downloadGraphic };
