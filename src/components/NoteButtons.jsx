import React from 'react';

const notes = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

const NoteButtons = ({ onSelect }) => (
  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
    {notes.map(note => (
      <button
        key={note}
        style={{ fontSize: '1.5rem', padding: '1rem 2rem', minWidth: '80px' }}
        onClick={() => onSelect(note)}
      >
        {note}
      </button>
    ))}
  </div>
);

export default NoteButtons;
