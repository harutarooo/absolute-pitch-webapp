import React, { useRef } from 'react';
import PressableButton from './PressableButton';

const notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

const NoteButtons = ({ onSelect }) => {
  // 4行3列の行列に分割
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push(notes.slice(i * 3, i * 3 + 3));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: '1rem' }}>
          {row.map(note => (
            <PressableButton
              key={note}
              style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onPress={() => onSelect(note)}
            >
              {note}
            </PressableButton>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NoteButtons;
