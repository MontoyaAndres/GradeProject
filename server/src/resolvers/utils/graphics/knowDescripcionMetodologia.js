export default function knowDescripcionMetodologia(values) {
  const DISTANCIA = values.filter(
    value => value.DescripcionMetodologia === "DISTANCIA"
  ).length;
  const DISTANCIA_TRADICIONAL = values.filter(
    value => value.DescripcionMetodologia === "DISTANCIA (TRADICIONAL)"
  ).length;
  const PRESENCIAL = values.filter(
    value => value.DescripcionMetodologia === "PRESENCIAL"
  ).length;
  const NO_DESCRIPCION = values.filter(
    value => value.DescripcionMetodologia === "NO DESCRIPCIÓN"
  ).length;

  const SUM_VALUES =
    DISTANCIA + DISTANCIA_TRADICIONAL + PRESENCIAL + NO_DESCRIPCION;

  if (
    DISTANCIA > 0 ||
    DISTANCIA_TRADICIONAL > 0 ||
    PRESENCIAL > 0 ||
    NO_DESCRIPCION > 0
  ) {
    return {
      ok: true,
      values: {
        DISTANCIA: Math.round((DISTANCIA / SUM_VALUES) * 100),
        "DISTANCIA (TRADICIONAL)": Math.round(
          (DISTANCIA_TRADICIONAL / SUM_VALUES) * 100
        ),
        PRESENCIAL: Math.round((PRESENCIAL / SUM_VALUES) * 100),
        "NO DESCRIPCIÓN": Math.round((NO_DESCRIPCION / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
