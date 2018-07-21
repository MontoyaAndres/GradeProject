export default function knowTipoDocIdentidad(values) {
  const CEDULA = values.filter(value => value.TipoDocIdentidad === 'CC-CÉDULA DE CIUDADANIA').length;
  const TARJETA = values.filter(value => value.TipoDocIdentidad === 'TI-TARJETA DE IDENTIDAD').length;
  const NODOCUMENTO = values.filter(value => value.TipoDocIdentidad === 'NO DOCUMENTO').length;

  if (CEDULA > 0 || TARJETA > 0 || NODOCUMENTO > 0) {
    return {
      ok: true,
      values: {
        'CC-CÉDULA DE CIUDADANIA': Math.round((CEDULA / (CEDULA + TARJETA + NODOCUMENTO)) * 100),
        'TI-TARJETA DE IDENTIDAD': Math.round((TARJETA / (CEDULA + TARJETA + NODOCUMENTO)) * 100),
        'NO DOCUMENTO': Math.round((NODOCUMENTO / (CEDULA + TARJETA + NODOCUMENTO)) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: 'graphics', message: 'No se encontraron datos.' }]
  };
}
