export default function knowNivelFormacion(values) {
  const ESPECIALIZACION = values.filter(
    value => value.NivelFormacion === "ESPECIALIZACIÓN"
  ).length;
  const TECNICO_PROFESIONAL = values.filter(
    value => value.NivelFormacion === "TÉCNICO PROFESIONAL"
  ).length;
  const LICENCIATURA = values.filter(
    value => value.NivelFormacion === "LICENCIATURA"
  ).length;
  const PREGRADO = values.filter(value => value.NivelFormacion === "PREGRADO")
    .length;
  const TECNOLOGIA = values.filter(
    value => value.NivelFormacion === "TECNOLOGÍA"
  ).length;
  const NO_NIVEL_FORMACION = values.filter(
    value => value.NivelFormacion === "NO NIVEL FORMACIÓN"
  ).length;

  const SUM_VALUES =
    ESPECIALIZACION +
    TECNICO_PROFESIONAL +
    LICENCIATURA +
    PREGRADO +
    TECNOLOGIA +
    NO_NIVEL_FORMACION;

  if (
    ESPECIALIZACION > 0 ||
    TECNICO_PROFESIONAL > 0 ||
    LICENCIATURA > 0 ||
    PREGRADO > 0 ||
    TECNOLOGIA > 0 ||
    NO_NIVEL_FORMACION > 0
  ) {
    return {
      ok: true,
      values: {
        ESPECIALIZACIÓN: Math.round((ESPECIALIZACION / SUM_VALUES) * 100),
        "TÉCNICO PROFESIONAL": Math.round(
          (TECNICO_PROFESIONAL / SUM_VALUES) * 100
        ),
        LICENCIATURA: Math.round((LICENCIATURA / SUM_VALUES) * 100),
        PREGRADO: Math.round((PREGRADO / SUM_VALUES) * 100),
        TECNOLOGÍA: Math.round((TECNOLOGIA / SUM_VALUES) * 100),
        "NO NIVEL FORMACIÓN": Math.round(
          (NO_NIVEL_FORMACION / SUM_VALUES) * 100
        )
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
