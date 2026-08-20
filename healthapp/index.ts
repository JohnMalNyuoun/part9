import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercises } from './exerciseCalculator.js';
import { isNotNumber } from './utils.js';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (heightNum <= 0 || weightNum <= 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(heightNum, weightNum)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body as any;

  if (!daily_exercises || target === undefined || target === null) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    isNotNumber(target) ||
    daily_exercises.some(day => isNotNumber(day))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const dailyHours = daily_exercises.map(Number);
  const targetNum = Number(target);

  const result = calculateExercises(dailyHours, targetNum);
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});