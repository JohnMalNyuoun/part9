import { v1 as uuid } from "uuid";
import patientsData from "../data/patients.js";
import type { Patient, NonSensitivePatient, NewPatient } from "../types.js";

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

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
};