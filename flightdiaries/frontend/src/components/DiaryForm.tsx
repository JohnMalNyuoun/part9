import { useState } from 'react';
import type { DiaryEntry, NewDiaryEntry } from '../types';
import { createDiary } from '../services/diaryService';

interface DiaryFormProps {
  onAddDiary: (entry: DiaryEntry) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as NewDiaryEntry['visibility'],
      weather: weather as NewDiaryEntry['weather'],
      comment,
    };

    createDiary(newEntry).then((addedEntry) => {
      onAddDiary(addedEntry);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
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