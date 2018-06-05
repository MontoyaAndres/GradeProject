const mongoose = require('mongoose');
const moment = require('moment');

function replaceFecha(value) {
  const date = JSON.stringify(value);
  return date.replace(/['"]+/g, '').split('T')[0];
}

const studentSchema = new mongoose.Schema({
  CodigoBanner: {
    type: Number,
    default: 0
  },
  TipoSemestre: {
    type: String,
    defautl: ''
  },
  Nombres: {
    type: String,
    default: ''
  },
  Apellidos: {
    type: String,
    default: ''
  },
  Genero: {
    type: String,
    default: 'SIN GENERO'
  },
  Edad: {
    type: Number,
    default: 0
  },
  NumeroIdentificacion: {
    type: Number,
    default: 0
  },
  TipoDocIdentidad: {
    type: String,
    default: 'SIN DOCUMENTO'
  },
  NivelFormacion: {
    type: String,
    default: 'SIN NIVEL DE FORMACIÓN'
  },
  CodigoPrograma: {
    type: String,
    default: 'SIN CÓDIGO PROGRAMA'
  },
  DescripcionPrograma: {
    type: String,
    default: 'SIN DESCRIPCIÓN'
  },
  Jornada: {
    type: String,
    default: 'SIN JORNADA'
  },
  AreaConocimiento: {
    type: String,
    default: 'SIN ÁREA CONOCIMIENTO'
  },
  NucleoBasicoConocimiento: {
    type: String,
    default: 'SIN NÚCLEO BÁSICO'
  },
  IES: {
    type: Number,
    default: 0
  },
  Snies: {
    type: Number,
    default: 0
  },
  Rectoria: {
    type: String,
    default: 'R CUNDINAMARCA'
  },
  CodigoSede: {
    type: String,
    default: 'SIN CÓDIGO DE SEDE'
  },
  Sede: {
    type: String,
    default: 'SIN SEDE'
  },
  CentroRegional: {
    type: String,
    default: 'SIN CENTRO REGIONAL'
  },
  CodigoPeriodoAcademico: {
    type: Number,
    default: 0
  },
  PeriodoAcademicoInscripcion: {
    type: Number,
    default: 0
  },
  DescripcionMetodologia: {
    type: String,
    default: 'SIN DESCRIPCIÓN'
  },
  TipoEstudianteAgrupado: {
    type: String,
    default: 'NINGUNO'
  },
  LugarResidencia: {
    type: Number,
    default: 0
  },
  TelCel: {
    type: String,
    default: 0
  },
  FechaCel: {
    type: mongoose.Schema.Types.Mixed,
    default: moment(new Date(Date.now())).format('YYYY-MM-DD'),
    set: replaceFecha
  },
  TelRe: {
    type: String,
    default: 0
  },
  CorreoEstudiante1: {
    type: String,
    default: 'NO CORREO'
  },
  CorreoEstudiante2: {
    type: String,
    default: 'NO CORREO'
  },
  FechaCorreo: {
    type: mongoose.Schema.Types.Mixed,
    default: moment(new Date(Date.now())).format('YYYY-MM-DD'),
    set: replaceFecha
  },
  Direccion: {
    type: String,
    default: 'SIN DIRECCION'
  },
  Departamento: {
    type: String,
    default: 'CUNDINAMARCA'
  },
  Ciudad: {
    type: String,
    default: 'SIN CIUDAD'
  },
  Estado: {
    type: String,
    default: 'SIN ESTADO'
  },
  Comentario: {
    type: String,
    default: 'NO COMENTARIO'
  },
  Situacion: {
    type: String,
    default: 'NO SITUACION'
  },
  Variable: {
    type: String,
    default: 'NO VARIABLE'
  }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
