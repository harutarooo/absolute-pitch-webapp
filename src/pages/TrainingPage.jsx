import React from 'react';
import NoteButtons from '../components/NoteButtons';
import SoundPlayer from '../components/SoundPlayer.jsx';

const TrainingPage = ({ onSelectNote, note }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h2>音を聴いて、正しい音名を選んでください</h2>
      <SoundPlayer note={note} />
      <NoteButtons onSelect={onSelectNote} />
    </div>
  );
};

export default TrainingPage;
