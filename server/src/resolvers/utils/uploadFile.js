const correctOrder = [
  "codigo banner",
  "nombres",
  "apellidos",
  "genero",
  "edad",
  "numero identificacion",
  "tipo doc identidad",
  "nivel formacion",
  "codigo programa",
  "descripcion programa",
  "jornada",
  "area conocimiento",
  "nucleo basico conocimiento",
  "ies",
  "snies",
  "rectoria",
  "codigo sede",
  "sede",
  "centro regional",
  "codigo periodo academico",
  "periodo academico inscripcion",
  "descripcion metodologia",
  "tipo estudiante agrupado",
  "lugar residencia",
  "tel cel",
  "fecha cel",
  "tel re",
  "correo estudiante 1",
  "correo estudiante 2",
  "fecha correo",
  "direccion",
  "departamento",
  "ciudad",
  "estado",
  "comentario",
  "situacion",
  "variable"
];

async function uploadFile(data, period, models) {
  const values = [];

  // Sometimes, the people create another sheet, so the first sheet has to be the data.
  const firstSheet = Object.values(data)[0];

  // To validate if the header has correct order.
  const correction = Object.values(firstSheet[0]).map(field =>
    field
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2") // delete tildes except ñ
      .toLowerCase()
  );
  correctOrder.forEach((field, index) => {
    if (field !== correction[index] && correction[index] !== undefined) {
      values.push(correction[index]);
    }
  });

  if (values.length <= 0) {
    // To see if the period was uploaded
    const periodExists = await models.Student.findOne({ TipoSemestre: period });

    if (!periodExists) {
      // delete the first column, because is the header
      delete firstSheet[0];

      // To add the field TipoSemestre to "data"
      const information = firstSheet.map(obj => {
        obj.TipoSemestre = period;
        return obj;
      });

      // insert data to data base
      await models.Student.insertMany(information);
      return {
        ok: true
      };
    }

    return {
      ok: false,
      errors: [
        { path: "file", message: "El semestre ya fue previamente guardado." }
      ]
    };
  }
  // return the header's errors
  return {
    ok: false,
    values,
    errors: [{ path: "file", message: "Campos incorrectos." }]
  };
}

export { uploadFile };
