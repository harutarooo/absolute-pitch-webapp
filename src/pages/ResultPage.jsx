import React from 'react';

const ResultPage = ({ result, correctNote, onRestart, onExit, onStats }) => {
  // 統計・終了ボタン以外のどこを押してもonRestart
  const handleBgClick = (e) => {
    // 統計・終了ボタンは除外
    if (e.target.dataset && (e.target.dataset.btn === 'exit' || e.target.dataset.btn === 'stats')) return;
    onRestart();
  }; 
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
        margin : '0 auto',
        paddingTop: '10vh',
      }}
      onClick={handleBgClick}
    >
      <h1 style={{ color: result === 'OK' ? 'blue' : 'red' }}>{result}</h1>
      <div>正解: {correctNote}</div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.9rem', color: '#888' }}>画面をタップして次の問題へ</div>
      <button
        onClick={onExit}
        style={{ position: 'fixed', left: 10, bottom: 10, zIndex: 2 }}
        data-btn="exit"
      >終了</button>
      <button
        onClick={onStats}
        style={{ position: 'fixed', right: 10, bottom: 10, zIndex: 2 }}
        data-btn="stats"
      >統計</button>
    </div>
  );
};

export default ResultPage;