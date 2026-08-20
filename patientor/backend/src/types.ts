export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

// Omit 'id' because the backend generates it upon creation
export type NewPatient = Omit<Patient, 'id'>;