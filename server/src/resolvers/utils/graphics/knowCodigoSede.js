export default function knowCodigoSede(values) {
  const APU = values.filter(value => value.CodigoSede === "APU").length;
  const GIR = values.filter(value => value.CodigoSede === "GIR").length;
  const MES = values.filter(value => value.CodigoSede === "MES").length;
  const PAN = values.filter(value => value.CodigoSede === "PAN").length;
  const SIL = values.filter(value => value.CodigoSede === "SIL").length;
  const MEL = values.filter(value => value.CodigoSede === "MEL").length;
  const NO_CODIGO = values.filter(
    value => value.CodigoSede === "NO CÓDIGO DE SEDE"
  ).length;

  const SUM_VALUES = APU + GIR + MES + PAN + SIL + MEL + NO_CODIGO;

  if (
    APU > 0 ||
    GIR > 0 ||
    MES > 0 ||
    PAN > 0 ||
    SIL > 0 ||
    MEL > 0 ||
    NO_CODIGO > 0
  ) {
    return {
      ok: true,
      values: {
        APU: Math.round((APU / SUM_VALUES) * 100),
        GIR: Math.round((GIR / SUM_VALUES) * 100),
        MES: Math.round((MES / SUM_VALUES) * 100),
        PAN: Math.round((PAN / SUM_VALUES) * 100),
        SIL: Math.round((SIL / SUM_VALUES) * 100),
        MEL: Math.round((MEL / SUM_VALUES) * 100),
        "NO CÓDIGO DE SEDE": Math.round((NO_CODIGO / SUM_VALUES) * 100)
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
