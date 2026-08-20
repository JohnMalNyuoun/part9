import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  
  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (heightNum <= 0 || weightNum <= 0) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmiCategory = calculateBmi(heightNum, weightNum);

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi: bmiCategory
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});