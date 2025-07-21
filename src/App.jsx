import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import TrainingPage from './pages/TrainingPage';
import ResultPage from './pages/ResultPage';
import StatsPage from './pages/StatsPage';
import { isCorrect } from './utils/noteUtils';
import { playSound, stopSound } from './components/SoundPlayer.jsx';
import './App.css'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getRandomNote() {
  return notes[Math.floor(Math.random() * notes.length)];
}

function App() {
  const [page, setPage] = useState('start');
  const [currentNote, setCurrentNote] = useState(null);
  const [playNote, setPlayNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ accuracy: 0, count: 0, mistakes: '', growth: '' });
  const [correctNote, setCorrectNote] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeNotes, setMistakeNotes] = useState([]);

  // スタート画面 → トレーニング画面
  const handleStart = () => {
    const note = getRandomNote();
    setCurrentNote(note);
    setPlayNote(true);
    setPage('training');
    setSelectedNote(null);
    playSound(note); // ここで音を再生
  };

  // 音名選択 → 判定画面
  const handleSelectNote = (note) => {
    stopSound(); // 音を中断
    setSelectedNote(note);
    setPlayNote(false);
    setCorrectNote(currentNote);
    const ok = isCorrect(note, currentNote);
    setResult(ok ? 'OK' : 'NG');
    setStats(prev => {
      const newCount = prev.count + 1;
      const newCorrect = ok ? correctCount + 1 : correctCount;
      const accuracy = Math.round((newCorrect / newCount) * 100);
      return {
        ...prev,
        accuracy,
        count: newCount,
        mistakes: ok ? prev.mistakes : prev.mistakes + currentNote + ' ',
        growth: accuracy + '%',
      };
    });
    if (!ok) setMistakeNotes([...mistakeNotes, currentNote]);
    if (ok) setCorrectCount(correctCount + 1);

    // localStorageに記録
    try {
      const key = 'answerHistory';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push({
        input: note,
        correct: currentNote,
        date: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch (e) {
      // エラー時は何もしない
    }

    setPage('result');
  };

  // 判定画面 → トレーニング画面
  const handleRestart = () => {
    handleStart();
  };

  // 判定画面 → 統計画面
  const handleStats = () => {
    setPage('stats');
  };

  // 統計画面 → スタート画面
  const handleBack = () => {
    setPage('start');
  };

  // 終了ボタン
  const handleExit = () => {
    setPage('start');
    setStats({ accuracy: 0, count: 0, mistakes: '', growth: '' });
    setCorrectCount(0);
    setMistakeNotes([]);
  };

  return (
    <>
      <div>
        {page === 'start' && <StartPage onStart={handleStart} />}
        {page === 'training' && (
          <TrainingPage
            onSelectNote={handleSelectNote}
            playNote={playNote}
            note={currentNote}
          />
        )}
        {page === 'result' && (
          <ResultPage
            result={result}
            correctNote={correctNote}
            onRestart={handleRestart}
            onExit={handleExit}
            onStats={handleStats}
          />
        )}
        {page === 'stats' && <StatsPage stats={stats} onBack={handleBack} />}
      </div>
    </>
  )
}

export default App
