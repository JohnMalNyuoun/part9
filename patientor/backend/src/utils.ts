import { z } from "zod";
import { Gender, HealthCheckRating } from "./types.js";
import type { NewPatient, NewEntry } from "./types.js";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const baseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(1),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};

export default toNewPatient;