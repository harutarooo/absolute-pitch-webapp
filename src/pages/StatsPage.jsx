import React, { useMemo } from 'react';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getPerNoteStats() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem('answerHistory') || '[]');
  } catch (e) {}
  // 各音ごとに {total, correct} を集計
  const stats = {};
  notes.forEach(n => { stats[n] = { total: 0, correct: 0 }; });
  data.forEach(entry => {
    if (stats[entry.correct]) {
      stats[entry.correct].total++;
      if (entry.input === entry.correct) stats[entry.correct].correct++;
    }
  });
  return stats;
}

const StatsPage = ({ stats, onBack }) => {
  const perNoteStats = useMemo(() => getPerNoteStats(), []);
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>音</th>
            <th style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>正解率</th>
            <th style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>出題数</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => {
            const { total, correct } = perNoteStats[note];
            const rate = total > 0 ? Math.round((correct / total) * 100) : '-';
            return (
              <tr key={note}>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>{note}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>{rate === '-' ? '-' : rate + '%'}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>{total}</td>
              </tr>
            );
          })}
          {/* 合計行 */}
          {(() => {
            const totalCount = notes.reduce((sum, n) => sum + perNoteStats[n].total, 0);
            const totalCorrect = notes.reduce((sum, n) => sum + perNoteStats[n].correct, 0);
            const totalRate = totalCount > 0 ? Math.round((totalCorrect / totalCount) * 100) : '-';
            return (
              <tr style={{ fontWeight: 'bold' }}>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>Sum</td>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>{totalRate === '-' ? '-' : totalRate + '%'}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.3rem 0.7rem' }}>{totalCount}</td>
              </tr>
            );
          })()}
        </tbody>
      </table>
      <button onClick={onBack} style={{ marginTop: '1.5rem' }}>戻る</button>
    </div>
  );
};

export default StatsPage;
