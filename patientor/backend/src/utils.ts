import { z } from 'zod';
import { Gender } from './types.js';

export const newPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().date('Invalid date format (expected YYYY-MM-DD)'),
  ssn: z.string().min(1, 'SSN is required'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, 'Occupation is required'),
});

const toNewPatient = (object: unknown) => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;