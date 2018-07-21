export default function knowJornada(values) {
  const DISTANCIA = values.filter(value => value.Jornada === 'DISTANCIA').length;
  const TOMORROW = values.filter(value => value.Jornada === 'MAÑANA').length;
  const NOCHE = values.filter(value => value.Jornada === 'NOCHE').length;
  const NO_JORNADA = values.filter(value => value.Jornada === 'NO JORNADA').length;

  const SUM_VALUES = DISTANCIA + TOMORROW + NOCHE + NO_JORNADA;

  if (DISTANCIA > 0 || TOMORROW > 0 || NOCHE > 0 || NO_JORNADA > 0) {
    return {
      ok: true,
      values: {
        DISTANCIA: Math.round((DISTANCIA / SUM_VALUES) * 100),
        MAÑANA: Math.round((TOMORROW / SUM_VALUES) * 100),
        NOCHE: Math.round((NOCHE / SUM_VALUES) * 100),
        'NO JORNADA': Math.round((NO_JORNADA / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: 'graphics', message: 'No se encontraron datos.' }]
  };
}
