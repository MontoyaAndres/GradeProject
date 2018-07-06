export default function knowVariable(values) {
  const ACADEMICO = values.filter(value => value.Variable === 'ACADÉMICO').length;
  const FINANCIERA = values.filter(value => value.Variable === 'FINANCIERA').length;
  const NO_CONTACTO = values.filter(value => value.Variable === 'NO CONTACTO').length;
  const NO_PERTENECE = values.filter(value => value.Variable === 'NO PERTENECE A LA MATRIZ').length;
  const NO_GESTION = values.filter(value => value.Variable === 'NO SE REALIZÓ GESTIÓN POR PARTE DEL PROGRAMA').length;
  const PSICOSOCIAL = values.filter(value => value.Variable === 'PSICOSOCIAL').length;
  const NO_VARIABLE = values.filter(value => value.Variable === 'NO VARIABLE').length;

  const SUM_VALUES = ACADEMICO + FINANCIERA + NO_CONTACTO + NO_PERTENECE + NO_GESTION + PSICOSOCIAL + NO_VARIABLE;

  if (
    ACADEMICO > 0 ||
    FINANCIERA > 0 ||
    NO_CONTACTO > 0 ||
    NO_PERTENECE > 0 ||
    NO_GESTION > 0 ||
    PSICOSOCIAL > 0 ||
    NO_VARIABLE > 0
  ) {
    return {
      ok: true,
      values: {
        ACADEMICO: Math.round((ACADEMICO / SUM_VALUES) * 100),
        FINANCIERA: Math.round((FINANCIERA / SUM_VALUES) * 100),
        NO_CONTACTO: Math.round((NO_CONTACTO / SUM_VALUES) * 100),
        NO_PERTENECE: Math.round((NO_PERTENECE / SUM_VALUES) * 100),
        NO_GESTION: Math.round((NO_GESTION / SUM_VALUES) * 100),
        PSICOSOCIAL: Math.round((PSICOSOCIAL / SUM_VALUES) * 100),
        NO_VARIABLE: Math.round((NO_VARIABLE / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: 'graphics', message: 'No se encontraron datos.' }]
  };
}
