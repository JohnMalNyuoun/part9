import diagnosesData from '../../data/diagnoses.js';
import type { Diagnosis } from '../types.js';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};