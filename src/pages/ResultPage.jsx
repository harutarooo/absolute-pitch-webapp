import React from 'react';

const ResultPage = ({ result, correctNote, onRestart, onExit, onStats }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h2 style={{ color: result === 'OK' ? 'blue' : 'red' }}>{result}</h2>
      <div>正解: {correctNote}</div>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={onRestart} style={{ fontSize: '1.5rem', marginRight: '1rem' }}>スタート</button>
        <button onClick={onExit} style={{ position: 'absolute', left: 10, top: 10 }}>終了</button>
        <button onClick={onStats} style={{ position: 'absolute', right: 10, top: 10 }}>統計</button>
      </div>
    </div>
  );
};

export default ResultPage;
