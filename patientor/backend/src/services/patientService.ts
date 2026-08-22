import { v1 as uuid } from "uuid";
import patientsData from "../data/patients.js";
import type { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from "../types.js";

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry,
};