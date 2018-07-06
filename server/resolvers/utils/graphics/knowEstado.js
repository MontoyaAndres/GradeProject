export default function knowEstado(values) {
  const AUSENTISMO = values.filter(value => value.Estado === 'AUSENTISMO').length;
  const DESERCION = values.filter(value => value.Estado === 'DESERCIÓN').length;
  const NO_ESTADO = values.filter(value => value.Estado === 'NO ESTADO').length;

  const SUM_VALUES = AUSENTISMO + DESERCION + NO_ESTADO;

  if (AUSENTISMO > 0 || DESERCION > 0 || NO_ESTADO > 0) {
    return {
      ok: true,
      values: {
        AUSENTISMO: Math.round((AUSENTISMO / SUM_VALUES) * 100),
        DESERCION: Math.round((DESERCION / SUM_VALUES) * 100),
        NO_ESTADO: Math.round((NO_ESTADO / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: 'graphics', message: 'No se encontraron datos.' }]
  };
}
