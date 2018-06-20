import express from 'express';
import { downloadFile } from './downloadFile';

const router = express.Router();

router.get('/download/:CodigoPrograma/:TipoSemestre', downloadFile);

export default router;
