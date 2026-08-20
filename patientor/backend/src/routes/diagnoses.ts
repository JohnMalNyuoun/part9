import express, { Response } from 'express';
import diagnosisService from '../services/diagnosisService.js';
import { Diagnosis } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;