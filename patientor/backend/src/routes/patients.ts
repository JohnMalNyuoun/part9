import express, { Response } from 'express';
import patientService from '../services/patientService.js';
import type { NonSensitivePatient } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;