import { useState } from 'react';
import axios from 'axios';
import { type DiaryEntry, type NewDiaryEntry, type Visibility, type Weather } from '../types';
import { createDiary } from '../services/diaryService';

interface DiaryFormProps {
  onAddDiary: (entry: DiaryEntry) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const notifyError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  // Helper function to turn Zod error objects/arrays into a plain, simple string
  const extractSimpleError = (data: unknown): string => {
    if (typeof data === 'string') return data;

    if (Array.isArray(data)) {
      return data.map((item) => item.message || String(item)).filter(Boolean).join(', ');
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

    // Cast string inputs to expected types for TypeScript
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    try {
      const addedEntry = await createDiary(newEntry);
      onAddDiary(addedEntry);
      setDate('');
      setVisibility('');
      setWeather('');
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
          <input
            type="text"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>

        <div>
          weather{' '}
          <input
            type="text"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
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