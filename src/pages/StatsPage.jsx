import React from 'react';

const StatsPage = ({ stats, onBack }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h2>統計情報</h2>
      <div>正解率: {stats.accuracy}%</div>
      <div>トレーニング回数: {stats.count}</div>
      <div>誤答傾向: {stats.mistakes}</div>
      <div>成長度合い: {stats.growth}</div>
      <button onClick={onBack} style={{ marginTop: '2rem' }}>戻る</button>
    </div>
  );
};

export default StatsPage;
