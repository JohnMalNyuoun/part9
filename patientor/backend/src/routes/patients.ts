import express from 'express';
import type { Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.js';
import toNewPatient, { toNewEntry } from '../utils.js';
import type { NonSensitivePatient, Patient, Entry } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
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

router.post('/:id/entries', (req, res: Response<Entry | { error: unknown }>) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }
});

export default router;