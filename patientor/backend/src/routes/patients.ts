import express, { Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.js';
import toNewPatient from '../utils.js';
import type { NonSensitivePatient, Patient } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response<Patient | { error: unknown }>) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
  }
});

export default router;