import React, { useRef } from 'react';

const notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

const NoteButtons = ({ onSelect }) => {
  // 4行3列の行列に分割
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push(notes.slice(i * 3, i * 3 + 3));
  }
  // 押下中の音名をrefで管理
  const pressedNote = useRef(null);

  const handleMouseDown = (note) => {
    pressedNote.current = note;
  };
  const handleMouseUp = (note) => {
    if (pressedNote.current === note) {
      onSelect(note);
    }
    pressedNote.current = null;
  };
  const handleMouseLeave = () => {
    pressedNote.current = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: '1rem' }}>
          {row.map(note => (
            <button
              key={note}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onMouseDown={() => handleMouseDown(note)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleMouseDown(note)} // タッチ開始をマウスダウンに対応
              onTouchEnd={() => handleMouseUp(note)}    // タッチ終了をマウスアップに対応
              onTouchCancel={handleMouseLeave}         // タッチキャンセルをマウスリーブに対応
            >
              {note}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NoteButtons;