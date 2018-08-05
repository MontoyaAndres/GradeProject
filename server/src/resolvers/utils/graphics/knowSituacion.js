export default async function knowSituacion(
  CodigoPrograma,
  TipoSemestre,
  isVariable,
  models
) {
  if (isVariable) {
    const SITUACIONES = [];
    const counts = {};

    await models.Student.find({
      CodigoPrograma,
      TipoSemestre,
      Variable: isVariable
    }).then(values => {
      // Saving situations on the "SITUACIONES" array
      values.filter(value => SITUACIONES.push(value.Situacion));
    });

    // Filling the "counts" object with situations
    SITUACIONES.forEach(i => {
      counts[i] = (counts[i] || 0) + 1;
    });

    // Get percent of the ages
    // eslint-disable-next-line
    for (const prop in counts) {
      counts[prop] = Math.round((counts[prop] / SITUACIONES.length) * 100);
    }

    if (Object.keys(counts).length) {
      return {
        ok: true,
        values: counts
      };
    }

    return {
      ok: true,
      errors: [{ path: "graphics", message: "No se encontraron datos." }]
    };
  }

  return {
    ok: false,
    errors: [
      { path: "graphics", message: "Especifique una variable para continuar." }
    ]
  };
}
