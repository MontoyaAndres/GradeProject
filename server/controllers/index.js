import express from 'express';
import { downloadFilePeriod, downloadFileCompared } from './downloadFile';

const router = express.Router();

router.get('/download/:CodigoPrograma/:TipoSemestre', downloadFilePeriod);
router.get('/compare/:periodSelected1/:periodSelected2/:career', downloadFileCompared);

export default router;
