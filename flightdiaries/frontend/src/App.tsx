import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const handleAddDiary = (newEntry: DiaryEntry) => {
    setDiaries((prev) => prev.concat(newEntry));
  };

  return (
    <div>
      <DiaryForm onAddDiary={handleAddDiary} />
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1.5rem' }}>
          <h3>{entry.date}</h3>
          <p style={{ margin: '0.2rem 0' }}>visibility: {entry.visibility}</p>
          <p style={{ margin: '0.2rem 0' }}>weather: {entry.weather}</p>
          {entry.comment && (
            <p style={{ margin: '0.2rem 0' }}>comment: {entry.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;