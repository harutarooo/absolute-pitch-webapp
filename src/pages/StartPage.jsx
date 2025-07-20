import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>絶対音感トレーニング</h1>
      <button style={{ fontSize: '2rem', padding: '1rem 2rem' }} onClick={onStart}>
        スタート
      </button>
    </div>
  );
};

export default StartPage;
