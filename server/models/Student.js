import mongoose from 'mongoose';
import moment from 'moment';

function replaceFecha(value) {
  const date = JSON.stringify(value);
  return date.replace(/['"]+/g, '').split('T')[0];
}

const studentSchema = new mongoose.Schema({
  CodigoBanner: {
    type: String,
    default: 0,
    uppercase: true
  },
  TipoSemestre: {
    type: String,
    default: '',
    uppercase: true
  },
  Nombres: {
    type: String,
    default: '',
    uppercase: true
  },
  Apellidos: {
    type: String,
    default: '',
    uppercase: true
  },
  Genero: {
    type: String,
    default: 'NO GENERO',
    uppercase: true
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
    default: 'NO DOCUMENTO',
    uppercase: true
  },
  NivelFormacion: {
    type: String,
    default: 'NO NIVEL DE FORMACIÓN',
    uppercase: true
  },
  CodigoPrograma: {
    type: String,
    default: 'NO CÓDIGO PROGRAMA',
    uppercase: true
  },
  DescripcionPrograma: {
    type: String,
    default: 'NO DESCRIPCIÓN',
    uppercase: true
  },
  Jornada: {
    type: String,
    default: 'NO JORNADA',
    uppercase: true
  },
  AreaConocimiento: {
    type: String,
    default: 'NO ÁREA CONOCIMIENTO',
    uppercase: true
  },
  NucleoBasicoConocimiento: {
    type: String,
    default: 'NO NÚCLEO BÁSICO',
    uppercase: true
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
    default: 'R CUNDINAMARCA',
    uppercase: true
  },
  CodigoSede: {
    type: String,
    default: 'NO CÓDIGO DE SEDE',
    uppercase: true
  },
  Sede: {
    type: String,
    default: 'NO SEDE',
    uppercase: true
  },
  CentroRegional: {
    type: String,
    default: 'NO CENTRO REGIONAL',
    uppercase: true
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
    default: 'NO DESCRIPCIÓN',
    uppercase: true
  },
  TipoEstudianteAgrupado: {
    type: String,
    default: 'NINGUNO',
    uppercase: true
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
    default: 'NO DIRECCION',
    uppercase: true
  },
  Departamento: {
    type: String,
    default: 'CUNDINAMARCA',
    uppercase: true
  },
  Ciudad: {
    type: String,
    default: 'NO CIUDAD',
    uppercase: true
  },
  Estado: {
    type: String,
    default: 'NO ESTADO',
    uppercase: true
  },
  Comentario: {
    type: String,
    default: 'NO COMENTARIO'
  },
  Situacion: {
    type: String,
    default: 'NO SITUACIÓN',
    uppercase: true
  },
  Variable: {
    type: String,
    default: 'NO VARIABLE',
    uppercase: true
  }
});

const Student = mongoose.model('student', studentSchema);

export default Student;
