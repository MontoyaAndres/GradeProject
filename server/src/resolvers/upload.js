import { createWriteStream } from "fs";
import excel from "convert-excel-to-json";
import { GraphQLUpload } from "apollo-upload-server";

import { uploadFile } from "./utils/uploadFile";
import requiresAuth from "../utils/permissions";

const UPLOAD_ROUTE = `${__dirname}/../files`;

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(`${UPLOAD_ROUTE}/${filename}`))
      .on("finish", () => resolve())
      .on("error", reject)
  );

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadFile: requiresAuth.createResolver(
      async (parent, { file, period }, { models }) => {
        try {
          // save file
          const { stream, filename } = await file;

          if (stream && filename) {
            await storeUpload({ stream, filename });

            // insert data
            return new Promise((resolve, reject) => {
              resolve(
                excel({
                  sourceFile: `${UPLOAD_ROUTE}/${filename}`,
                  columnToKey: {
                    A: "CodigoBanner",
                    B: "Nombres",
                    C: "Apellidos",
                    D: "Genero",
                    E: "Edad",
                    F: "NumeroIdentificacion",
                    G: "TipoDocIdentidad",
                    H: "NivelFormacion",
                    I: "CodigoPrograma",
                    J: "DescripcionPrograma",
                    K: "Jornada",
                    L: "AreaConocimiento",
                    M: "NucleoBasicoConocimiento",
                    N: "IES",
                    O: "Snies",
                    P: "Rectoria",
                    Q: "CodigoSede",
                    R: "Sede",
                    S: "CentroRegional",
                    T: "CodigoPeriodoAcademico",
                    U: "PeriodoAcademicoInscripcion",
                    V: "DescripcionMetodologia",
                    W: "TipoEstudianteAgrupado",
                    X: "LugarResidencia",
                    Y: "TelCel",
                    Z: "FechaCel",
                    AA: "TelRe",
                    AB: "CorreoEstudiante1",
                    AC: "CorreoEstudiante2",
                    AD: "FechaCorreo",
                    AE: "Direccion",
                    AF: "Departamento",
                    AG: "Ciudad",
                    AH: "Estado",
                    AI: "Comentario",
                    AJ: "Situacion",
                    AK: "Variable"
                  }
                })
              );
            }).then(data => uploadFile(data, period, models));
          }

          // There's nothing to upload
          return {
            ok: false,
            errors: [{ path: "file", message: "Por favor suba un archivo." }]
          };
        } catch (error) {
          return {
            ok: false,
            errors: [{ path: "file", message: error }]
          };
        }
      }
    )
  }
};
