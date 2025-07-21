export function getFrequency(note) {
  // note: "C" など
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const n = noteNames.indexOf(note);
  if (n === -1) return 440;
  // A3(オクターブ3)～B7の範囲でランダム
  const minOctave = 3;
  const maxOctave = 7;
  const octave = Math.floor(Math.random() * (maxOctave - minOctave + 1)) + minOctave;
  const midi = (octave + 1) * 12 + n;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function isCorrect(selected, answer) {
  // 完全一致のみ正解
  return selected === answer;
}
