import { Gender } from '../types.js';
import type { Patient } from '../types.js';

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New york city cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        diagnosisCodes: ["S62.5"],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed.",
        },
      },
    ],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-777A",
    gender: Gender.Male,
    occupation: "Cop",
    entries: [
      {
        id: "fcd59fa3-e4c9-4dc0-89de-865aad1226e1",
        date: "2019-08-05",
        type: "OccupationalHealthcare",
        specialist: "MD House",
        employerName: "Hyvek",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        description:
          "Patient has recurring back pain. Given sick leave for 3 days.",
        sickLeave: {
          startDate: "2019-08-05",
          endDate: "2019-08-08",
        },
      },
    ],
  },
  {
    id: "d2773622-f723-11e9-8f0b-362b9e155667",
    name: "Judah Ben-Hur",
    dateOfBirth: "1975-10-09",
    ssn: "091075-123W",
    gender: Gender.Male,
    occupation: "Charioteer",
    entries: [],
  },
];

export default patients;