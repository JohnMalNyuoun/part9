import type { Patient } from '../src/types.js';

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop"
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop"
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician"
  },
  // Added new patient object:
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Sarah Connor",
    dateOfBirth: "1965-11-13",
    ssn: "131165-999Z",
    gender: "female",
    occupation: "Waitress"
  }
];

export default patients;