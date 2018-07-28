import express from 'express';
import { downloadFilePeriod, downloadFileCompared, downloadManual } from './downloadFile';
import { downloadGraphic } from './downloadGraphic';

const router = express.Router();

router.get('/download/:CodigoPrograma/:TipoSemestre', downloadFilePeriod);
router.get('/compare/:periodSelected1/:periodSelected2/:career/:periodSelected', downloadFileCompared);
router.get('/grafica/:style/:CodigoPrograma/:TipoSemestre/:graphicBy/:isVariable?', downloadGraphic);
router.get('/manual/:type', downloadManual);

export default router;
