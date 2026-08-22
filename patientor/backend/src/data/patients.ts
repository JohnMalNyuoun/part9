import { Patient, Gender } from "../types.js";

const patients: Patient[] = [
  {
    id: "d2773336-2157-11e9-bf01-fe422879e639",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New York cop",
    entries: [],
  },
  {
    id: "d2773598-2157-11e9-bf01-fe422879e639",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-777A",
    gender: Gender.Male,
    occupation: "Cop",
    entries: [],
  },
  // Add entries: [] to the remaining patient objects in your data file
];

export default patients;
