import express, { Request, Response } from 'express';
import patientService from '../services/patientService.js';
import type { NonSensitivePatient, Patient, NewPatient } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(addedPatient);
});

export default router;