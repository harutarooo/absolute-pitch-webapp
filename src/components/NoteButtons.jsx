import React from 'react';

const notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

const NoteButtons = ({ onSelect }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '2rem'
  }}>
    {notes.map(note => (
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
        onClick={() => onSelect(note)}
      >
        {note}
      </button>
    ))}
  </div>
);

export default NoteButtons;