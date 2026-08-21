import { useState } from 'react';
import axios from 'axios';
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type Visibility,
  type Weather,
  visibilityValues,
  weatherValues,
} from '../types';
import { createDiary } from '../services/diaryService';

interface DiaryFormProps {
  onAddDiary: (entry: DiaryEntry) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const notifyError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const extractSimpleError = (data: unknown): string => {
    if (typeof data === 'string') return data;

    if (Array.isArray(data)) {
      return data
        .map((item: { message?: string }) => item.message || String(item))
        .filter(Boolean)
        .join(', ');
    }

    if (typeof data === 'object' && data !== null) {
      if ('error' in data) {
        return extractSimpleError((data as { error: unknown }).error);
      }
      if ('message' in data && typeof data.message === 'string') {
        return data.message;
      }
    }

    return 'Something went wrong';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const addedEntry = await createDiary(newEntry);
      onAddDiary(addedEntry);
      setDate('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorText = extractSimpleError(error.response?.data);
        notifyError(errorText);
      } else {
        notifyError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      {errorMessage && (
        <p style={{ color: 'red', margin: '0.5rem 0' }}>{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          date{' '}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          visibility{' '}
          {visibilityValues.map((v) => (
            <label key={v} style={{ marginRight: '0.5rem' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          weather{' '}
          {weatherValues.map((w) => (
            <label key={w} style={{ marginRight: '0.5rem' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          comment{' '}
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;