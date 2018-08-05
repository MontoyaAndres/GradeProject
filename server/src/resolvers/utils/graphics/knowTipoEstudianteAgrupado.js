export default function knowTipoEstudianteAgrupado(values) {
  const CONTINUO = values.filter(
    value => value.TipoEstudianteAgrupado === "CONTINUO"
  ).length;
  const PRIMERA_VEZ = values.filter(
    value => value.TipoEstudianteAgrupado === "PRIMERA VEZ"
  ).length;
  const NINGUNO = values.filter(
    value => value.TipoEstudianteAgrupado === "NINGUNO"
  ).length;

  const SUM_VALUES = CONTINUO + PRIMERA_VEZ + NINGUNO;

  if (CONTINUO > 0 || PRIMERA_VEZ > 0 || NINGUNO > 0) {
    return {
      ok: true,
      values: {
        CONTINUO: Math.round((CONTINUO / SUM_VALUES) * 100),
        "PRIMERA VEZ": Math.round((PRIMERA_VEZ / SUM_VALUES) * 100),
        NINGUNO: Math.round((NINGUNO / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
