import { isNotNumber } from './utils.js';

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / (heightInMeters * heightInMeters);

  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25.0) return 'Normal range';
  if (bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi < 35.0) return 'Obese (Class I)';
  if (bmi < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

const parseBmiArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length < 4) throw new Error('Not enough arguments. Provide height (cm) and weight (kg).');
  if (args.length > 4) throw new Error('Too many arguments. Provide only height (cm) and weight (kg).');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (height <= 0 || weight <= 0) {
      throw new Error('Height and weight must be positive numbers!');
    }

    return { height, weight };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}