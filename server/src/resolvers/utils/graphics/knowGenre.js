export default function knowGenre(values) {
  const MASCULINO = values.filter(value => value.Genero === "MASCULINO").length;
  const FEMENINO = values.filter(value => value.Genero === "FEMENINO").length;
  const NOGENERO = values.filter(value => value.Genero === "NO GENERO").length;

  if (MASCULINO > 0 || FEMENINO > 0 || NOGENERO > 0) {
    return {
      ok: true,
      values: {
        MASCULINO: Math.round(
          (MASCULINO / (MASCULINO + FEMENINO + NOGENERO)) * 100
        ),
        FEMENINO: Math.round(
          (FEMENINO / (MASCULINO + FEMENINO + NOGENERO)) * 100
        ),
        "NO GENERO": Math.round(
          (NOGENERO / (MASCULINO + FEMENINO + NOGENERO)) * 100
        )
      }
    };
  }

  return {
    ok: false,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
